import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

type Props = {};
type ComposedProps = Props &
	RouteComponentProps<{
		query: string;
	}>;

const SubredditHome: React.FC<ComposedProps> = props => {
	return <div id="contentContainer">sub</div>;
};

export default SubredditHome;
