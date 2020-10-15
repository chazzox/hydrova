import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import copy from 'copy-to-clipboard';

import { SAVE, VOTE, GET_TIMELINE } from '../../redux/postReducer';
import { AppDispatch, ReduxStateType } from '../../redux/reduxWrapper';

const voteControls = ({ postContent }: { postContent: post }) => {
	const dispatch: AppDispatch = useDispatch();
	const access_token = useSelector((state: ReduxStateType) => state.auth.access_token);

	return (
		<div className="voteControls">
			<div className="votesContainer">
				<button
					onClick={() => {
						dispatch(
							VOTE({
								access_token: access_token,
								fullName: postContent.name,
								voteDirection: 1
							})
						);
					}}
					className={postContent.likes === true ? 'selected' : ''}
				>
					⬆️
				</button>
				<p>{postContent.ups}</p>
				<button
					onClick={() => {
						dispatch(
							VOTE({
								access_token: access_token,
								fullName: postContent.name,
								voteDirection: -1
							})
						);
					}}
					className={postContent.likes === false ? 'selected' : ''}
				>
					⬇️
				</button>
			</div>
			<button
				onClick={() => {
					dispatch(
						SAVE({
							access_token: access_token,
							fullName: postContent.name,
							isSaving: !postContent.likes
						})
					);
				}}
				className={postContent.likes ? 'selected' : ''}
			>
				save
			</button>
			<button onClick={() => copy(`https://www.reddit.com/${postContent.permalink}`)}>share</button>
			<button>💬{postContent.num_comments}</button>
		</div>
	);
};

export default voteControls;
