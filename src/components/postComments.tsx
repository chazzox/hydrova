import React, { useCallback, useEffect, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeNodePublicState, FixedSizeTree } from 'react-vtree';
import { NodeComponentProps, TreeWalkerValue } from 'react-vtree/dist/es/Tree';

import GenericButton from './genericButton';

interface TreeData {
	id: string;
	isOpenByDefault: boolean;
	isLeaf: boolean;
	name: string;
	nestingLevel: number;
}

const defaultTextStyle = { marginLeft: 10 };

type NodeMeta = Readonly<{
	nestingLevel: number;
	node: CommentData;
}>;

const getNodeData = (node: CommentData, nestingLevel: number): TreeWalkerValue<TreeData, NodeMeta> => ({
	data: {
		id: node.id.toString(),
		isLeaf: node.children.length === 0,
		isOpenByDefault: true,
		name: node.body_html,
		nestingLevel
	},
	nestingLevel,
	node
});

interface CommentData {
	id: string;
	body_html: string;
	children: CommentData[];
}

const Comments = () => {
	const [treeData, setTreeData] = useState<CommentData[]>([{ id: '0', body_html: 'loading', children: [] }]);

	useEffect(() => {
		fetch('https://www.reddit.com/r/headphones/comments/kwkjbb/there_is_no_other_choice_for_good_sound/.json', {
			method: 'GET'
		})
			.then((res) => res.json())
			.then((json: GeneralPostResponse) => {
				console.log('res', json);
				setTreeData(getStuff(json[1].data.children));
			})
			.catch((err) => console.log(err));
	}, []);

	// extracting the values out of each comment that we need to render, only happens when we initially receive the data
	const getStuff = (commentApiResponse: PurpleChild[]): CommentData[] =>
		commentApiResponse.map<CommentData>(({ data }) => ({
			id: data.id,
			body_html: data.body_html,
			children: typeof data.replies != 'object' ? [] : getStuff(data.replies.data.children),
			author: data.author,
			test: data.created_utc
		}));

	const treeWalkerCall = useCallback(
		function* treeWalker(): any {
			for (let i = 0; i < treeData.length; i++) {
				yield getNodeData(treeData[i], 0);
			}
			while (true) {
				const parent = yield;
				for (let i = 0; i < parent.node.children.length; i++) {
					yield getNodeData(parent.node.children[i], parent.nestingLevel + 1);
				}
			}
		},
		[treeData]
	);

	return (
		<>
			<AutoSizer>
				{({ height, width }) => (
					<FixedSizeTree
						async={true}
						treeWalker={treeWalkerCall}
						itemSize={150}
						height={height}
						width={width}
					>
						{Node}
					</FixedSizeTree>
				)}
			</AutoSizer>
		</>
	);
};

const Node: React.FC<NodeComponentProps<TreeData, FixedSizeNodePublicState<TreeData>>> = ({
	data: { isLeaf, name, nestingLevel },
	isOpen,
	style,
	setOpen
}) => {
	return (
		<div
			style={{
				...style,
				alignItems: 'center',
				display: 'flex',
				marginLeft: nestingLevel * 30 + (isLeaf ? 48 : 0),
				width: 'auto'
			}}
		>
			{!isLeaf && (
				<>
					<GenericButton
						text={isOpen ? '-' : '+'}
						clickEvent={() => setOpen(!isOpen)}
						additionalStyles={{ textAlign: 'center', margin: '0em', width: 'auto' }}
					/>
				</>
			)}
			<span
				dangerouslySetInnerHTML={{
					__html: new DOMParser().parseFromString(name, 'text/html').documentElement.textContent || ''
				}}
			/>
		</div>
	);
};

export default Comments;
