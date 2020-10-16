import React from 'react';

import './comment.scss';

const Comment = ({ comment }: { comment: any }) => {
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

				{comment.replies
					? comment.replies.data.children.map((childComments: any, index: any) => {
							if (childComments.kind === 't1')
								return <Comment comment={childComments.data} key={index} />;
					  })
					: null}
			</div>
		</>
	);
};

export default Comment;
