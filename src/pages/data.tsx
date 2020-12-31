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

	const normalizedData = normalize(
		{
			id: '123',
			author: {
				id: '1',
				name: 'Paul'
			},
			title: 'My awesome blog post',
			comments: [
				{
					id: '324',
					commenter: {
						id: '2',
						name: 'Nicole'
					}
				}
			]
		},
		article
	);
	return (
		<>
			<Helmet
				htmlAttributes={{
					class: 'darkMode'
				}}
			/>
			<h1>Normalisation Testing</h1>
			<code>{JSON.stringify(normalizedData)}</code>
		</>
	);
};

export default Data;
