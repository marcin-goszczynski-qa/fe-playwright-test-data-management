import { APIRequestContext } from 'playwright';
import { BASE_URL } from '../constants/urls';
import { ResponseBase } from './types/baseType';

export abstract class Api<TBody, TResponse extends ResponseBase> {
    constructor(
        protected request: APIRequestContext,
        protected endpointPath: string,
    ) {}

    async get(id: number): Promise<TResponse> {
        const response = await this.request.get(
            `${BASE_URL}${this.endpointPath}/${id}`,
        );
        return response.json();
    }

    async list(params?: Record<string, string | number>): Promise<TResponse[]> {
        const response = await this.request.get(
            `${BASE_URL}${this.endpointPath}`,
            { params },
        );
        return response.json();
    }

    async create(data: Partial<TBody>): Promise<TResponse> {
        const response = await this.request.post(
            `${BASE_URL}${this.endpointPath}`,
            { data },
        );
        return response.json();
    }

    async put(id: number, data: Partial<TBody>): Promise<TResponse> {
        const response = await this.request.put(
            `${BASE_URL}${this.endpointPath}/${id}`,
            { data },
        );
        return response.json();
    }

    async patch(id: number, data: Partial<TBody>): Promise<TResponse> {
        const response = await this.request.patch(
            `${BASE_URL}${this.endpointPath}/${id}`,
            { data },
        );
        return response.json();
    }

    async delete(id: number): Promise<TResponse> {
        const response = await this.request.delete(
            `${BASE_URL}${this.endpointPath}/${id}`,
        );
        return response.json();
    }
}
