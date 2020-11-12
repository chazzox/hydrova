import React from 'react';
import { useState } from 'react';
import GenericButton from '../buttons/genericButton';

import './comment.scss';

const Comment = ({ comment }: { comment: any }) => {
	const [isCollapsed, setIsCollapsed] = useState(false);
	return (
		<>
			<div className="comment">
				<div
					className="commentBody"
					dangerouslySetInnerHTML={{
						__html:
							new DOMParser().parseFromString(comment.body_html, 'text/html').documentElement
								.textContent || ''
					}}
				/>
				<div className="votesContainer">
					<GenericButton svgPath="upvote" isCompact={true} />
					<span>0</span>
					<GenericButton svgPath="downvote" isCompact={true} />
				</div>
				<div className="commentChildContainer">
					{comment.replies ? (
						<GenericButton
							clickEvent={() => setIsCollapsed(!isCollapsed)}
							text={`${isCollapsed ? 'Expand' : 'Collapse'} Thread`}
							isCompact={true}
							svgPath="comment"
						/>
					) : null}
					{comment.replies && !isCollapsed
						? comment.replies.data.children.map((childComments: any, index: any) => {
								if (childComments.kind === 't1')
									return <Comment comment={childComments.data} key={index} />;
						  })
						: null}
				</div>
			</div>
		</>
	);
};

export default Comment;
