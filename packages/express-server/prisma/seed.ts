/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  PrismaClient,
  Salutation,
  Gender,
  CivilStatus,
  EducationalBackground,
  SourceOfIncome,
  FisherfolkStatus,
  Material,
  GearClassification,
} from '@prisma/client';
import { faker } from '@faker-js/faker';
import { addYears } from 'date-fns';

const db = new PrismaClient();

type Name = 'first' | 'last' | 'middle' | 'full';

const getRandomInt = (max: number, min = 0) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
};

const randomName = (gender: Gender, type: Name) => {
  const name = {
    first: faker.name.firstName(gender != 'Male' ? 'female' : 'male'),
    last: faker.name.lastName(gender != 'Male' ? 'female' : 'male'),
    middle: faker.name.middleName(gender != 'Male' ? 'female' : 'male'),
    full: faker.name.fullName({ sex: gender != 'Male' ? 'female' : 'male' }),
  };
  return name[type];
};

const randomSalutation = (gender: Gender, civilStatus: CivilStatus) => {
  const salutation = {
    Male: Salutation.Mr,
    Female: civilStatus == 'Single' ? Salutation.Ms : Salutation.Mrs,
  };

  return salutation[gender];
};

const clearDb = async () => {
  await db.fisherfolk.count().then(async (count) => {
    if (count > 1) {
      await db.member.deleteMany();
      await db.organization.deleteMany();
      await db.livelihood.deleteMany();
      await db.gear.deleteMany();
      await db.vessel.deleteMany();
      await db.permit.deleteMany();
      await db.fisherfolk.deleteMany();
    }
  });
};

const createFisherFolk = async (x: number) => {
  const { date, address, phone } = faker;
  const gender = Object.values(Gender);
  const civilStatus = Object.values(CivilStatus);
  const educationalBackground = Object.values(EducationalBackground);
  const appellation = ['Jr', 'Sr', ''];
  const sourceOfIncome = Object.values(SourceOfIncome);
  const status = Object.values(FisherfolkStatus);

  for (let i = 0; i < x; i++) {
    const randomGender = gender[getRandomInt(gender.length)];
    const randomCivilStatus = civilStatus[getRandomInt(civilStatus.length)];
    const randomEducationalBackground =
      educationalBackground[getRandomInt(educationalBackground.length)];
    const randomSrc = sourceOfIncome[getRandomInt(4)];
    const randomStatus = status[getRandomInt(status.length)];
    const birthdate = date.birthdate({ min: 1950, max: 2002, mode: 'year' });
    const regDate = date.between(
      '1968-01-01T00:00:00.000Z',
      '2002-01-01T00:00:00.000Z'
    );
    const certificateNumber = `${regDate.getFullYear}-${i}`;
    const renewalDate = date.between(addYears(regDate, 1), new Date());

    await db.fisherfolk.create({
      data: {
        registrationDate: regDate,
        lastName: randomName(randomGender, 'last'),
        firstName: randomName(randomGender, 'first'),
        middleName: randomName(randomGender, 'middle'),
        appellation: appellation[getRandomInt(appellation.length)],
        age: getRandomInt(60, 18),
        salutation: randomSalutation(randomGender, randomCivilStatus),
        barangay: address.street(),
        cityMunicipality: address.county(),
        province: address.state(),
        contactNum: phone.number('+639##########'),
        residentYear: getRandomInt(2022, birthdate.getFullYear()),
        dateOfBirth: birthdate,
        placeOfBirth: address.city(),
        religion: 'Catholic',
        gender: randomGender,
        civilStatus: randomCivilStatus,
        numOfChildren: getRandomInt(12),
        nationality: 'Filipino',
        educationalBackground: randomEducationalBackground,
        personToNotify: randomName(randomGender, 'full'),
        ptnRelationship: 'relative',
        ptnAddress: address.city() + ' ' + address.state(),
        ptnContactNum: phone.number('+639##########'),
        status: randomStatus,
        livelihoods: {
          create: {
            type: randomSrc,
            description: '',
          },
        },
        permit: {
          create: {
            certificateNumber: certificateNumber,
            registeredAt: regDate,
            renewedAt: renewalDate,
            expiresOn: addYears(renewalDate, 1),
          },
        },
      },
    });
  }
};

