import React from 'react';

const Comment = ({ comment }: { comment: any }) => {
	return (
		<>
			<div className="comment">
				<div className="commentContent">
					<div
						className="commentBody"
						dangerouslySetInnerHTML={{
							__html:
								new DOMParser().parseFromString(comment.body_html, 'text/html')
									.documentElement.textContent || ''
						}}
					/>
					<div className="commentButtonMenu">
						<button>Upvote</button>
						<button>Downvote</button>
					</div>
				</div>

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
