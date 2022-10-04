import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { getSubreddit } from 'utils/reddit';
const Subreddit = () => {
	const { data } = useSession();

	const { isLoading } = useQuery(['subreddit'], () => getSubreddit(data?.accessToken));

	return (
		<>
			<li className="menu-title">
				<span>My Subreddit's</span>
			</li>
		</>
	);
};

export default Subreddit;
