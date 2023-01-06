import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getSubreddit } from 'utils/reddit';

const Subreddit: React.FC<{ token?: string }> = ({ token }) => {
	// @ts-ignore
	const { isLoading, data: subreddits } = useQuery(['subreddit'], () => getSubreddit(token), {
		enabled: !!token,
		staleTime: 0,
		cacheTime: Infinity
	});

	return (
		<>
			<li className="menu-title">
				<span>My Subreddit&lsquo;s</span>
			</li>

			{subreddits?.data?.children.map(({ data }, i) => (
				<li key={i}>
					<div>
						{data.icon_img ? (
							<img src={data.icon_img} className="h-7 w-7 rounded-2xl" />
						) : (
							<p
								style={{ backgroundColor: data.primary_color }}
								className="h-7 w-7 rounded-2xl text-center"
							>
								{data.display_name[0].toUpperCase()}
							</p>
						)}
						<a>{data.url}</a>
					</div>
				</li>
			))}
		</>
	);
};

export default Subreddit;
