import React from 'react';
import { useLocation } from '@reach/router';

const Page = () => {
	const location = useLocation();

	return <>test: {JSON.stringify(location)}</>;
};

export default Page;
