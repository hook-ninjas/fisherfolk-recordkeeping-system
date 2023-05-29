import { nonNullArg } from '../../../../utils/utils';
import { UpdateFfolkGearInput } from '../../input/Gear.input';
import { mutationField } from 'nexus';
import Gear from '../../model/objecTypes/Gear';
import { updateFfolkGear } from './Gears.resolver';

export const UpdateFisherfolkGear = mutationField('updateFisherfolkGear', {
  type: Gear,
  args: {
    data: nonNullArg(UpdateFfolkGearInput),
  },
  resolve: async (_, { data }, ctx) => await updateFfolkGear(data, ctx),
});
