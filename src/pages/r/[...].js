import React from 'react';

const Page = () => {
	let test;
	React.useEffect(() => {
		test = JSON.stringify(document.location);
	}, []);
	return <>{test}</>;
};

export default Page;
