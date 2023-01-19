import { useQuery } from '@tanstack/react-query';
import { getMulti } from 'utils/reddit';

/**
 * Returns the multi reddit view in the sidebar
 * @param token the access token of useSession()
 */
const Feed: React.FC<{ token?: string }> = ({ token }) => {
	const { status, data } = useQuery(['multi_subreddit'], () => getMulti(token || ''), {
		enabled: !!token
	});

	return (
		<>
			<li className="menu-title">
				<span>Feeds</span>
			</li>
			{data?.map((v, i) => (
				<li key={i}>
					<a>
						<div className="avatar placeholder">
							<div className="w-7 rounded-full bg-neutral-focus text-neutral-content">
								<span className="text-lg">
									{v.data.display_name[0].toUpperCase()}
								</span>
							</div>
						</div>
						{v.data.display_name}
					</a>
				</li>
			))}
		</>
	);
};

export default Feed;
