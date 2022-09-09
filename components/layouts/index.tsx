import { Hamburger } from '@assets/icons';
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
			<label
				htmlFor={drawerId}
				className="drawer-button fixed inset-2 z-40 h-fit w-fit rounded-lg bg-secondary p-2 shadow-2xl lg:hidden"
			>
				<Hamburger />
			</label>
			{children}

			<Sidebar {...{ drawerId }} />
		</div>
	);
}
