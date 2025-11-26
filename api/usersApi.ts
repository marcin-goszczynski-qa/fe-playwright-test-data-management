import { APIRequestContext } from 'playwright';
import { Api } from './api';
import { UserBody, UserResponse } from './types/usersTypes';

export class UsersApi extends Api<UserBody, UserResponse> {
    constructor(request: APIRequestContext) {
        super(request, '/users');
    }
}