const createSecondaryLivelihoods = async () => {
  const fishCaptures = await db.livelihood.findMany({
    where: {
      type: SourceOfIncome.CaptureFishing,
    },
    select: {
      fisherfolkId: true,
    },
  });

  const ids = fishCaptures.map((ffolk) => ffolk.fisherfolkId);
  const sourceOfIncome = Object.values(SourceOfIncome);

  for (const i in ids) {
    for (let j = 1; j < getRandomInt(sourceOfIncome.length, 1); j++) {
      const data = { type: sourceOfIncome[j], description: '', isMain: false };
      await db.livelihood.create({
        data: {
          ...data,
          fisherfolkId: ids[i],
        },
      });
    }
  }
};

const createOtherLivelihoods = async (x: number) => {
  const ffolk = await db.fisherfolk.findMany({ select: { id: true } });
  const { name } = faker;
  const ids = ffolk.map((id) => id.id);

  for (let i = 0; i < x; i++) {
    await db.livelihood
      .create({
        data: {
          fisherfolkId: ids[getRandomInt(ids.length)],
          type: 'Others',
          description: name.jobType(),
          isMain: false,
        },
      })
      .catch((err) => err);
  }
};

const createOrgs = async (x: number) => {
  const { company } = faker;

  for (let i = 0; i < x; i++) {
    await db.organization.create({
      data: {
        name: company.name(),
      },
    });
  }
};

const connectMembers = async (x: number) => {
  const ffolks = await db.fisherfolk.findMany({
    select: { id: true, registrationDate: true },
  });
  const ffolkIds = ffolks.map((ffolk) => ffolk.id);
  const ffolkRegDates = ffolks.map((ffolk) => ffolk.registrationDate);
  const orgs = await db.organization.findMany({ select: { id: true } });
  const orgIds = orgs.map((org) => org.id);
  const positions = [
    'President',
    'Vice-President',
    'Secretary',
    'Treasurer',
    'Member',
  ];

  for (let i = 0; i < x; i++) {
    const randomIndex = getRandomInt(ffolks.length);
    const randomFfolk = ffolkIds[randomIndex];
    const randomOrg = orgIds[getRandomInt(orgIds.length)];
    const minYear = ffolkRegDates[randomIndex].getFullYear();
    const randomYear = getRandomInt(2022, minYear);
    const randomPosition = positions[getRandomInt(positions.length)];

    // await db.fisherfolk.update({
    //   where: {
    //     id: randomFfolk,
    //   },
    //   data: {
    //     organizations: {
    //       create: {
    //         yearJoined: randomYear,
    //         position: randomPosition,
    //         organizationId: randomOrg,
    //       },
    //     },
    //   },
    // });
    await db.member.create({
      data: {
        fisherfolkId: randomFfolk,
        organizationId: randomOrg,
        yearJoined: randomYear,
        position: randomPosition,
      },
    });
  }
};

const createGearBoatPermit = async (id: number | bigint) => {
  const { random, date } = faker;
  const dates = await db.permit.findFirst({
    where: {
      fisherfolkId: BigInt(id),
    },
    select: {
      registeredAt: true,
      renewedAt: true,
      expiresOn: true,
    },
  });
  const regAt = date.between(
    dates?.registeredAt ?? '1950-01-01T00:00:00.000Z',
    '2002-01-01T00:00:00.000Z'
  );
  const renewAt = date.between(addYears(regAt, 1), new Date());
  const expiresOn = addYears(renewAt, 1);
  const certNumber = `${regAt.getFullYear()}-${random.alphaNumeric(4)}`;

  return {
    certificateNumber: certNumber,
    registeredAt: regAt,
    renewedAt: renewAt,
    expiresOn: expiresOn,
  };
};

