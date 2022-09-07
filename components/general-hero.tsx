import { Hydrova } from '@assets/icons';

type GeneralHeroProps = React.FC<{
	title: string;
	subtitle: string;
	description: string;
	children: React.ReactNode;
}>;

const GeneralHero: GeneralHeroProps = (props) => {
	return (
		<div className="hero min-h-screen">
			<div className="hero-content max-w-2xl !flex-col rounded-lg border border-gray-500/20 bg-base-300 p-14 shadow-lg">
				<div className="relative rounded-lg bg-secondary p-3 pt-14 text-center text-secondary-content/70">
					<Hydrova className="absolute -top-10 left-1/2 h-24 -translate-x-1/2 drop-shadow-lg" />
					<h2 className="text-2xl font-bold text-secondary-content">{props.title}</h2>
					<h4 className="text-xl font-bold">{props.subtitle}</h4>
					<p className="font-semibold">{props.description}</p>
				</div>
				{props.children}
			</div>
		</div>
	);
};
export default GeneralHero;
