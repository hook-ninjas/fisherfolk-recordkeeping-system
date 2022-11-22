import { objectType, nullable } from 'nexus';
import { nullableList } from '../../../../utils/utils';
import {
  CivilStatus,
  EducationalBackground,
  FisherfolkStatus,
  Gender,
  Salutation,
} from '../../enums';
import Gear from './Gear';
import Image from './Image';
import Livelihood from './Livelihood';
import Organization from './Organization';
import Permit from './Permit';
import Queue from './Queue';
import Vessel from './Vessel';

const Fisherfolk = objectType({
  nonNullDefaults: {
    input: true,
    output: true,
  },
  name: 'Fisherfolk',
  definition(t) {
    t.bigInt('id');
    t.field('registrationDate', { type: 'DateTime' });
    t.string('lastName');
    t.string('firstName');
    t.string('middleName');
    t.string('appellation');
    t.int('age');
    t.field('salutation', { type: Salutation });
    t.string('barangay');
    t.string('cityMunicipality');
    t.string('province');
    t.string('contactNum');
    t.int('residentYear');
    t.field('dateOfBirth', { type: 'DateTime' });
    t.string('placeOfBirth');
    t.string('religion');
    t.field('gender', { type: Gender });
    t.field('civilStatus', { type: CivilStatus });
    t.int('numOfChildren');
    t.string('nationality');
    t.field('educationalBackground', { type: EducationalBackground });
    t.string('personToNotify');
    t.string('ptnRelationship');
    t.string('ptnAddress');
    t.string('ptnContactNum');
    t.field('status', { type: FisherfolkStatus });
    t.boolean('isArchive');
    t.field('livelihoods', {
      type: nullableList(Livelihood),
      resolve: ({ id }, _, context) => {
        return context.prisma.fisherfolk
          .findUnique({ where: id })
          .livelihoods();
      },
    });
    t.field('organizations', {
      type: nullableList(Organization),
      resolve: ({ id }, _, context) => {
        return context.prisma.fisherfolk
          .findUnique({ where: id })
          .organizations();
      },
    });
    t.field('permit', {
      type: nullable(Permit),
      resolve: ({ id }, _, context) => {
        return context.prisma.fisherfolk.findUnique({ where: id }).permit();
      },
    });
    t.field('governmentAid', {
      type: nullableList(Queue),
      resolve: ({ id }, _, context) => {
        return context.prisma.fisherfolk
          .findUnique({ where: id })
          .governmentAid();
      },
    });
    t.field('images', {
      type: nullableList(Image),
      resolve: ({ id }, _, context) => {
        return context.prisma.fisherfolk.findUnique({ where: id }).images();
      },
    });

    t.field('gears', {
      type: nullableList(Gear),
      resolve: ({ id }, _, context) => {
        return context.prisma.fisherfolk.findUnique({ where: id }).gears();
      },
    });
    t.field('vessels', {
      type: nullableList(Vessel),
      resolve: ({ id }, _, context) => {
        return context.prisma.fisherfolk.findUnique({ where: id }).vessels();
      },
    });
    t.field('createdAt', { type: 'DateTime' });
    t.field('updatedAt', { type: 'DateTime' });
  },
});

export default Fisherfolk;
