export type PostBody = {
    userId: number;
    title: string;
    body: string;
};

export type PostResponse = PostBody & {
    id: number;
};
