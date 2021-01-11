import React, { DependencyList, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeNodeData, FixedSizeNodePublicState, FixedSizeTree } from 'react-vtree';
import { NodeComponentProps, TreeWalkerValue } from 'react-vtree/dist/es/Tree';
import { noop } from 'react-vtree/dist/es/utils';
import GenericButton from './genericButton';

export type AsyncTaskSchedulerFinalizeCallback<T> = (ids: readonly T[]) => void;

export class AsyncTaskScheduler<T> {
	private readonly aborters: Set<() => void> = new Set();
	private readonly finalizeCallback: AsyncTaskSchedulerFinalizeCallback<T>;
	private readonly tasks: Map<T, () => void> = new Map();

	public constructor(finalizeCallback: AsyncTaskSchedulerFinalizeCallback<T>) {
		this.finalizeCallback = finalizeCallback;
	}

	public add(id: T, task: () => void, aborter: () => void): void {
		this.tasks.set(id, task);
		this.dropOthers();
		this.aborters.add(aborter);
	}

	public finalize(): void {
		this.tasks.forEach((task) => task());

		this.finalizeCallback(Array.from(this.tasks.keys()));
	}

	private dropOthers(): void {
		this.aborters.forEach((aborter) => aborter());
		this.aborters.clear();
	}
}

type TreeNode = Readonly<{
	children: TreeNode[];
	downloaded: boolean;
	id: number;
	name: string;
}>;

type TreeData = FixedSizeNodeData &
	Readonly<{
		downloaded: boolean;
		download: () => Promise<void>;
		isLeaf: boolean;
		name: string;
		nestingLevel: number;
	}>;

let nodeId = 0;

const createNode = (downloadedIds: readonly number[], depth: number = 0): TreeNode => {
	const id = nodeId;
	const node: TreeNode = {
		children: [],
		downloaded: downloadedIds.includes(id),
		id,
		name: `test-${nodeId}`
	};

	nodeId += 1;

	if (depth === 2) {
		return node;
	}

	for (let i = 0; i < 1000; i++) {
		node.children.push(createNode(downloadedIds, depth + 1));
	}

	return node;
};

const defaultTextStyle = { marginLeft: 10 };

type NodeMeta = Readonly<{
	nestingLevel: number;
	node: TreeNode;
}>;

const getNodeData = (
	node: TreeNode,
	nestingLevel: number,
	download: () => Promise<void>
): TreeWalkerValue<TreeData, NodeMeta> => ({
	data: {
		download,
		downloaded: node.downloaded,
		id: node.id.toString(),
		isLeaf: node.children.length === 0,
		isOpenByDefault: false,
		name: node.name,
		nestingLevel
	},
	nestingLevel,
	node
});

const useBuildingPromise = (deps: DependencyList) => {
	const resolve = useRef(noop);

	useEffect(() => {
		resolve.current();
	}, deps);

	return () =>
		new Promise((r) => {
			resolve.current = r;
		});
};

const Node: React.FC<NodeComponentProps<TreeData, FixedSizeNodePublicState<TreeData>>> = ({
	data: { download, downloaded, isLeaf, name, nestingLevel },
	isOpen,
	style,
	setOpen
}) => {
	const [isLoading, setLoading] = useState(false);
	const createBuildingPromise = useBuildingPromise([download]);

	return (
		<div
			style={{
				...style,
				alignItems: 'center',
				display: 'flex',
				marginLeft: nestingLevel * 30 + (isLeaf ? 48 : 0)
			}}
		>
			{!isLeaf && (
				<div>
					<GenericButton
						text={isLoading ? '⌛' : isOpen ? '-' : '+'}
						clickEvent={
							!isLoading
								? async () => {
										if (!downloaded) {
											setLoading(true);
											await Promise.all([download(), setOpen(!isOpen), createBuildingPromise()]);
											setLoading(false);
										} else {
											await setOpen(!isOpen);
										}
								  }
								: undefined
						}
					/>
				</div>
			)}
			<div style={defaultTextStyle}>{name}</div>
		</div>
	);
};

type TreePresenterProps = Readonly<{
	disableAsync: boolean;
	itemSize: number;
}>;

const TreePresenter: React.FC<TreePresenterProps> = ({ disableAsync, itemSize }) => {
	const [downloadedIds, setDownloadedIds] = useState<readonly number[]>([]);
	const scheduler = useRef<AsyncTaskScheduler<number>>(new AsyncTaskScheduler(setDownloadedIds));
	const rootNode = useMemo(() => {
		nodeId = 0;

		return createNode(downloadedIds);
	}, [downloadedIds]);

	const createDownloader = (node: TreeNode) => (): Promise<void> =>
		new Promise((resolve) => {
			const timeoutId = setTimeout(() => {
				scheduler.current.finalize();
			}, 2000);

			scheduler.current.add(node.id, resolve, () => clearTimeout(timeoutId));
		});

	const treeWalker = useCallback(
		function* treeWalker(): ReturnType<TreeWalker<TreeData, NodeMeta>> {
			yield getNodeData(rootNode, 0, createDownloader(rootNode));

			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			while (true) {
				const parentMeta = yield;

				if (parentMeta.data.downloaded) {
					// eslint-disable-next-line @typescript-eslint/prefer-for-of
					for (let i = 0; i < parentMeta.node.children.length; i++) {
						yield getNodeData(
							parentMeta.node.children[i],
							parentMeta.nestingLevel + 1,
							createDownloader(parentMeta.node.children[i])
						);
					}
				}
			}
		},
		[rootNode]
	);

	return (
		<AutoSizer disableWidth>
			{({ height }) => (
				<FixedSizeTree
					treeWalker={treeWalker}
					itemSize={itemSize}
					height={height}
					placeholder={null}
					async={!disableAsync}
					width="100%"
				>
					{Node}
				</FixedSizeTree>
			)}
		</AutoSizer>
	);
};

const Comments: React.FC = () => {
	return <TreePresenter disableAsync={false} itemSize={30} />;
};

export default Comments;
