import { AlbumApi } from '../api/albumApi';
import { AlbumBody, AlbumResponse } from '../api/types/albumsTypes';
import { randomFromWords } from '../utils/randomData';
import { Generator } from './generator';
import { UsersGenerator } from './usersGenerator';

export class AlbumsGenerator extends Generator<AlbumBody, AlbumResponse> {
    constructor(
        api: AlbumApi,
        private usersGenerator: UsersGenerator,
    ) {
        super(api);
    }

    async generate(item?: Partial<AlbumBody> | undefined): Promise<AlbumBody> {
        let userId: number;
        if (!item || !item.userId) {
            const user = await this.usersGenerator.generateAndPost();
            userId = user.id;
        } else {
            userId = item.userId;
        }

        const title = item?.title ?? randomFromWords(3);

        return {
            userId,
            title,
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
