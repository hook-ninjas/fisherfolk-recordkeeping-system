import { SourceOfIncome } from '@prisma/client';

// Functions that convert data to comply to prisma data type //

const convertMainFishAct = (mainFishingAct: SourceOfIncome) => ({
  type: mainFishingAct,
  description: '',
  isMain: true,
});

const convertOtherFishAct = (otherFishAct: SourceOfIncome) => ({
  type: otherFishAct,
  description: '',
  isMain: false,
});

const convertOtherSrcOfIncome = (src: string) => ({
  type: SourceOfIncome['Others'],
  description: src,
  isMain: false,
});

const convertActivities = (
  mainFishingAct: SourceOfIncome,
  otherFishingActs: SourceOfIncome[],
  otherSrcOfIncome: string
) => {
  const livelihoods = [];

  if (otherFishingActs.length != 0) {
    const secondaryLivelihood = otherFishingActs.map(convertOtherFishAct);
    livelihoods.push(secondaryLivelihood);
  }

  if (otherSrcOfIncome != '') {
    const nonFishingLivelihood = convertOtherSrcOfIncome(otherSrcOfIncome);
    livelihoods.push(nonFishingLivelihood);
  }

  const main = convertMainFishAct(mainFishingAct);

  livelihoods.push(main);

  return livelihoods.flat();
};

export { convertActivities };
