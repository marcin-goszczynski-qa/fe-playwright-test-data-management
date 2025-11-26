import { PostsApi } from '../api/postsApi';
import { PostBody, PostResponse } from '../api/types/postsTypes';
import { randomFromWords } from '../utils/randomData';
import { Generator } from './generator';
import { UsersGenerator } from './usersGenerator';

export class PostsGenerator extends Generator<PostBody, PostResponse> {
    constructor(
        api: PostsApi,
        private usersGenerator: UsersGenerator,
    ) {
        super(api);
    }

    async generate(item?: Partial<PostBody> | undefined): Promise<PostBody> {
        let userId: number;
        if (!item || !item.userId) {
            const user = await this.usersGenerator.generateAndPost();
            userId = user.id;
        } else {
            userId = item.userId;
        }

        const title = item?.title ?? randomFromWords(3);
        const body = item?.body ?? randomFromWords(10);

        return {
            userId,
            title,
            body,
        };
    }

    async registerCreatedItemByName(name: string): Promise<void> {
        const allObjects = await this.api.list();
        const object = allObjects.find((object) => object.title === name);
        if (!object) {
            throw new Error(`Object with name ${name} not found`);
        }
        this.createdItems.push(object);
    }

    async cleanup(): Promise<void> {
        await super.cleanup();
        await this.usersGenerator.cleanup();
    }
}
