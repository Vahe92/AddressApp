const mongoose = require('mongoose');
const config = require('config');
const { Country, createCountry } = require('../../../models/country');
const { Region } = require('../../../models/region');
let server;

describe('country', () => {
    beforeEach(() => { server = require('../../../app'); });
    afterEach(() => { server.close(); });

    describe('createCountry ', () => {
        it('should save valid country to the database', async () => {

            const name = 'UK';
            createCountry(name, [
                new Region({ name: 'London' }),
                new Region({ name: 'North West' }),
                new Region({ name: 'South East' })
            ]);

            let country = await Country.find({name:name});
            country = country[0];

            expect(country).toBeDefined();
            expect(country.name).toMatch('UK');
            expect(country.regions[0].name).toMatch('London');
            expect(country.regions[1].name).toMatch('North West');
            expect(country.regions[2].name).toMatch('South East');
        });
    });
});