import React, { useEffect } from 'react';
import { useState } from 'react';
import copy from 'copy-to-clipboard';
import GenericButton from '../buttons/genericButton';
import { Link } from 'react-router-dom';
import timeSinceCurrent, { formatTimeSince } from '../../utils/timeSinceCurrent';

import './comment.scss';

const Comment = ({ comment }: { comment: any }) => {
	const [isCollapsed, setIsCollapsed] = useState(false);
	return (
		<>
			<div className="comment">
				<p className="commentInfo roundedLinks">
					<Link to={'/user/' + comment.author}>{comment.author}</Link>
					<span>{formatTimeSince(timeSinceCurrent(comment.created_utc))}</span>
				</p>
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
					<span>{comment.score}</span>
					<GenericButton svgPath="downvote" isCompact={true} />
				</div>
				<GenericButton text="Reply" isCompact={true} svgPath="reply" />
				<GenericButton
					text="Share"
					isCompact={true}
					svgPath="share"
					clickEvent={() => copy(`https://www.reddit.com${comment.permalink}`)}
				/>
				<div className="commentChildContainer">
					{comment.replies ? (
						<>
							<GenericButton
								clickEvent={() => setIsCollapsed(!isCollapsed)}
								text={`${isCollapsed ? 'Expand' : 'Collapse'} ${
									comment.replies.data.children.length > 1
										? comment.replies.data.children.length + ' Threads'
										: 'Thread'
								}`}
								isCompact={true}
								svgPath={isCollapsed ? 'collapse_down' : 'collapse_up'}
							/>
						</>
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
