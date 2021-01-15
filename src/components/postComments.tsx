import React, { useCallback, useRef } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Link } from 'react-router-dom';
import Measure, { ContentRect } from 'react-measure';
import {
	TreeWalker,
	TreeWalkerValue,
	VariableSizeNodeData,
	VariableSizeNodePublicState,
	VariableSizeTree
} from 'react-vtree';
import { NodeComponentProps } from 'react-vtree/dist/cjs/Tree';
import copy from 'copy-to-clipboard';

import GenericButton from './genericButton';
import timeSinceCurrent, { formatTimeSince } from 'utils/timeSinceCurrent';

import 'styles/component/comment.scss';

type NodeMeta = Readonly<{
	nestingLevel: number;
	node: TreeNode;
}>;

type ExtendedData = VariableSizeNodeData &
	TreeNode &
	Readonly<{
		isLeaf: boolean;
		nestingLevel: number;
	}>;

const someHeightConstant = 100 as const;

const getNodeData = (node: TreeNode, nestingLevel: number, itemSize: number): TreeWalkerValue<ExtendedData, NodeMeta> => ({
	data: {
		defaultHeight: itemSize,
		isLeaf: node.children.length === 0,
		isOpenByDefault: true,
		nestingLevel,
		...node
	},
	nestingLevel,
	node
});

const Comments: React.FC<{ treeData: TreeNode[] }> = ({ treeData }) => {
	const tree = useRef<VariableSizeTree<ExtendedData>>(null);
	const treeWalker = useCallback(
		function* treeWalker(): ReturnType<TreeWalker<ExtendedData, NodeMeta>> {
			for (let i = 0; i < treeData.length; i++) {
				yield getNodeData(treeData[i], 0, someHeightConstant);
			}
			while (true) {
				const parentMeta = yield;
				for (let i = 0; i < parentMeta.node.children.length; i++) {
					yield getNodeData(parentMeta.node.children[i], parentMeta.nestingLevel + 1, someHeightConstant);
				}
			}
		},
		[treeData]
	);
	return (
		<AutoSizer disableWidth>
			{({ height }) => (
				<VariableSizeTree ref={tree} itemData={100} treeWalker={treeWalker} height={height} width="100%">
					{Node}
				</VariableSizeTree>
			)}
		</AutoSizer>
	);
};

const Node: React.FC<NodeComponentProps<ExtendedData, VariableSizeNodePublicState<ExtendedData>>> = ({
	height,
	data: { isLeaf, id, nestingLevel, author, created_utc, body_html, score, permalink },
	isOpen,
	resize,
	style,
	setOpen
}) => {
	const resizeItem = useCallback(
		(contentRect: ContentRect) => resize((contentRect.bounds?.height ?? 30) + someHeightConstant, true),
		[resize, height]
	);

	return (
		// to change the amount each nesting level is indented, change 30
		<div id={id} style={{ ...style, marginLeft: nestingLevel * 30 }} className="comment">
			<p className="commentInfo roundedLinks">
				<Link to={'/u/' + author}>{author}</Link>
				<span>{formatTimeSince(timeSinceCurrent(created_utc))}</span>
			</p>
			<Measure bounds onResize={resizeItem}>
				{({ measureRef }) => (
					<div
						className="commentBody"
						ref={measureRef}
						dangerouslySetInnerHTML={{
							__html: new DOMParser().parseFromString(body_html, 'text/html').documentElement.textContent || ''
						}}
					/>
				)}
			</Measure>
			<div className="lowerVoteInfoContainer">
				<div className="votesContainer">
					<GenericButton svgPath="upvote" isCompact={true} />
					<span>{score}</span>
					<GenericButton svgPath="downvote" isCompact={true} />
				</div>
				<GenericButton text="Reply" isCompact={true} svgPath="reply" />
				<GenericButton
					text="Share"
					isCompact={true}
					svgPath="share"
					clickEvent={() => copy(`https://www.reddit.com${permalink}`)}
				/>
				<div className="commentChildContainer">
					{!isLeaf && (
						<GenericButton
							clickEvent={() => setOpen(!isOpen)}
							text={`${isOpen ? 'Expand' : 'Collapse'} Threads`}
							isCompact={true}
							svgPath={isOpen ? 'collapse_down' : 'collapse_up'}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default Comments;
