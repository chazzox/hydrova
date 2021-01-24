import React, { useState } from 'react';
import GenericButton from './genericButton';

const Sorter: React.FC<{ isCommentSort: boolean }> = ({ isCommentSort }) => {
	const sortOptions = ['best', 'hot', 'new', 'top', 'rising'] as const;
	type sortOptionType = typeof sortOptions[number];

	const [sortType, setSortType] = useState<sortOptionType>('best');

	return (
		<>
			{
				// mapping the sort type array and creating buttons based on that
				sortOptions.map((sortTypeString) => (
					<GenericButton
						key={sortTypeString}
						text={sortTypeString}
						isCompact={true}
						svgPath={sortTypeString}
						clickEvent={() => setSortType(sortTypeString)}
						isSelected={sortType == sortTypeString}
					/>
				))
			}
		</>
	);
};

export default Sorter;
