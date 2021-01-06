import React from 'react';

import 'styles/component/pillSelector.scss';

const PillSelector = ({ options }: { options: string[] }, label?: string) => {
	return (
		<>
			{/* {label && <h1>{label}</h1>} */}
			<div className="pillSelector">
				{options &&
					options.map(option => (
						<div id={option} className="pillInside">
							{option}
						</div>
					))}
			</div>
		</>
	);
};

export default PillSelector;
