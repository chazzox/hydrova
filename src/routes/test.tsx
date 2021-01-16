import React, { useEffect, useState } from 'react';

import 'styles/index.scss';
import 'styles/variables.scss';
import { Helmet } from 'react-helmet';

const Test = () => {
	const [treeData, setTreeData] = useState<TreeNode[]>([]);

	useEffect(() => {
		fetch('https://www.reddit.com/r/headphones/comments/kwkjbb/there_is_no_other_choice_for_good_sound/.json', {
			method: 'GET'
		})
			.then((res) => res.json())
			.then((json: GeneralPostResponse) => {
				console.log('res', json);
				setTreeData(getStuff(json[1].data.children));
			})
			.catch((err) => console.log(err));
	}, []);

	const getStuff = (commentApiResponse: PurpleChild[]): TreeNode[] =>
		commentApiResponse.map<TreeNode>(({ data }) => ({
			id: data.id,
			body_html: data.body_html,
			children: typeof data.replies != 'object' ? [] : getStuff(data.replies.data.children),
			author: data.author,
			created_utc: data.created_utc,
			name: data.name,
			permalink: data.permalink,
			score: data.score
		}));

	return (
		<>
			<Helmet
				htmlAttributes={{
					class: 'defaultDark'
				}}
			/>
			<div className="main" style={{ minHeight: '97vh', flex: 1 }}>
				{treeData.length > 0 && <p>test</p>}
			</div>
		</>
	);
};

export default Test;
