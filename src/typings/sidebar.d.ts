interface SidebarStoredSub {
	display_name: string;
	icon_img: string;
	subreddit_type: string;
	icon_color: string;
	community_icon?: string;
}

interface multi {
	icon_img: string;
	display_name: string;
	icon_color: string;
}

interface userSubSuccess {
	kind: string;
	data: {
		after: string | null | undefined;
		before: string | null;
		dist: number;
		children: {
			kind: string;
			data: SidebarStoredSub;
		}[];
	};
}
