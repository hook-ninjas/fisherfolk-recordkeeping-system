import UserQuery from './User/User.query';
import FisherfolkQuery from './Fisherfolk/Fisherfolk.query';
import VesselsQuery from './Boats/Boats.query';
import GearsQuery from './Gears/Gears.query';

const User = [UserQuery];
const Fisherfolk = [FisherfolkQuery];
const Vessels = [VesselsQuery];
const Gears = [GearsQuery];

export default [
  User, Fisherfolk, Vessels, Gears
];
