import { Hydrova, Search } from '@assets/icons';
import Link from 'next/link';

const Sidebar: React.FC<{ drawerId: string }> = ({ drawerId }) => {
	return (
		<div className="drawer-side">
			<label htmlFor={drawerId} className="drawer-overlay"></label>
			<ul className="menu flex w-64 gap-3 overflow-y-auto bg-base-300 p-4 text-base-content">
				<li>
					<Link href="/">
						<a className="font-bold">
							<Hydrova className="inline-block h-8 w-8" />
							Hydrova
						</a>
					</Link>
				</li>

				<div className="input-group">
					<input
						type="text"
						placeholder="Search…"
						className="input input-bordered w-full"
					/>
					<button className="btn btn-square">
						<Search />
					</button>
				</div>

				<li>
					<a>Home</a>
				</li>
				<li>
					<a>Post</a>
				</li>
				<li>
					<a>Mail</a>
				</li>
				<li>
					<Link href="/settings/appearance">
						<a>Settings</a>
					</Link>
				</li>

				<li className="menu-title">
					<span>Feeds</span>
				</li>

				<li className="menu-title">
					<span>My Subreddit's</span>
				</li>
			</ul>
		</div>
	);
};
export default Sidebar;
