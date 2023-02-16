import { useQuery } from '@apollo/client';
import {
  Grid,
  Paper,
  Stack,
  Typography,
  styled,
  Box,
} from '@mui/material';
import {

  FisherfolkCountDocument,
  FisherfolkGenderCountDocument,
  Gender,

} from '../../graphql/generated';
import Total from '../../Assets/total.jpg';
import Female from '../../Assets/female.png';
import Male from '../../Assets/male.png';
import Active from '../../Assets/active.png';

export const FisherfolkInfoPaper = styled(Paper)(({ theme }) => ({
  height: 70,
  padding: 8,
  borderRadius: 10,
  margin: 2,
  display: 'flex',
  justifyContent: 'center',
  [theme.breakpoints.up('sm')]: {
    width: 220,
  },
  [theme.breakpoints.down('sm')]: {
    width: 250,
  },
}));

export default function FisherfolkInfoCount() {
    
  const {data} = useQuery(FisherfolkCountDocument)  


  const getCountGender = (gender:Gender) =>{
    const  {data} =useQuery(FisherfolkGenderCountDocument,{
      variables:{
        gender:gender
      },
    })
    return data?.fisherfolkGender
  }

  const fisherfolkInfo: Record<string, any[]> = {
    'Total Fisherfolk': [Total,
    data?.totalFisherfolk
    ],
    'Active Fisherfolk': [Active, data?.activeFisherFolk],
    'Male Fisherfolk': [Male,getCountGender(Gender.Male)],
    'Female Fisherfolk': [Female, getCountGender(Gender.Female)],
    
  };

  const getCount = (value: string) => {
    return fisherfolkInfo[value][1];
  };



  return (
    <Stack direction="row" mb={5}>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: 'space-between', margin: 1 }}
      >
        {Object.keys(fisherfolkInfo).map((item) => (
          <FisherfolkInfoPaper key={item} elevation={2}>
            <Stack
              direction="row"
              spacing={1}
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item sm={3}>
                <Box
                  component="img"
                  src={fisherfolkInfo[item][0]}
                  sx={{ width: 37, borderRadius: 15 }}
                  mt={1}
                ></Box>
              </Grid>
              <Grid item sm={6}>
                <Typography variant="subtitle1" color="#71797E">
                  {item}
                </Typography>
              </Grid>
              <Grid item sm={3}>
                <Typography
                  variant="h5"
                  color="#71797E"
                  mt={1}
                  fontWeight={600}
                >
                  {getCount(item)}
                </Typography>
              </Grid>
              
            </Stack>
          </FisherfolkInfoPaper>
        ))}
      </Grid>
    </Stack>
  );
}
