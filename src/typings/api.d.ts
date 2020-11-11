interface userInfoSuccess {
	name: string;
	total_karma: number;
	icon_img: string;
}
interface failure {
	message: string;
	error: number;
}

interface responseSuccess {
	access_token: string;
	expires_in: number;
	scope: string;
	token_type: string;
}

interface userMulti {
	kind: string;
	data: {
		display_name: string;
		icon_url: string;
	};
}

type userMultiSuccess = userMulti[];
