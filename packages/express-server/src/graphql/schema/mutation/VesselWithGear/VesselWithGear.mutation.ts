import { list, nonNull, mutationField } from 'nexus';
import CreateGearInput from '../../input/Gear.input';
import CreateVesselInput from '../../input/Vessel.input';
import { createVesselWithGear } from './VesselWithGear.resolver';
import Vessel from '../../model/objecTypes/Vessel';

export const CreateVesselWithGear = mutationField('createVesselWithGear', {
  type: Vessel,
  args: {
    vessel: nonNull(CreateVesselInput),
    gears: list(nonNull(CreateGearInput)),
  },
  resolve: async (_, args, context) =>
    createVesselWithGear(args.vessel, args.gears, context),
});
