import { useId } from 'react';
import Sidebar from '../sidebar';

interface Props {
	children: React.ReactNode;
}

export default function Layout({ children }: Props) {
	const drawerId = useId();
	return (
		<div className="drawer-mobile drawer">
			<input id={drawerId} type="checkbox" className="drawer-toggle" />
			{children}

			<Sidebar {...{ drawerId }} />
		</div>
	);
}
