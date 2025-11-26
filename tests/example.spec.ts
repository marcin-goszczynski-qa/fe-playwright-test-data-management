import { test, expect } from '../fixtures/testFixture';

test('user example test - on user created before test', async ({ user }) => {
    expect(user.name).toBeTruthy();
});

test('album example test - on album created inside test', async ({ album }) => {
    expect(album.title).toBeTruthy();
});

test('post example test - on post created inside test', async ({ post }) => {
    expect(post.title).toBeTruthy();
});

test('user example test - create user data, then create user via api and register created user', async ({
    usersGenerator,
}) => {
    const user = await usersGenerator.generate();
    expect(user.name).toBeTruthy();
    // Here UI actions to create user
    await usersGenerator.registerCreatedItemByName(user.name);
    // Thanks to that, cleanup will remove created user
});

test('album example test - create album data, then create album via api and register created album', async ({
    albumsGenerator,
}) => {
    const album = await albumsGenerator.generate();
    expect(album.title).toBeTruthy();
    // Here UI actions to create album
    await albumsGenerator.registerCreatedItemByName(album.title);
    // Thanks to that, cleanup will remove created album
});

test('post example test - create post data, then create post via api and register created post', async ({
    postsGenerator,
}) => {
    const post = await postsGenerator.generate();
    expect(post.title).toBeTruthy();
    // Here UI actions to create post
    await postsGenerator.registerCreatedItemByName(post.title);
    // Thanks to that, cleanup will remove created post
});
