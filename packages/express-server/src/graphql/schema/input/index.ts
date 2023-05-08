import CreateUserInput from './User.input';
import {
  CreateFisherfolkInput,
  UpdateFisherfolkInput,
} from './Fisherfolk.input';
import { CreateVesselInput, UpdateVesselInput } from './Vessel.input';
import CreateGearInput from './Gear.input';
import CreateImageInput from './Image.input';
import CreateProgramInput from './GovernmentAid.input';

const Inputs = [
  CreateUserInput,
  CreateFisherfolkInput,
  CreateVesselInput,
  CreateGearInput,
  CreateImageInput,
  UpdateFisherfolkInput,
  CreateProgramInput,
  UpdateVesselInput
];

export default Inputs;