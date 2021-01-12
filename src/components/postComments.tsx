import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeNodeData, FixedSizeNodePublicState, FixedSizeTree } from 'react-vtree';
import { NodeComponentProps, TreeWalkerValue } from 'react-vtree/dist/es/Tree';
import GenericButton from './genericButton';

type TreeNode = Readonly<{
	children: TreeNode[];
	id: number;
	name: string;
}>;

type TreeData = FixedSizeNodeData &
	Readonly<{
		isLeaf: boolean;
		name: string;
		nestingLevel: number;
	}>;

let nodeId = 0;

const createNode = (depth: number = 0): TreeNode => {
	const node: TreeNode = {
		children: [],
		id: nodeId,
		name: `test-${nodeId}`
	};

	nodeId += 1;

	if (depth === 2) {
		return node;
	}

	for (let i = 0; i < 10; i++) {
		node.children.push(createNode(depth + 1));
	}

	return node;
};

const rootNode = Array.from({ length: 10 }, () => createNode());
const defaultTextStyle = { marginLeft: 10 };

type NodeMeta = Readonly<{
	nestingLevel: number;
	node: TreeNode;
}>;

const getNodeData = (node: TreeNode, nestingLevel: number): TreeWalkerValue<TreeData, NodeMeta> => ({
	data: {
		id: node.id.toString(),
		isLeaf: node.children.length === 0,
		isOpenByDefault: true,
		name: node.name,
		nestingLevel
	},
	nestingLevel,
	node
});

function* treeWalker(): TreeWalker {
	// Step [1]: Define the root node of our tree. There can be one or
	// multiple nodes.
	for (let i = 0; i < rootNode.length; i++) {
		yield getNodeData(rootNode[i], 0);
	}

	while (true) {
		// Step [2]: Get the parent component back. It will be the object
		// the `getNodeData` function constructed, so you can read any data from it.
		const parent = yield;

		for (let i = 0; i < parent.node.children.length; i++) {
			// Step [3]: Yielding all the children of the provided component. Then we
			// will return for the step [2] with the first children.
			yield getNodeData(parent.node.children[i], parent.nestingLevel + 1);
		}
	}
}

const Node: React.FC<NodeComponentProps<TreeData, FixedSizeNodePublicState<TreeData>>> = ({
	data: { isLeaf, name, nestingLevel },
	isOpen,
	style,
	setOpen
}) => (
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
		<div style={defaultTextStyle}>{name}</div>
	</div>
);

type TreePresenterProps = Readonly<{
	itemSize: number;
}>;
const Comments = () => {
	return (
		<AutoSizer disableWidth>
			{({ height, width }) => (
				<FixedSizeTree treeWalker={treeWalker} itemSize={30} height={height} width={width}>
					{Node}
				</FixedSizeTree>
			)}
		</AutoSizer>
	);
};

export default Comments;
