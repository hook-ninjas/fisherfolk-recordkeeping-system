import FisherfolkQuery from './Fisherfolk/Fisherfolk.query';
import VesselsQuery from './Boats/Boats.query';
import GearsQuery from './Gears/Gears.query';

const Query = [FisherfolkQuery];
const Vessels = [VesselsQuery];
const Gears = [GearsQuery];

export default [
  Query, Vessels, Gears
];
