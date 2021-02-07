import React from 'react';
import copy from 'copy-to-clipboard';

import GenericButton from 'components/genericButton';

import 'styles/component/voteControls.scss';

const voteControls = ({ postContent: { likes, permalink, num_comments, ups, saved } }: { postContent: Post }) => {
	return (
		<>
			<div className="voteControls">
				<div className="votesContainer">
					<GenericButton svgPath="upvote" isSelected={likes === true} isCompact={true} clickEvent={() => {}} />
					<span>{ups + (likes === true ? 1 : likes === false ? -1 : 0)}</span>
					<GenericButton clickEvent={() => {}} svgPath="downvote" isSelected={likes === false} isCompact={true} />
				</div>
				<GenericButton
					clickEvent={() => {}}
					isSelected={saved}
					text={saved ? 'Unsave' : 'Save'}
					svgPath="save"
					isCompact={true}
				/>
				<GenericButton
					clickEvent={() => copy(`https://www.reddit.com${permalink}`)}
					text="share"
					svgPath="share"
					isCompact={true}
				/>
				<GenericButton
					text={num_comments}
					clickEvent={() => document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth' })}
					isCompact={true}
					svgPath="comment"
				/>
			</div>
		</>
	);
};

export default voteControls;
