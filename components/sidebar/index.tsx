import { Home, Hydrova, Mail, Post, Search, Settings } from 'assets/icons';
import Link from 'next/link';
import Feed from './feed';
import Subreddit from './subreddit';

/**
 * the sidebar component of the application
 * @param drawerId this is a react hook generated id, used for the daisyui toggle state
 * @returns
 */
const Sidebar: React.FC<{ drawerId: string }> = ({ drawerId }) => {
	const data: any = undefined;

	return (
		<div className="drawer-side">
			<label htmlFor={drawerId} className="drawer-overlay"></label>
			<ul className="menu z-10 flex h-full w-64 gap-3 overflow-y-auto overscroll-none bg-base-300 p-4 pb-0 pt-0 text-base-content">
				<li className="sticky top-0 z-10 bg-base-300 py-4">
					<Link href="/" className="font-bold">
						<div className="flex items-center">
							<Hydrova className="h-8 w-8" />
							Hydrova
						</div>
					</Link>
				</li>

				<div className="input-group">
					<input
						type="text"
						placeholder="Search…"
						className="input-bordered input w-full"
					/>
					<button className="btn-square btn">
						<Search className="h-5 w-5" />
					</button>
				</div>

				<li>
					<Link href="/">
						<Home className="h-5 w-5" />
						Home
					</Link>
				</li>
				<li>
					<Link href="/post">
						<Post className="h-5 w-5" />
						Post
					</Link>
				</li>
				<li>
					<Link href="/mail">
						<Mail className="h-5 w-5" />
						Mail
					</Link>
				</li>
				<li>
					<Link href="/settings/appearance">
						<Settings className="h-5 w-5" />
						Settings
					</Link>
				</li>

				<Feed token={data?.accessToken} />
				<Subreddit token={data?.accessToken} />

				{data?.user && data?.user?.image && (
					<div className="sticky bottom-0 mt-auto flex w-full items-center gap-10 bg-base-300 p-4">
						<div className="avatar">
							<div className="h-14 w-14 rounded-xl ring ring-accent">
								<img
									src={data?.user.image}
									alt={`profile picture of ${data?.user.name}`}
								/>
							</div>
						</div>
						<div>{data?.user?.name}</div>
					</div>
				)}
			</ul>
		</div>
	);
};

export default Sidebar;
