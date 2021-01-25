import React from 'react';
import { Link } from 'react-router-dom';
import copy from 'copy-to-clipboard';

import timeSinceCurrent, { formatTimeSince } from 'utils/timeSinceCurrent';
import GenericButton from './genericButton';

import 'styles/component/comment.scss';

const Comments: React.FC<{ data: PurpleData }> = ({
	data: { id, author, created_utc, body_html, score, permalink, replies }
}) => {
	return (
		<>
			<div id={id} className="comment">
				<p className="commentInfo roundedLinks">
					<Link to={'/u/' + author}>{author}</Link>
					<span>{formatTimeSince(timeSinceCurrent(created_utc))}</span>
				</p>
				<div
					className="commentBody"
					dangerouslySetInnerHTML={{
						__html: new DOMParser().parseFromString(body_html, 'text/html').documentElement.textContent || ''
					}}
				/>
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
				</div>
				<div className="commentChildContainer">
					{replies && replies.data.children.map(({ data }, index) => <Comments key={index} data={data} />)}
				</div>
			</div>
		</>
	);
};

export default Comments;
