import { mutationField, intArg } from 'nexus';
import Gear from '../../model/objecTypes/Gear';
import { removeFfolkGear } from './Gears.resolver';

export const RemoveFisherfolkGear = mutationField('removeFisherfolkGear', {
  type: Gear,
  args: {
    id: intArg(),
  },
  resolve: async (_, { id }, context) => await removeFfolkGear(id, context),
});
