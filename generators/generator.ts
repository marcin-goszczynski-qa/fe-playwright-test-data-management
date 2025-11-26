import { Api } from '../api/api';
import { ResponseBase } from '../api/types/baseType';

export abstract class Generator<TBody, TResponse extends ResponseBase> {
    protected createdItems: TResponse[] = [];
    constructor(protected api: Api<TBody, TResponse>) {}

    abstract generate(item?: Partial<TBody>): Promise<TBody>;

    async generateAndPost(item?: Partial<TBody>): Promise<TResponse> {
        const generatedItem = await this.generate(item);
        const createdItem = await this.api.create(generatedItem);
        this.createdItems.push(createdItem);
        return createdItem;
    }

    abstract registerCreatedItemByName(name: string): Promise<void>;

    async cleanup() {
        for (const item of this.createdItems) {
            await this.api.delete(item.id);
        }
        this.createdItems = [];
    }
}
