import { inputObjectType } from 'nexus';
import { Material } from '../enums';

const CreateVesselInput = inputObjectType({
  name: 'CreateVesselInput',
  definition(t) {
    t.string('homeport');
    t.string('name');
    t.string('type');
    t.string('placeBuilt');
    t.int('yearBuilt');
    t.field('material', {type: Material});
    t.float('registeredLength');
    t.float('registeredBreadth');
    t.float('registeredDepth');
    t.float('tonnageLength');
    t.float('tonnageBreadth');
    t.float('tonnageDepth');
    t.float('grossTonnage');
    t.float('netTonnage');
    t.string('engineMake');
    t.string('serialNumber');
    t.float('horsepower');
  },
});

export default CreateVesselInput;