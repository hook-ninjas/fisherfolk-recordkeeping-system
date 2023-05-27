import { faker } from '@faker-js/faker';
import cloudinary from 'cloudinary';
import { Context, createMockContext } from '../../../../context';
import { MockContext } from '../../../../../types/types';
import { NexusGenInputs } from '../../../../generated/nexus';
import { SourceOfIncome } from '@prisma/client';
import { convertActivities, createFisherfolkLivelihood } from '../Livelihood.resolver';

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = mockContext as unknown as Context;
});

afterEach(() => {
  jest.clearAllMocks();
});

const livelihoodInputs = [
  { fisherfolkId: 1, mainFishingAct: SourceOfIncome['CaptureFishing'], otherFishingAct: [SourceOfIncome['FishProcessing'], SourceOfIncome['FishVending'], SourceOfIncome['Aquaculture']], others: 'Painter' },
  { fisherfolkId: 324, mainFishingAct: SourceOfIncome['FishProcessing'], otherFishingAct: [], others: '' },
  { fisherfolkId: 452, mainFishingAct: SourceOfIncome['Aquaculture'], otherFishingAct: [SourceOfIncome['CaptureFishing'], SourceOfIncome['FishVending']], others: '' },
  { fisherfolkId: 21, mainFishingAct: SourceOfIncome['FishVending'], otherFishingAct: [], others: 'Builder' },
  { fisherfolkId: 10000, mainFishingAct: SourceOfIncome['FishVending'], otherFishingAct: [SourceOfIncome['FishVending']], others: '' },
];

describe('createFisherfolkLivelihood', () => {
  it.each(livelihoodInputs)('Should call prisma.create.livelihood with ($fisherfolkId, $mainFishingAct, $otherFishingAct, $others) as arguments', ({ fisherfolkId, mainFishingAct, otherFishingAct, others }) => {
    const livelihoods = convertActivities(mainFishingAct, otherFishingAct, others);
    const input = { fisherfolkId, mainFishingActivity: mainFishingAct, otherFishingActivity: otherFishingAct, otherSourceOfIncome: others };
    const result = createFisherfolkLivelihood(input, context);

    expect(context.prisma.livelihood.create).toHaveBeenCalled();
    expect(context.prisma.livelihood.create).toHaveReturned();
  });
});
