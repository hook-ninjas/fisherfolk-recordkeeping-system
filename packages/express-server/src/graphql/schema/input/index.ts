import CreateUserInput from './User.input';
import { CreateFfolkVesselInput, CreateVesselInput } from './Vessel.input';
import { CreateGearInput, CreateFfolkGearInput, UpdateFfolkGearInput } from './Gear.input';
import { ImageInput, UploadImageInput } from './Image.input';
import { CreateFfolkLivelihoodInput, CreateLivelihoodInput } from './Livelihood.input';
import { CreateFfolkOrganizationInput, OrganizationInput } from './Organization.input';
import { CreateFisherfolkInput, UpdateFisherfolkInput } from './Fisherfolk.input';
import { CreateProgramInput, UpdateProgramInput } from './GovernmentAid.input';

const Inputs = [CreateUserInput, CreateFisherfolkInput, CreateFfolkLivelihoodInput, CreateFfolkOrganizationInput, OrganizationInput, CreateLivelihoodInput, CreateVesselInput, CreateFfolkVesselInput, CreateGearInput, CreateFfolkGearInput, UpdateFfolkGearInput, UploadImageInput, ImageInput, UpdateFisherfolkInput, CreateProgramInput, UpdateProgramInput];

export default Inputs;
