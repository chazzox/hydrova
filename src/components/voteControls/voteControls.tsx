import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import copy from 'copy-to-clipboard';

import './voteControls.scss';

import { SAVE, VOTE } from '../../redux/postStore/postReducer';
import { AppDispatch } from '../../redux/reduxWrapper';
import GenericButton from '../genericButton/genericButton';

const voteControls = ({ postContent }: { postContent: post }) => {
	const dispatch: AppDispatch = useDispatch();

	return (
		<>
			<div className="voteControls">
				<div className="votesContainer">
					<GenericButton
						text="⬆️"
						isVertical={true}
						isSelected={postContent.likes === true}
						clickEvent={() => {
							dispatch(
								VOTE({
									fullName: postContent.name,
									voteDirection: postContent.likes === true ? 0 : 1
								})
							);
						}}
					/>
					<p>
						{postContent.ups +
							(postContent.likes === true ? 1 : postContent.likes === false ? -1 : 0)}
					</p>
					<GenericButton
						isVertical={true}
						clickEvent={() => {
							dispatch(
								VOTE({
									fullName: postContent.name,
									voteDirection: postContent.likes === false ? 0 : -1
								})
							);
						}}
						text="⬇️"
						isSelected={postContent.likes === false}
					/>
				</div>
				<GenericButton
					isVertical={true}
					clickEvent={() => {
						dispatch(
							SAVE({
								fullName: postContent.name,
								isSaving: !postContent.saved
							})
						);
					}}
					isSelected={postContent.saved}
					text="save"
				/>

				<GenericButton
					clickEvent={() => copy(`https://www.reddit.com${postContent.permalink}`)}
					text="share"
					isVertical={true}
				/>
				<GenericButton text={postContent.num_comments} isVertical={true} svgPath="home" />
			</div>
		</>
	);
};

export default voteControls;