const createGear = async (x: number) => {
  const { commerce } = faker;
  const classification = Object.values(GearClassification);
  const gears = {
    HookAndLine: [
      'simple-hand line',
      'multiple-hand line',
      'bottom set long line',
      'drift long line',
      'troll line',
      'jig',
    ],
    GillNets: [
      'Surface gill net',
      'drfit gill net',
      'bottom set gill net',
      'trammel net',
      'encircling gill net',
    ],
    SeineNets: ['BeachSeine', 'Fry dozer or gatherer'],
    PotsAndTraps: [
      'fish pots',
      'crab pots',
      'squid pots',
      'fyke nets/filter nets',
      'fish corrals',
      'set net',
      'barrier net',
    ],
    LiftNets: [
      'crab lift nets',
      'fish lift nets',
      'new look or zapra',
      'shrimp lift nets',
      'lever net',
    ],
    FallingGear: ['cast net'],
    ScoopNets: ['man push nets', 'scoop nets'],
    Miscellaneous: ['spear', 'octupus/squid luring device', 'gaff hook'],
  };

  const fishCaptures = await db.livelihood.findMany({
    where: {
      type: SourceOfIncome.CaptureFishing,
    },
    select: {
      fisherfolkId: true,
    },
  });

  const ids = fishCaptures.map((ffolk) => ffolk.fisherfolkId);

  for (let i = 0; i < x; i++) {
    const randomClassification =
      classification[getRandomInt(classification.length)];
    const randomFfolk = ids[getRandomInt(ids.length)];
    const randomPermit = await createGearBoatPermit(randomFfolk);
    let type = commerce.productName();

    if (randomClassification != 'Others') {
      const length = gears[randomClassification].length;
      type = gears[randomClassification][getRandomInt(length)];
    }

    await db.fisherfolk.update({
      where: { id: randomFfolk },
      data: {
        gears: {
          create: {
            classification: randomClassification,
            type: type,
            permit: {
              create: {
                ...randomPermit,
              },
            },
          },
        },
      },
    });
  }
};

const createVessel = async (x: number) => {
  const { datatype, vehicle, random, address } = faker;
  const material = Object.values(Material);
  const type = ['Motorized', 'Non-Motorized', 'Others'];
  const ffolks = await db.fisherfolk.findMany({ select: { id: true } });
  const ids = ffolks.map((id) => id.id);

  for (let i = 0; i < x; i++) {
    const randomMaterial = material[getRandomInt(material.length)];
    const randomType = type[getRandomInt(type.length)];
    const randomFfolk = ids[getRandomInt(ids.length)];
    const randomPermit = await createGearBoatPermit(randomFfolk);
    const yearBuilt = getRandomInt(
      1950,
      randomPermit.registeredAt.getFullYear()
    );

    await db.fisherfolk.update({
      where: { id: randomFfolk },
      data: {
        vessels: {
          create: {
            mfvrNumber: random.alphaNumeric(8),
            homeport: address.county(),
            name: random.word(),
            type: randomType != 'Others' ? randomType : vehicle.fuel(),
            placeBuilt: address.county(),
            yearBuilt: yearBuilt,
            material: randomMaterial,
            registeredLength: datatype.float(),
            registeredBreadth: datatype.float(),
            registeredDepth: datatype.float(),
            tonnageLength: datatype.float(),
            tonnageBreadth: datatype.float(),
            tonnageDepth: datatype.float(),
            grossTonnage: datatype.float(),
            netTonnage: datatype.float(),
            engineMake: vehicle.manufacturer(),
            serialNumber: random.alphaNumeric(11),
            horsepower: datatype.float(),
            permit: {
              create: {
                ...randomPermit,
              },
            },
          },
        },
      },
    });
  }
};

clearDb()
  .then(() => createFisherFolk(1000))
  .then(() => createSecondaryLivelihoods())
  .then(() => createOtherLivelihoods(200))
  .then(() => createOrgs(20))
  .then(() => connectMembers(500))
  .then(() => createGear(300))
  .then(() => createVessel(300))
  .catch((err) => console.log(err));
