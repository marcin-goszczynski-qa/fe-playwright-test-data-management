import { test as base } from '@playwright/test';
import { UsersApi } from '../api/usersApi';
import { AlbumApi } from '../api/albumApi';
import { PostsApi } from '../api/postsApi';
import { UsersGenerator } from '../generators/usersGenerator';
import { AlbumsGenerator } from '../generators/albumsGenerator';
import { PostsGenerator } from '../generators/postsGenerator';
import { UserResponse } from '../api/types/usersTypes';
import { AlbumResponse } from '../api/types/albumsTypes';
import { PostResponse } from '../api/types/postsTypes';

type TestFixture = {
    usersApi: UsersApi;
    albumsApi: AlbumApi;
    postsApi: PostsApi;
    usersGenerator: UsersGenerator;
    albumsGenerator: AlbumsGenerator;
    postsGenerator: PostsGenerator;
    user: UserResponse;
    album: AlbumResponse;
    post: PostResponse;
};

export const test = base.extend<TestFixture>({
    usersApi: async ({ request }, use) => {
        const api = new UsersApi(request);
        use(api);
    },

    albumsApi: async ({ request }, use) => {
        const api = new AlbumApi(request);
        use(api);
    },

    postsApi: async ({ request }, use) => {
        const api = new PostsApi(request);
        use(api);
    },

    usersGenerator: async ({ usersApi }, use) => {
        const generator = new UsersGenerator(usersApi);
        use(generator);
    },

    albumsGenerator: async ({ albumsApi, usersGenerator }, use) => {
        const generator = new AlbumsGenerator(albumsApi, usersGenerator);
        use(generator);
    },

    postsGenerator: async ({ postsApi, usersGenerator }, use) => {
        const generator = new PostsGenerator(postsApi, usersGenerator);
        use(generator);
    },

    user: async ({ usersGenerator }, use) => {
        const user = await usersGenerator.generateAndPost();
        use(user);
    },

    album: async ({ albumsGenerator }, use) => {
        const album = await albumsGenerator.generateAndPost();
        use(album);
    },

    post: async ({ postsGenerator }, use) => {
        const post = await postsGenerator.generateAndPost();
        use(post);
    },
});

export { expect } from '@playwright/test';
