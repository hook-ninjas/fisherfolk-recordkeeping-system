import { list, objectType, nullable } from 'nexus';
import { Context } from '../../../types/types';
import {
  CivilStatus,
  EducationalBackground,
  FisherfolkStatus,
  Gender,
  Salutation,
} from '../enums';
import Organization from './Organization';
const Fisherfolk = objectType({
  nonNullDefaults: {
    input: true,
    output: true,
  },
  name: 'Fisherfolk',
  definition(t) {
    t.field('id', { type: 'BigInt' });
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
      type: list('Livelihood'),
      resolve: ({ id }, _, context: Context) => {
        return context.prisma.fisherfolk
          .findUnique({ where: id })
          .livelihoods();
      },
    });
    t.field('organizations', {
      type: nullable(list(nullable('Organization'))),
      resolve: ({ id }, _, context) => {
        return context.prisma.fisherfolk
          .findUnique({ where: id })
          .organizations();
      },
    });
    t.field('createdAt', { type: 'DateTime' });
    t.field('updatedAt', { type: 'DateTime' });
  },
});

export default Fisherfolk;
