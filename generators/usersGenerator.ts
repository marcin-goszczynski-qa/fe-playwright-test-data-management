import { UserBody, UserResponse } from '../api/types/usersTypes';
import { Generator } from './generator';
import {
    randomName,
    randomUsername,
    randomEmail,
    randomPhone,
    randomWebsite,
    randomInt,
    randomFromWords,
    pick,
    randomGeo,
    randomCompany,
    randomZip,
} from '../utils/randomData';

export class UsersGenerator extends Generator<UserBody, UserResponse> {
    async generate(item?: Partial<UserBody> | undefined): Promise<UserBody> {
        const name = item?.name ?? randomName();
        const username = item?.username ?? randomUsername();
        const email = item?.email ?? randomEmail(username);
        const phone = item?.phone ?? randomPhone();
        const website = item?.website ?? randomWebsite();

        const addressPartial = item?.address;
        const street = addressPartial?.street ?? `${randomFromWords(2)} St.`;
        const suite = addressPartial?.suite ?? `Suite ${randomInt(1, 999)}`;
        const city =
            addressPartial?.city ??
            pick(['Warsaw', 'Krakow', 'Gdansk', 'Wroclaw', 'Poznan', 'Lodz']);
        const zipcode = addressPartial?.zipcode ?? randomZip();
        const geoPartial = addressPartial?.geo;
        const geo = {
            lat: geoPartial?.lat ?? randomGeo().lat,
            lng: geoPartial?.lng ?? randomGeo().lng,
        };

        const companyPartial = item?.company;
        const company = {
            name: companyPartial?.name ?? randomCompany().name,
            catchPhrase:
                companyPartial?.catchPhrase ?? randomCompany().catchPhrase,
            bs: companyPartial?.bs ?? randomCompany().bs,
        };

        return {
            name,
            username,
            email,
            address: {
                street,
                suite,
                city,
                zipcode,
                geo,
            },
            phone,
            website,
            company,
        };
    }

    async registerCreatedItemByName(name: string): Promise<void> {
        const allObjects = await this.api.list();
        const object = allObjects.find((object) => object.name === name);
        if (!object) {
            throw new Error(`Object with name ${name} not found`);
        }
        this.createdItems.push(object);
    }
}
