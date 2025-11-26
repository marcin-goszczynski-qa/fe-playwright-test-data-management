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
        await use(api);
    },

    albumsApi: async ({ request }, use) => {
        const api = new AlbumApi(request);
        await use(api);
    },

    postsApi: async ({ request }, use) => {
        const api = new PostsApi(request);
        await use(api);
    },

    usersGenerator: async ({ usersApi }, use) => {
        const generator = new UsersGenerator(usersApi);
        await use(generator);
        await generator.cleanup();
    },

    albumsGenerator: async ({ albumsApi, usersGenerator }, use) => {
        const generator = new AlbumsGenerator(albumsApi, usersGenerator);
        await use(generator);
        await generator.cleanup();
    },

    postsGenerator: async ({ postsApi, usersGenerator }, use) => {
        const generator = new PostsGenerator(postsApi, usersGenerator);
        await use(generator);
        await generator.cleanup();
    },

    user: async ({ usersGenerator }, use) => {
        const user = await usersGenerator.generateAndPost();
        await use(user);
    },

    album: async ({ albumsGenerator }, use) => {
        const album = await albumsGenerator.generateAndPost();
        await use(album);
    },

    post: async ({ postsGenerator }, use) => {
        const post = await postsGenerator.generateAndPost();
        await use(post);
    },
});

export { expect } from '@playwright/test';
