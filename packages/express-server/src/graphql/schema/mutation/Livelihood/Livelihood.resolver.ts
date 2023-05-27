import { Livelihood, SourceOfIncome } from '@prisma/client';
import { Context } from '../../../context';
import { NexusGenInputs } from '../../../generated/nexus';

type CreateLivelihoodInput = NexusGenInputs['CreateLivelihoodInput'];
type CreateFFolkLivelihoodInput = NexusGenInputs['CreateFfolkLivelihoodInput'];

const convertMainFishAct = (mainFishingAct: SourceOfIncome) =>
  ({
    type: mainFishingAct,
    description: '',
    isMain: true,
  } as CreateLivelihoodInput);

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

export const convertActivities = (
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

  const result = livelihoods.flat() as Livelihood[];

  return result;
};

export const createLivelihood = async (
  input: CreateLivelihoodInput,
  context: Context
) => {
  const { fisherfolkId, type, description, isMain } = input;

  return await context.prisma.livelihood.create({
    data: {
      type,
      description,
      isMain,
      fisherfolk: {
        connect: { id: fisherfolkId },
      },
    },
  });
};

export const createFisherfolkLivelihood = async (
  input: CreateFFolkLivelihoodInput,
  context: Context
) => {
  const fisherfolkLivelihoods: Livelihood[] = [];
  const {
    fisherfolkId,
    mainFishingActivity,
    otherFishingActivity,
    otherSourceOfIncome,
  } = input;
  const livelihoods = convertActivities(
    mainFishingActivity,
    otherFishingActivity,
    otherSourceOfIncome
  );

  for (const livelihood in livelihoods) {
    const result = await createLivelihood(
      { ...livelihoods[livelihood], fisherfolkId: fisherfolkId },
      context
    );
    fisherfolkLivelihoods.push(result);
  }

  return fisherfolkLivelihoods;
};
