import GeneralHero from '@components/general-hero';

const About = () => {
	return (
		<GeneralHero
			title="Hydrova"
			subtitle="High Performance Reddit Client"
			description="Using the latest that web has to offer. So that we can bring you the fastest reddit experience"
		>
			<ul className="prose ml-4 list-disc">
				<li>We use server side rendering and small bundle sizes to maximize load times</li>
				<li>A redesigned UI to enable you to make the most out of your screen</li>
				<li>Cache lots of the site internals to reduce initial load</li>
			</ul>
		</GeneralHero>
	);
};

export default About;
