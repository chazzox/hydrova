import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';

import 'styles/component/pillSelector.scss';

const PillSelector: React.FC<{ options: string[]; label?: string }> = ({ options, label }) => {
	let { url } = useRouteMatch();
	return (
		<>
			{label && <h1>{label}</h1>}
			<div className="pillSelector">
				{options &&
					options.map((option) => (
						<NavLink exact to={`${url}/${option}`} activeClassName="selected">
							<div id={option} className="pillInside">
								{option}
							</div>
						</NavLink>
					))}
			</div>
		</>
	);
};

export default PillSelector;
