const About = () => {
	return (
		<ul className="prose ml-4 list-disc">
			<li>We use server side rendering and small bundle sizes to maximize load times</li>
			<li>A redesigned UI to enable you to make the most out of your screen</li>
			<li>Czache lots of the site internals to reduce initial load</li>
		</ul>
	);
};

About.title = () => 'Hydrova';
About.subtitle = () => 'High Performance Reddit Client';
About.description = () =>
	'Using the latest that web has to offer. So that we can bring you the fastest reddit experience';

export default About;
