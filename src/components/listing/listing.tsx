import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReduxStateType } from '../../redux/reduxWrapper';
import timeSinceCurrent, { formatTimeSince } from '../../utils/timeSinceCurrent';

import GenericButton from '../buttons/genericButton';

import './listing.scss';

const Listing = ({
	postData = [],
	postClickEvent
}: {
	postData?: string[];
	postClickEvent: (postId: string) => void;
}) => {
	const posts = useSelector((state: ReduxStateType) => state.post.posts);

	return (
		<>
			<div className="main">
				<div className="timelineSortContainer">
					<GenericButton text="Best" isCompact={true} svgPath="best" />
					<GenericButton text="Hot" isCompact={true} svgPath="hot" />
					<GenericButton text="New" isCompact={true} svgPath="recent" />
					<GenericButton text="Top" isCompact={true} svgPath="top" />
					<GenericButton text="Rising" isCompact={true} svgPath="rising" />
				</div>
				<div className="contentContainer" style={{ paddingTop: '30px' }}>
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
										<div className="post">
											<div className="postInfo roundedLinks">
												<p>
													<Link to={'/user/' + post.author}>{post.author}</Link>
													<span>{formatTimeSince(timeSinceCurrent(post.created_utc))}</span>
													<Link to={'/' + post.subreddit_name_prefixed}>
														{post.subreddit_name_prefixed}
													</Link>
												</p>
												<h1 className="postTitle">{post.title}</h1>
											</div>
											<div className="postContent">
												{post.thumbnail.match(/(default)|(self)|(unknown)/) === null &&
												post.thumbnail ? (
													<img src={post.thumbnail} alt={`thumbnail for ${post.id}`} />
												) : null}
											</div>
										</div>
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

const PostCompact = () => {};

export default Listing;
