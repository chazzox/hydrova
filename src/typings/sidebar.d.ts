interface SidebarStoredSub {
	display_name: string;
	icon_img: string;
	subreddit_type: string;
	icon_color: string;
	community_icon?: string;
}

interface Multireddit {
	icon_img: string;
	display_name: string;
	icon_color: string;
}

interface UserAbout {
	name: string;
	total_karma: number;
	icon_img: string;
}
