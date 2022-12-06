import GeneralHero from '@components/general-hero';
import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react';
import Link from 'next/link';

const Login: React.FC<{ providers: Awaited<typeof getProviders> }> = ({ providers }) => {
	return (
		<GeneralHero
			title="Hydrova"
			subtitle="High Performance Reddit Client"
			description="By leveraging the power of the modern web, We aim to accelerate your reddit
		experience"
		>
			{Object.values(providers).map((v: ClientSafeProvider) => (
				<button
					key={v.id}
					className="btn w-full"
					onClick={() => signIn(v.id, { callbackUrl: '/' })}
				>
					Sign In
				</button>
			))}
			<button className="btn-disabled btn w-full !cursor-not-allowed">
				Continue in guest mode (Coming soon...)
			</button>
			<Link href="https://www.reddit.com/register/">
				<button className="btn-ghost btn w-full">Sign Up</button>
			</Link>
		</GeneralHero>
	);
};

export async function getStaticProps() {
	const providers = await getProviders();
	return {
		props: { providers }
	};
}

export default Login;
