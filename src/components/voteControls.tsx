import React from 'react';
import { useDispatch } from 'react-redux';
import copy from 'copy-to-clipboard';

import { SAVE, VOTE } from 'reduxStore/postStore/postThunks';
import { AppDispatch } from 'reduxStore/reduxWrapper';
import GenericButton from 'components/genericButton';

import 'styles/component/voteControls.scss';

const voteControls = ({ postContent }: { postContent: post }) => {
	const dispatch: AppDispatch = useDispatch();

	return (
		<>
			<div className="voteControls">
				<div className="votesContainer">
					<GenericButton
						svgPath="upvote"
						isSelected={postContent.likes === true}
						isCompact={true}
						clickEvent={() => {
							dispatch(
								VOTE({
									fullName: postContent.name,
									voteDirection: postContent.likes === true ? 0 : 1
								})
							);
						}}
					/>
					<span>
						{postContent.ups + (postContent.likes === true ? 1 : postContent.likes === false ? -1 : 0)}
					</span>
					<GenericButton
						clickEvent={() => {
							dispatch(
								VOTE({
									fullName: postContent.name,
									voteDirection: postContent.likes === false ? 0 : -1
								})
							);
						}}
						svgPath="downvote"
						isSelected={postContent.likes === false}
						isCompact={true}
					/>
				</div>
				<GenericButton
					clickEvent={() => {
						dispatch(
							SAVE({
								fullName: postContent.name,
								isSaving: !postContent.saved
							})
						);
					}}
					isSelected={postContent.saved}
					text={postContent.saved ? 'Unsave' : 'Save'}
					svgPath="save"
					isCompact={true}
				/>

				<GenericButton
					clickEvent={() => copy(`https://www.reddit.com${postContent.permalink}`)}
					text="share"
					svgPath="share"
					isCompact={true}
				/>
				<GenericButton
					text={postContent.num_comments}
					clickEvent={() => document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth' })}
					isCompact={true}
					svgPath="comment"
				/>
			</div>
		</>
	);
};

export default voteControls;
