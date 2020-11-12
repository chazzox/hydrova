import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, ReduxStateType } from '../../redux/reduxWrapper';
import { setClickedPostID } from '../../redux/postStore/postReducer';

import PostComponent from '../postComponent/postComponent';
import VoteControls from '../voteControls/voteControls';

const Listing = ({ postData }: { postData: string[] }) => {
	// redux
	const dispatch: AppDispatch = useDispatch();
	const posts = useSelector((state: ReduxStateType) => state.post.posts);

	return (
		<>
			<div id="contentContainer" className="home">
				<span>
					{postData.map((postId, index) => {
						const post = posts[postId].postContent;
						return (
							<Link
								key={index}
								className="post"
								id={post.id}
								onClick={() => dispatch(setClickedPostID(post.id))}
								to={{ pathname: '/post/' + post.id, state: { post: post } }}
							>
								<object>
									<PostComponent postContent={post} />
								</object>
							</Link>
						);
					})}
				</span>
			</div>
		</>
	);
};

export default Listing;
