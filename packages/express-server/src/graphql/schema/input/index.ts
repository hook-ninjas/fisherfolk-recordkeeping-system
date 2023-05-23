import CreateUserInput from './User.input';
import CreateFisherfolkInput from './Fisherfolk.input';
import { CreateFfolkVesselInput, CreateVesselInput } from './Vessel.input';
import CreateGearInput from './Gear.input';
import { ImageInput, UploadImageInput } from './Image.input';
import { CreateFfolkLivelihoodInput, CreateLivelihoodInput } from './Livelihood.input';
import { CreateFfolkOrganizationInput, OrganizationInput } from './Organization.input';

const Inputs = [CreateUserInput, CreateFisherfolkInput, CreateFfolkLivelihoodInput, CreateFfolkOrganizationInput, OrganizationInput, CreateLivelihoodInput, CreateVesselInput, CreateFfolkVesselInput, CreateGearInput, UploadImageInput, ImageInput];

export default Inputs;
