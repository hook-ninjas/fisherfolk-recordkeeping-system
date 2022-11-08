import {
  PrismaClient,
  Nationality,
  RegistrationType,
  Salutation,
  Gender,
  CivilStatus,
  EducationalBackground,
  SourceOfIncome,
  FisherfolkStatus,
} from '@prisma/client';
import { faker } from '@faker-js/faker';

const db = new PrismaClient();

const getRandomInt = (max: number, min = 0) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
};

const createFisherFolk = (
  regType: RegistrationType,
  civilStatus: CivilStatus,
  gender: Gender,
  prefix: Salutation,
  nationality: Nationality,
  educationalBackground: EducationalBackground,
  srcofIncome: SourceOfIncome,
  status: FisherfolkStatus
) => {
  const { date, name, address, phone } = faker;

  const sex = gender == 'FEMALE' ? 'female' : 'male';

  return {
    registrationNum: getRandomInt(100),
    registrationDate: date.between('1970-01-01T00:00:00.000Z', new Date()),
    registrationType: regType,
    lastName: name.lastName(sex),
    firstName: name.firstName(sex),
    middleName: name.middleName(sex),
    age: getRandomInt(60, 18),
    salutation: prefix,
    barangay: 'brgy ' + address.street(),
    cityMunicipality: address.county(),
    province: address.state(),
    contactNum: phone.number('+639##########'),
    residentYear: getRandomInt(2022, 1970),
    dateOfBirth: date.birthdate(),
    placeOfBirth: address.city(),
    religion: 'Catholic',
    gender: gender,
    civilStatus: civilStatus,
    numOfChildren: getRandomInt(12),
    nationality: nationality,
    educationalBackground: educationalBackground,
    personToNotify: name.fullName({ sex: sex }),
    ptnRelationship: 'relative',
    ptnAddress: address.city() + ' ' + address.state(),
    ptnContactNum: phone.number('+639##########'),
    mainSrcOfIncome: srcofIncome,
    mainSrcGear: '',
    mainSrcMethod: '',
    image: '',
    signature: '',
    status: status,
  };
};

db.fisherfolk.count().then((count) => {
  if (count > 0) {
    throw new Error('Database is already seeded ❌');
  }

  db.fisherfolk
    .createMany({
      data: [
        createFisherFolk(
          'RENEWAL',
          'SINGLE',
          'MALE',
          'MR',
          'FILIPINO',
          'ELEMENTARY',
          'AQUACULTURE',
          'ACTIVE'
        ),
        createFisherFolk(
          'RENEWAL',
          'MARRIED',
          'MALE',
          'MR',
          'FILIPINO',
          'HIGH_SCHOOL',
          'CAPTURE_FISHING',
          'ACTIVE'
        ),
        createFisherFolk(
          'NEW_REGISTRATION',
          'SINGLE',
          'MALE',
          'MR',
          'FILIPINO',
          'POST_GRADUATE',
          'FISH_PROCESSING',
          'INACTIVE'
        ),
        createFisherFolk(
          'RENEWAL',
          'LEGALLY_SEPARATED',
          'MALE',
          'MR',
          'FILIPINO',
          'VOCATIONAL',
          'FISH_VENDING',
          'INACTIVE'
        ),
        createFisherFolk(
          'RENEWAL',
          'SINGLE',
          'MALE',
          'MR',
          'FILIPINO',
          'COLLEGE',
          'CAPTURE_FISHING',
          'DECEASED'
        ),
        createFisherFolk(
          'NEW_REGISTRATION',
          'MARRIED',
          'FEMALE',
          'MRS',
          'FILIPINO',
          'POST_GRADUATE',
          'AQUACULTURE',
          'ACTIVE'
        ),
        createFisherFolk(
          'NEW_REGISTRATION',
          'WIDOWED',
          'FEMALE',
          'MRS',
          'FILIPINO',
          'ELEMENTARY',
          'FISH_VENDING',
          'ACTIVE'
        ),
        createFisherFolk(
          'NEW_REGISTRATION',
          'SINGLE',
          'FEMALE',
          'MS',
          'FILIPINO',
          'POST_GRADUATE',
          'FISH_VENDING',
          'ACTIVE'
        ),
        createFisherFolk(
          'RENEWAL',
          'MARRIED',
          'FEMALE',
          'MRS',
          'FILIPINO',
          'POST_GRADUATE',
          'AQUACULTURE',
          'DECEASED'
        ),
        createFisherFolk(
          'NEW_REGISTRATION',
          'SINGLE',
          'FEMALE',
          'MS',
          'FILIPINO',
          'HIGH_SCHOOL',
          'CAPTURE_FISHING',
          'ACTIVE'
        ),
      ],
    })
    .catch((err) => err);
});
