interface GetPostResponse {
	[index: string]: any;
}
[];

interface saveSuccess {
	response: {};
	fullName: string;
	isSaving: boolean;
}
interface voteSuccess {
	response: {};
	fullName: string;
	voteDir: -1 | 0 | 1;
}

interface ListingResponse {
	kind: string;
	data: {
		modhash: string;
		dist: number;
		children: Child[];
		after: string;
		before: string | null;
	};
}

interface post {
	is_self: boolean;
	is_video: boolean;
	is_gallery: boolean;
	saved: boolean;
	selftext_html: string | null;
	post_hint?: PostHint;
	url: string;
	id: string;
	ups: number;
	title: string;
	subreddit_name_prefixed: string;
	author: string;
	num_comments: number;
	name: string;
	permalink: string;
	created_utc: number;
	likes: boolean | null;
	media: {
		reddit_video?: {
			height: number;
			width: number;
			fallback_url: string;
		};
	};
	media_meta?: { [key: string]: MediaMetadatum };
	gallery_data?: GalleryDataClass;
}
