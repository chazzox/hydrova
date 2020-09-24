import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

type Props = {};
type ComposedProps = Props &
	RouteComponentProps<{
		query: string;
	}>;

const Home: React.FC<ComposedProps> = props => {
	return <p>does not exist</p>;
};

export default Home;
