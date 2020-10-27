import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import copy from 'copy-to-clipboard';

import './voteControls.scss';

import { SAVE, VOTE } from '../../redux/postStore/postReducer';
import { AppDispatch, ReduxStateType } from '../../redux/reduxWrapper';
import GenericButton from '../genericButton/genericButton';

const voteControls = ({ postContent }: { postContent: post }) => {
	const dispatch: AppDispatch = useDispatch();

	return (
		<div className="voteControls">
			<div className="votesContainer">
				<GenericButton
					text="⬆️"
					isSelected={postContent.likes === true}
					clickEvent={() => {
						dispatch(
							VOTE({
								fullName: postContent.name,
								voteDirection: 1
							})
						);
					}}
				/>
				<p>{postContent.ups}</p>
				<GenericButton
					clickEvent={() => {
						dispatch(
							VOTE({
								fullName: postContent.name,
								voteDirection: -1
							})
						);
					}}
					text="⬇️"
					isSelected={postContent.likes === false}
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
				text="save"
			/>

			<button onClick={() => copy(`https://www.reddit.com/${postContent.permalink}`)}>share</button>
			<button>💬{postContent.num_comments}</button>
		</div>
	);
};

export default voteControls;
