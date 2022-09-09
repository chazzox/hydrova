import { Home, Hydrova, Mail, Post, Search, Settings } from '@assets/icons';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const Sidebar: React.FC<{ drawerId: string }> = ({ drawerId }) => {
	const { data } = useSession();
	return (
		<div className="drawer-side relative">
			<label htmlFor="my-drawer-2" className="drawer-overlay"></label>
			<ul className="menu z-10 flex h-[calc(100%-88px)] w-64 gap-3 overflow-y-auto bg-base-300 p-4 pt-0 text-base-content">
				<li className="sticky top-0 z-10 bg-base-300 py-4">
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
						<Search className="h-5 w-5" />
					</button>
				</div>

				<li>
					<Link href="/">
						<a>
							<Home className="h-5 w-5" />
							Home
						</a>
					</Link>
				</li>
				<li>
					<Link href="/post">
						<a>
							<Post className="h-5 w-5" />
							Post
						</a>
					</Link>
				</li>
				<li>
					<Link href="/mail">
						<a>
							<Mail className="h-5 w-5" />
							Mail
						</a>
					</Link>
				</li>
				<li>
					<Link href="/settings/appearance">
						<a>
							<Settings className="h-5 w-5" />
							Settings
						</a>
					</Link>
				</li>

				<li className="menu-title">
					<span>Feeds</span>
				</li>

				<li className="menu-title">
					<span>My Subreddit's</span>
				</li>
			</ul>
			{data?.user && data.user?.image && (
				<div className="absolute bottom-0 z-20 flex w-full items-center gap-2 bg-base-300 p-4">
					<div className="avatar">
						<div className="h-14 w-14 rounded-xl ring ring-accent">
							<img
								src={data.user.image}
								alt={`profile picture of ${data.user.name}`}
							/>
						</div>
					</div>
					<div>{data.user?.name}</div>
				</div>
			)}
		</div>
	);
};
export default Sidebar;
