import { inputObjectType, list } from 'nexus';
import { UploadImageInput } from './Image.input';
import { Material } from '../enums';

// Vessel Input for Registering Ffolk //
const CreateFfolkVesselInput = inputObjectType({
  name: 'CreateFfolkVesselInput',
  definition(t) {
    t.string('mfvrNumber');
    t.string('homeport');
    t.string('name');
    t.string('type');
    t.string('placeBuilt');
    t.nullable.int('yearBuilt');
    t.nullable.field('material', { type: Material });
    t.nullable.float('registeredLength');
    t.nullable.float('registeredBreadth');
    t.nullable.float('registeredDepth');
    t.nullable.float('tonnageLength');
    t.nullable.float('tonnageBreadth');
    t.nullable.float('tonnageDepth');
    t.nullable.float('grossTonnage');
    t.nullable.float('netTonnage');
    t.string('engineMake');
    t.string('serialNumber');
    t.nullable.float('horsepower');
    t.field('files', { type: list(UploadImageInput) });
  },
});

const CreateVesselInput = inputObjectType({
  name: 'CreateVesselInput',
  definition(t) {
    t.field('fisherfolkId', { type: 'BigInt' });
    t.string('mfvrNumber');
    t.string('homeport');
    t.string('name');
    t.string('type');
    t.string('placeBuilt');
    t.nullable.int('yearBuilt');
    t.nullable.field('material', { type: Material });
    t.nullable.float('registeredLength');
    t.nullable.float('registeredBreadth');
    t.nullable.float('registeredDepth');
    t.nullable.float('tonnageLength');
    t.nullable.float('tonnageBreadth');
    t.nullable.float('tonnageDepth');
    t.nullable.float('grossTonnage');
    t.nullable.float('netTonnage');
    t.string('engineMake');
    t.string('serialNumber');
    t.nullable.float('horsepower');
  },
});

export { CreateVesselInput, CreateFfolkVesselInput };
