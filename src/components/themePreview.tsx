import React from 'react';

import { useDispatch } from 'react-redux';
import { AppDispatch } from 'reduxStore/reduxWrapper';
import { SET_STYLE_MODE } from 'reduxStore/settingsReducer';

import 'styles/component/themePreview.scss';

const ThemePreview: React.FC<{ themeName: string }> = ({ themeName }) => {
	const dispatch: AppDispatch = useDispatch();
	return (
		<div
			className="themePreview"
			id={themeName + 'Theme'}
			onClick={() => dispatch(SET_STYLE_MODE(`${themeName}`))}
			onMouseOver={() => dispatch(SET_STYLE_MODE(`${themeName}`))}
		>
			{
				/* insert space between lower case and upper case character
              for example to convert:    themeName → theme Name

           CSS then handles capitilisation of that output
              for example to convert:    theme Name → Theme Name
        */
				themeName.replace(/([a-z])([A-Z])/g, '$1 $2')
			}
		</div>
	);
};

export default ThemePreview;
