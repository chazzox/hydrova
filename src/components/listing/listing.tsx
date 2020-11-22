import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReduxStateType } from '../../redux/reduxWrapper';

import GenericButton from '../buttons/genericButton';
import PostComponent from '../postComponent/postComponent';

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
										<PostComponent isSmall={true} postContent={post} />
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
