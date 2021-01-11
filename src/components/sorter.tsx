import React from 'react';
import { useSelector } from 'react-redux';

import { ReduxStateType } from 'reduxStore/reduxWrapper';
import GenericButton from './genericButton';

const Sorter: React.FC<{ isCommentSort: boolean }> = ({ isCommentSort }) => {
	const sortOptions = ['best', 'hot', 'new', 'top', 'rising'] as const;
	type sortOptionType = typeof sortOptions[number];

	const sortType = useSelector<ReduxStateType>(
		(state) => state.post[isCommentSort ? 'commentSortType' : 'postSortType']
	);

	return (
		<>
			{
				// mapping the sort type array and creating buttons based on that
				sortOptions.map((sortTypeString: sortOptionType) => (
					<GenericButton
						key={sortTypeString}
						text={sortTypeString}
						isCompact={true}
						svgPath={sortTypeString}
						clickEvent={() => setSortType({ isCommentSort: isCommentSort, sortType: sortTypeString })}
						isSelected={sortType == sortTypeString}
					/>
				))
			}
		</>
	);
};

export default Sorter;
