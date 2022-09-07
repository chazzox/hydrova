import classNames from 'classnames';

type SVGProps = React.FC<React.HTMLAttributes<SVGAElement>>;

export const Hydrova: SVGProps = ({ className }) => {
	return (
		<svg className={className} viewBox="0 0 512 512">
			<path
				className="fill-secondary-content"
				d="M270.2 422.4l-54.1-272c-.7-3.6-2.7-6.8-5.7-9-39.6-29.9-78.4-43.7-80-44.2-7.2-2.5-15.1.8-18.5 7.6-.7 1.6-18.4 38.7-25.3 87.9-.5 3.6.3 7.3 2.4 10.4l154.1 230.6c2.8 4.3 7.6 6.7 12.5 6.7 1.9 0 3.9-.4 5.7-1.1 6.5-2.8 10.3-9.9 8.9-16.9z"
			/>
			<path
				className="fill-secondary-focus"
				d="M424.4 192.7c-6.9-49.1-24.6-86.3-25.3-87.9-3.3-6.9-11.3-10.2-18.4-7.6-1.6.6-40.4 14.4-80 44.2-2.9 2.2-5 5.4-5.7 9l-54.1 272c-1.4 7 2.4 14 9 16.7 1.9.8 3.8 1.1 5.7 1.1 4.9 0 9.6-2.4 12.5-6.7L422 203.1c2-3 2.9-6.8 2.4-10.4z"
			/>
			<path
				className="fill-secondary-content"
				d="M510.8 184.2c-.4-7.6-6.5-13.7-14.1-14.1-3.9-.2-97.2-4.8-167.4 44.2-6.8 4.7-8.4 14.1-3.7 20.8 1.7 2.4 4 4.2 6.6 5.3l-70.5 170.2c-3.3 0-5.2-.1-5.3-.1-8.3-.4-15.3 5.9-15.8 14.1-.5 8.3 5.9 15.3 14.1 15.8.7 0 4.1.2 9.5.2 29.9 0 122.6-5.1 182.2-64.7 70.2-70.3 64.7-186.8 64.4-191.7z"
			/>
			<path
				className="fill-secondary-focus"
				d="M270.4 424.5c-.5-8.3-7.5-14.6-15.8-14.1-.1 0-2 .1-5.3.1l-70.5-170.2c2.6-1.1 4.9-2.8 6.6-5.3 4.7-6.8 3.1-16.1-3.7-20.8-70.2-48.9-163.4-44.4-167.4-44.2-7.6.4-13.7 6.5-14.1 14.1-.3 4.9-5.8 121.4 64.4 191.7 59.6 59.6 152.3 64.7 182.2 64.7 5.4 0 8.7-.2 9.5-.2 8.3-.4 14.6-7.5 14.1-15.8z"
			/>
			<path
				className="fill-secondary-content"
				d="M255.5 70.5c-3.6 0-7.1 1.3-10 3.8-3.7 3.3-90 81.7-90 181.1s86.3 177.8 90 181.1c2.8 2.5 6.4 3.8 10 3.8"
			/>
			<path
				className="fill-secondary-focus"
				d="M265.5 74.3c-2.8-2.5-6.4-3.8-10-3.8v369.8c3.6 0 7.1-1.3 10-3.8 3.7-3.3 90-81.7 90-181.1-.1-99.4-86.3-177.8-90-181.1z"
			/>
		</svg>
	);
};

export const Search: SVGProps = ({ className }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className={classNames(className, 'h-6 w-6')}
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
		/>
	</svg>
);
