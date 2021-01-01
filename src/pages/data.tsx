import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { normalize, schema } from 'normalizr';

import jail from 'assets/jailbreak';

import 'styles/index.scss';
import 'styles/variables.scss';

const Data: React.FC = () => {
	const shit = jail.data.children.map(
		({
			data: {
				subreddit,
				selftext_html,
				title,
				saved,
				id,
				ups,
				url,
				locked,
				subreddit_name_prefixed,
				author,
				num_comments,
				permalink,
				created_utc
			}
		}) => ({
			id,
			title,
			author,
			subreddit_name_prefixed,
			subreddit,
			selftext_html,
			num_comments,
			permalink,
			locked,
			saved,
			ups,
			url,
			created_utc
		})
	);
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

	const subreddit = new schema.Entity('subreddits');
	const users = new schema.Entity('users');
	const post = new schema.Entity('posts', [
		{
			author: users,
			subreddit_name_prefixed: subreddit
		}
	]);

	const normalizedData2 = normalize(shit, post);

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
				<code style={{ color: 'white', maxWidth: '500px', overflow: 'hidden' }}>
					{JSON.stringify(shit, null, 2)}
				</code>
			</pre>
			<pre>
				<code style={{ color: 'white' }}>{JSON.stringify(normalizedData2, null, 2)}</code>
			</pre>
		</>
	);
};

export default Data;
