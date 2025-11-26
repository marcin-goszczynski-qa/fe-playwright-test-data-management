import { APIRequestContext } from 'playwright';
import { Api } from './api';
import { PostBody, PostResponse } from './types/postsTypes';

export class PostsApi extends Api<PostBody, PostResponse> {
    constructor(request: APIRequestContext) {
        super(request, '/posts');
    }
}
