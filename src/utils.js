import { faker } from '@faker-js/faker';

export function createUser() {
    return {
        _id: faker.datatype.uuid(),
        address: {
            street: faker.address.streetAddress(),
            city: faker.address.cityName(),
            state: faker.address.state(),
            zipCode: faker.address.zipCode('######'),
            country: faker.address.country()  
        },
        age: faker.datatype.number({ max: 60, min: 18 }),
        email: faker.internet.email(),
        userName: faker.name.fullName(),
        phone: faker.phone.number('+91##########'),
        occupation: faker.name.jobTitle(),
        vehicle: {
            model: faker.vehicle.model(),
            maker: faker.vehicle.manufacturer(),
            age: faker.datatype.number({ min: 1, max: 5 })
        }
    }
}

export async function loadInitialData() {
    const items = []
    for(let i = 0; i < 10000; i++) {
        const user = createUser();
        items.push(user);
    }
    return items;
}