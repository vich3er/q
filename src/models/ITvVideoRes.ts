export interface ITvVideo {
	site: string;
	size: number;
	iso_3166_1: string;
	name: string;
	official: boolean;
	id: string;
	type: string;
	published_at: string;
	iso_639_1: string;
	key: string;
}

export interface ITvVideoRes {
	id: number;
	results: Array<ITvVideo>;
}

