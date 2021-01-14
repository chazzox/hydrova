import React from 'react';
import Comments from 'components/postComments';

import 'styles/index.scss';
import 'styles/variables.scss';
import { Helmet } from 'react-helmet';

const Test = () => {
	return (
		<>
			<Helmet
				htmlAttributes={{
					class: 'defaultDark'
				}}
			></Helmet>
			<div className="main" style={{ minHeight: '97vh', flex: 1 }}>
				<Comments />
			</div>
		</>
	);
};

export default Test;
