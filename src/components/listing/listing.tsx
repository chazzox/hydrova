import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, ReduxStateType } from '../../redux/reduxWrapper';
import timeSinceCurrent, { formatTimeSince } from '../../utils/timeSinceCurrent';

import PostComponent from '../postComponent/postComponent';

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
									<div className="post">
										<div className="postInfo">
											<p>
												<strong>{post.author}</strong>
												{formatTimeSince(timeSinceCurrent(post.created_utc))}
												<Link to={'/' + post.subreddit_name_prefixed}>
													{post.subreddit_name_prefixed}
												</Link>
											</p>
											<h1 className="postTitle">{post.title}</h1>
										</div>
										<div className="postContent">
											{post.thumbnail !== 'default' && post.thumbnail !== 'self' ? (
												<img src={post.thumbnail} alt={`thumbnail for ${post.id}`} />
											) : null}
										</div>
									</div>
								</Link>
							);
						})}
					</span>
				</div>
			</div>
		</>
	);
};

const PostCompact = () => {};

export default Listing;
