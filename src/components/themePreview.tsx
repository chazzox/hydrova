import classNames from 'classnames';
import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, ReduxStateType } from 'reduxStore/reduxWrapper';
import { SET_STYLE_MODE, PREVIEW_STYLE_MODE, SET_PREVIOUS_STYLE_MODE } from 'reduxStore/settingsReducer';

import 'styles/component/themePreview.scss';

const ThemePreview: React.FC<{ themeName: string }> = ({ themeName }) => {
	const dispatch: AppDispatch = useDispatch();
	const currentStyle = useSelector<ReduxStateType>((state) => state.settings.styleMode);
	return (
		<div
			className={classNames('themePreview', { selected: currentStyle == themeName })}
			id={themeName + 'Theme'}
			onClick={() => dispatch(SET_STYLE_MODE(`${themeName}`))}
			onMouseOver={() => dispatch(PREVIEW_STYLE_MODE(`${themeName}`))}
			onMouseOut={() => dispatch(SET_PREVIOUS_STYLE_MODE())}
		>
			{
				/* insert space between lower case and upper case character
			   for example to convert:    themeName → theme Name
               CSS then handles capitalisation of that output
               for example to convert:    theme Name → Theme Name */
				themeName.replace(/([a-z])([A-Z])/g, '$1 $2')
			}
		</div>
	);
};

export default ThemePreview;
