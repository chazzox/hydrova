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
				<button>Upvote</button>
				<button>Downvote</button>
				<div className="commentChildContainer">
					{comment.replies ? (
						<GenericButton
							clickEvent={() => setIsCollapsed(!isCollapsed)}
							text={`${isCollapsed ? 'Expand' : 'Collapse'} Thread`}
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
