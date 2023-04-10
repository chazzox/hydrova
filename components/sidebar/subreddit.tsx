'use client';
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

			{/* @ts-ignore */}
			{subreddits?.data?.children.map(({ data }, i) => (
				<li key={i}>
					<div>
						{data.icon_img ? (
							<div className="avatar">
								<div className="w-7 rounded-full">
									<img src={data.icon_img} />
								</div>
							</div>
						) : (
							<div className="placeholder avatar">
								<div
									style={{ background: data.primary_color }}
									className="w-7 rounded-full text-neutral-content"
								>
									<span className="text-lg">
										{data.display_name[0].toUpperCase()}
									</span>
								</div>
							</div>
						)}
						<a>{data.url}</a>
					</div>
				</li>
			))}
		</>
	);
};

export default Subreddit;
