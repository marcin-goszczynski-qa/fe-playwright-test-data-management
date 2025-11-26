import { APIRequestContext } from 'playwright';
import { Api } from './api';
import { AlbumBody, AlbumResponse } from './types/albumsTypes';

export class AlbumApi extends Api<AlbumBody, AlbumResponse> {
    constructor(request: APIRequestContext) {
        super(request, '/albums');
    }
}
