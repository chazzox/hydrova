/**
 * Prefixes a value within an objects and assigns it a new key
 *
 * @param TObject - The object to add a prefix into.
 * @param TKey - The key to access the value you want to prefix.
 * @param TKeyNew - The new key.
 * @param Prefix - The prefix.
 */
export type PrefixObject<
	TObject extends { [key: string]: any },
	TKey extends keyof TObject,
	TKeyNew extends string | number | symbol,
	Prefix extends string
> = Spread<
	[TObject, { [k in TKeyNew]: Prefix extends string ? `${Prefix}${TObject[TKey]}` : never }]
>;

// don't ask me i have no idea
// https://stackoverflow.com/questions/49682569/typescript-merge-object-types

export type OptionalPropertyNames<T> = {
	[K in keyof T]-?: {} extends { [P in K]: T[K] } ? K : never;
}[keyof T];

export type SpreadProperties<L, R, K extends keyof L & keyof R> = {
	[P in K]: L[P] | Exclude<R[P], undefined>;
};

export type Id<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

export type SpreadTwo<L, R> = Id<
	Pick<L, Exclude<keyof L, keyof R>> &
		Pick<R, Exclude<keyof R, OptionalPropertyNames<R>>> &
		Pick<R, Exclude<OptionalPropertyNames<R>, keyof L>> &
		SpreadProperties<L, R, OptionalPropertyNames<R> & keyof L>
>;

export type Spread<A extends readonly [...any]> = A extends [infer L, ...infer R]
	? SpreadTwo<L, Spread<R>>
	: unknown;
