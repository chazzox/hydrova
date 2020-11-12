import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, ReduxStateType } from '../../redux/reduxWrapper';

import PostComponent from '../postComponent/postComponent';
import VoteControls from '../voteControls/voteControls';

const Listing = ({
	postData = [],
	postClickEvent
}: {
	postData?: string[];
	postClickEvent: (postId: string) => void;
}) => {
	// redux
	const dispatch: AppDispatch = useDispatch();
	const posts = useSelector((state: ReduxStateType) => state.post.posts);

	return (
		<>
			<div className="main">
				<div className="contentContainer">
					<span>
						{postData.map((postId, index) => {
							const post = posts[postId].postContent;
							return (
								<Link
									key={index}
									id={post.id}
									to={{ pathname: '/' + post.id }}
									onClick={() => postClickEvent(post.id)}
								>
									<object>
										<PostComponent postContent={post} />
									</object>
								</Link>
							);
						})}
					</span>
				</div>
			</div>
		</>
	);
};

export default Listing;
