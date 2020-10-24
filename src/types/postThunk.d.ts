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

interface TimelineResponse {
	kind: string;
	data: {
		modhash: string;
		dist: number;
		children: Child[];
		after: string;
		before: string | null;
	};
}
