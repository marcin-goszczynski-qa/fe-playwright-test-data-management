export type AlbumBody = {
    userId: number;
    title: string;
};

export type AlbumResponse = AlbumBody & {
    id: number;
};
