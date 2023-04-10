import Link from 'next/link';
import HeroLayout from './(hero)/layout';
import { Home } from 'assets/icons';
import HeroContent from './(hero)/hero-content';
import RootLayout from './layout';

const NotFound = () => {
	return (
		<RootLayout>
			<HeroLayout>
				<HeroContent
					title="Hydrova"
					subtitle="Page not Found"
					description="This page does not exist!"
				>
					<ul className="menu rounded-box mt-6 w-[42rem] px-14">
						<li className="w-full rounded-xl">
							<Link className="mx-auto flex w-full flex-row justify-center " href="/">
								<Home className="h-5 w-5" />
								Home
							</Link>
						</li>
					</ul>
				</HeroContent>
			</HeroLayout>
		</RootLayout>
	);
};

export default NotFound;
