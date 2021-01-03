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
