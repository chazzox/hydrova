import Link from 'next/link';
import HeroContent from '../hero-content';
import { Home } from 'assets/icons';

function About(): any {
	return (
		<HeroContent
			title="Hydrova"
			subtitle="High Performance Reddit Client"
			description="Using the latest that web has to offer. So that we can bring you the fastest reddit experience"
		>
			<ul className="prose ml-4 list-disc">
				<li>We use server side rendering and small bundle sizes to maximize load times</li>
				<li>A redesigned UI to enable you to make the most out of your screen</li>
				<li>Cache lots of the site internals to reduce initial load</li>
			</ul>
			<ul className="menu rounded-box w-full p-3">
				<li className="w-full rounded-xl">
					<Link className="mx-auto flex w-full flex-row justify-center " href="/">
						<Home className="h-5 w-5" />
						Home
					</Link>
				</li>
			</ul>
		</HeroContent>
	);
}

export default About;
