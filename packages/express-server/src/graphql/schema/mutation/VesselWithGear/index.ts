import { CreateGears, CreateVessel, CreateVesselWithGear, UpdateMFVR, ArchiveGear, ArchiveVessel, UpdateVessel, RestoreGear, RestoreVessel } from './VesselWithGear.mutation';

const Mutations = [CreateVesselWithGear, CreateVessel, CreateGears, UpdateMFVR, ArchiveGear, ArchiveVessel, UpdateVessel, RestoreGear, RestoreVessel];

export default Mutations;
