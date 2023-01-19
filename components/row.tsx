import Link from 'next/link';
import { POST_LISTING_DATA } from 'typings/reddit';

/**
 * This is the row component for the listing section of the app.
 * @param data the listing row data.
 */
const Row = (data: POST_LISTING_DATA['data']) => {
	const linkURL = new URL('https://www.reddit.com');
	linkURL.pathname = data.permalink;

	return (
		<div>
			<Link href={linkURL} target="_blank">
				<div className="h-32 w-full px-3" key={data.id}>
					<h3 className="font-bold text-white/60">{data.title}</h3>
					<p className="link">{data.url}</p>
				</div>
			</Link>
			<div className="divider m-0"></div>
		</div>
	);
};

export default Row;
