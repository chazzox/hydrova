const Feed: React.FC<{ token?: string }> = ({ token }) => {
	// const { status, data } = useQuery(['multi_subreddit'], () => getMulti(token));

	// console.log(status, data);
	return (
		<>
			<li className="menu-title">
				<span>Feeds</span>
			</li>
			{/* {data.map((v) => (
				<li>
					<a>{v.data.display_name}</a>
				</li>
			))} */}
		</>
	);
};

export default Feed;
