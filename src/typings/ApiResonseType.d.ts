interface Failure {
	message: string;
	error: number;
}

interface AuthenticationSuccess {
	access_token: string;
	expires_in: number;
	scope: string;
	token_type: string;
}

interface UserMultiResponse {
	kind: string;
	data: {
		display_name: string;
		icon_url: string;
	};
}

type UserMultiSuccess = UserMultiResponse[];
