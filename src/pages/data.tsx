import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { normalize, schema } from 'normalizr';

import jail from 'assets/jailbreak';

import 'styles/index.scss';
import 'styles/variables.scss';

const Data: React.FC = () => {
	// Define a users schema
	const user = new schema.Entity('users');

	// Define your comments schema
	const comment = new schema.Entity('comments', {
		commenter: user
	});

	// Define your article
	const article = new schema.Entity('articles', {
		author: user,
		comments: [comment]
	});
	const notNormal = {
		id: 123,
		author: {
			id: 1,
			otherThing: 'test',
			name: 'Paul'
		},
		title: 'My awesome blog post',
		comments: [
			{
				id: 324,
				commenter: {
					id: 2,
					name: 'Nicole'
				}
			},
			{
				id: 34,
				commenter: {
					id: 19,
					name: 'Me'
				}
			}
		]
	};
	const normalizedData = normalize(notNormal, article);
	return (
		<>
			<Helmet
				htmlAttributes={{
					class: 'darkMode'
				}}
			/>
			<h1 style={{ color: 'white' }}>Normalisation Testing</h1>
			<pre>
				<code style={{ color: 'white' }}>{JSON.stringify(normalizedData, null, 2)}</code>
			</pre>
			<pre>
				<code style={{ color: 'white' }}>{JSON.stringify(notNormal, null, 2)}</code>
			</pre>
			<pre>
				<code style={{ color: 'white' }}>{JSON.stringify(jail, null, 2)}</code>
			</pre>
		</>
	);
};

export default Data;
