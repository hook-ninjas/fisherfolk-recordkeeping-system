import { list, nonNull, mutationField, intArg, stringArg } from 'nexus';
import { CreateGearInput } from '../../input/Gear.input';
import Vessel from '../../model/objecTypes/Vessel';
import Gear from '../../model/objecTypes/Gear';
import { CreateVesselInput, UpdateVesselInput } from '../../input/Vessel.input';
import {
  archiveGear,
  archiveVessel,
  createGear,
  createVessel,
  createVesselWithGear,
  restoreGear,
  restoreVessel,
  updateMfvr,
  updateVessel,
} from './VesselWithGear.resolver';

export const CreateVessel = mutationField('createVessel', {
  type: Vessel,
  args: {
    vessel: nonNull(CreateVesselInput),
  },
  resolve: async (_, args, context) => createVessel(args.vessel, context),
});

export const CreateGears = mutationField('createGears', {
  type: list(Gear),
  args: {
    gears: list(nonNull(CreateGearInput)),
  },
  resolve: async (_, args, context) =>
    args.gears.map((gear) => createGear(gear, context)),
});

export const CreateVesselWithGear = mutationField('createVesselWithGear', {
  type: Vessel,
  args: {
    vessel: nonNull(CreateVesselInput),
    gears: list(nonNull(CreateGearInput)),
  },
  resolve: async (_, args, context) =>
    createVesselWithGear(args.vessel, args.gears, context),
});

export const UpdateMFVR = mutationField('updateMfvr', {
  type: Vessel,
  args: {
    id: nonNull(intArg()),
    mfvrNum: nonNull(stringArg()),
  },
  resolve: async (_, args, context) =>
    updateMfvr(args.id, args.mfvrNum, context),
});

export const UpdateVessel = mutationField('updateVessel', {
  type: 'Vessel',
  args: {
    id: nonNull(intArg()),
    vessel: nonNull(UpdateVesselInput),
  },
  resolve: async (_, args, context) =>
    updateVessel(args.id, args.vessel, context),
});

export const ArchiveGear = mutationField('archiveGear', {
  type: Gear,
  args: {
    id: nonNull(intArg()),
  },
  resolve: async (_, args, context) => archiveGear(args.id, context),
});

export const ArchiveVessel = mutationField('archiveVessel', {
  type: Vessel,
  args: {
    id: nonNull(intArg()),
  },
  resolve: async (_, args, context) => archiveVessel(args.id, context),
});

export const RestoreGear = mutationField('restoreGear', {
  type: Gear,
  args: {
    id: intArg(),
  },
  resolve: (_, args, ctx) => restoreGear(args.id, ctx),
});

export const RestoreVessel = mutationField('restoreVessel', {
  type: Vessel,
  args: {
    id: intArg(),
  },
  resolve: (_, args, ctx) => restoreVessel(args.id, ctx),
});
