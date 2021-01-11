import React from 'react';
import Comments from 'components/postComments';

import 'styles/index.scss';
import 'styles/variables.scss';
import { Helmet } from 'react-helmet';

// const root = document.getElementById('___gatsby')!;
// root.style.margin = '10px 0 0 10px';
// root.style.flex = '1';

const Test = () => {
	return (
		<>
			<Helmet
				htmlAttributes={{
					class: 'defaultDark'
				}}
			></Helmet>
			<div className="main" style={{ minHeight: '100vh', flex: 1 }}>
				<Comments />
			</div>
		</>
	);
};

export default Test;
