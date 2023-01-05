import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getSubreddit } from 'utils/reddit';

const Subreddit: React.FC<{ token: string }> = ({ token }) => {
	const { isLoading, data: subreddits } = useQuery(['subreddit'], () => getSubreddit(token));

	return (
		<>
			<li className="menu-title">
				<span>My Subreddit's</span>
			</li>

			{subreddits?.data?.children.map(({ data }, i) => (
				<li key={i}>
					<a>{data.url}</a>
				</li>
			))}
		</>
	);
};

export default Subreddit;
