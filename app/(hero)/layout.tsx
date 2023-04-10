import React from 'react';

const Hero = (props: { children: React.ReactNode }) => {
	return (
		<div className="hero min-h-screen p-10">
			<div className="hero-content max-w-2xl !flex-col rounded-lg border border-gray-500/20 bg-base-300 p-14 shadow-lg">
				{props.children}
			</div>
		</div>
	);
};

export default Hero;
