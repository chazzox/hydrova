import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
	const { data: session, status } = useSession();

	return (
		<header className="navbar mb-10 bg-base-200">
			<p>
				{session?.user && (
					<>
						{session.user.image && (
							<img
								src={session.user.image}
								alt=""
								className="h-14 w-14 rounded-2xl"
							/>
						)}
						<span>
							<small>Signed in as</small>
							<br />
							<strong>{session.user.email ?? session.user.name}</strong>
						</span>
					</>
				)}
			</p>

			<Link href="/">
				<a className="btn btn-ghost">Home</a>
			</Link>

			<Link href="/login">
				<button
					onClick={(e) => {
						signOut({ redirect: false });
					}}
					className="btn btn-ghost"
				>
					Sign out
				</button>
			</Link>
		</header>
	);
}
