import { Hydrova } from 'assets/icons';

interface HeroContentProps {
	children?: React.ReactNode;
	title: string;
	subtitle: string;
	description: string;
}

const HeroContent = (props: HeroContentProps) => {
	return (
		<>
			<div className="relative min-w-full rounded-lg bg-secondary p-3 pt-14 text-center text-secondary-content/70">
				<Hydrova className="absolute -top-10 left-1/2 h-24 -translate-x-1/2 drop-shadow-lg" />
				<h2 className="text-2xl font-bold text-secondary-content">{props.title}</h2>
				<h4 className="text-xl font-bold">{props.subtitle}</h4>
				<p className="font-semibold">{props.description}</p>
			</div>
			{props.children}
		</>
	);
};
export default HeroContent;
