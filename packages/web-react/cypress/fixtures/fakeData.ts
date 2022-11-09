import { faker } from '@faker-js/faker';
import * as fs from 'fs';
import { randomBarangay, randomCivilStatus, randomEducationalBackground, randomGender, randomInt, randomNationality, randomRegistrationType, randomSalutation, randomSourceOfIncome } from './randomizer';

const jsonObject = {
  fisherfolks: [],
};

const { name, phone, date, address } = faker;

for (let i = 0; i < 15; i++) {
  const object = {
    registrationType: randomRegistrationType(),
    salutation: randomSalutation(),
    lastName: name.lastName(),
    firstName: name.firstName(),
    middleName: name.middleName(),
    contactNum: phone.number('09#########'),
    barangay: randomBarangay(),
    residentYear: randomInt(2022, 1970),
    dateOfBirth: date.birthdate().toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
    }),
    civilStatus: randomCivilStatus(),
    gender: randomGender(),
    educationalBackground: randomEducationalBackground(),
    numOfChildren: randomInt(12),
    nationality: randomNationality(),
    personToNotify: name.fullName(),
    ptnAddress: address.city() + ' ' + address.state(),
    ptnContactNum: phone.number('09#########'),
    mainSourceOfIncome: randomSourceOfIncome(),
    orgMemberYear: randomInt(2022, 1970),
  };
  jsonObject.fisherfolks.push(object);
}

const data = JSON.stringify(jsonObject, null, '\n');

fs.writeFile('fishefolk.json', data, (err) => {
  if (err) throw err;
  console.log('complete');
});
