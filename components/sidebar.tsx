import { Hydrova } from '@assets/icons';
import Link from 'next/link';

const Sidebar: React.FC<{ drawerId: string }> = ({ drawerId }) => {
	return (
		<div className="drawer-side">
			<label htmlFor={drawerId} className="drawer-overlay"></label>
			<ul className="menu w-64 overflow-y-auto bg-base-300 p-4 text-base-content">
				<li>
					<Link href="/">
						<a className="font-bold">
							<Hydrova className="inline-block h-8 w-8" />
							Hydrova
						</a>
					</Link>
				</li>
				<li>
					<a>Sidebar Item 1</a>
				</li>
				<li>
					<a>Sidebar Item 2</a>
				</li>
			</ul>
		</div>
	);
};
export default Sidebar;
