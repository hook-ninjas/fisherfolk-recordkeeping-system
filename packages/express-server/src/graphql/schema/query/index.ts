import UserQuery from './User/User.query';
import FisherfolkQuery from './Fisherfolk/Fisherfolk.query';
import VesselsQuery from './Boats/Boats.query';
import GearsQuery from './Gears/Gears.query';
import LivelihoodQuery from './Livelihood/Livelihood.query';
import ImageQuery from './Image/Image.query';
import GovernmentAidQuery from './GovernmentAid/GovernmentAid.query';

const User = [UserQuery];
const Fisherfolk = [FisherfolkQuery];
const Vessels = [VesselsQuery];
const Gears = [GearsQuery];
const Livelihood = [LivelihoodQuery];
const Image = [ImageQuery];
const GovernmentAid = [GovernmentAidQuery];

export default [
  User,
  Fisherfolk,
  Vessels,
  Gears,
  Livelihood,
  Image,
  GovernmentAid,
];
