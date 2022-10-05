import React from 'react';
import '../css/HomeContent.css';
import PitchCard from './PitchCard';
import PhotoCard from './PhotoCard';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import styled from '@emotion/styled';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/material/styles/useTheme';
import SearchBar from './search/SearchBar';
import landingImage from '../images/Landing.avif';
import useFeaturedPitches from '../hooks/useFeaturedPitches';
import Skeleton from '@mui/material/Skeleton';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const ContainerStyled = styled(Container)`
  padding-top: 24px;
  padding-bottom: 24px;
`;

const GridStyled = styled(Grid)`
  align-items: center;
  justify-content: center;
`;

const LandingPage = styled.div`
  background-image: url(${landingImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.2);
`;

const StyledFeaturedGround = styled.span`
  background: -webkit-linear-gradient(45deg, #3423ca, #ea4aaa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

function HomeContent() {
  let { featuredGrounds, isLoading, isError } = useFeaturedPitches();
  const { t } = useTranslation('main');
  const theme = useTheme();
  const medium = useMediaQuery(theme.breakpoints.up('md'));
  if (featuredGrounds) {
    featuredGrounds = featuredGrounds.slice(0, 4);
  }
  return (
    <div className="homeSection">
      {!medium && <SearchBar />}
      <LandingPage>
        <h1
          style={{
            color: 'white',
            fontSize: '90px',
            marginTop: '-100px',
          }}
        >
          {t('welcome.title')}
        </h1>
        <p style={{ color: 'white', marginTop: '8px', fontSize: '30px' }}>
          {t('welcome.subTitle')}
        </p>
      </LandingPage>
      <h1>
        <StyledFeaturedGround>{t('welcome.featured')}</StyledFeaturedGround>
      </h1>
      <ContainerStyled maxWidth={'xl'}>
        {(isLoading || isError) && (
          <GridStyled container spacing={3}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rectangular" width={300} height={180} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rectangular" width={300} height={180} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rectangular" width={300} height={180} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rectangular" width={300} height={180} />
            </Grid>
          </GridStyled>
        )}
        {featuredGrounds?.length > 0 && (
          <GridStyled container spacing={3}>
            {featuredGrounds.map((field) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={field.id}>
                  <PitchCard
                    path={`/pitch/${field.id}/${moment().format('YYYY-MM-DD')}`}
                    key={field.id}
                    src={field.src}
                    name={field.name}
                    description={field.description}
                  />
                </Grid>
              );
            })}
          </GridStyled>
        )}
      </ContainerStyled>
      <div className="homeSection__photoGalaries">
        <h1>{t('welcome.gallery')}</h1>
        <ContainerStyled maxWidth={'xl'}>
          <GridStyled container spacing={3}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <PhotoCard
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO8y5KaqAOsMLe1tUI5B4tbm1CAt2oxIeQuA&usqp=CAU"
                description="Ball is life"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <PhotoCard
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiHvK_-J0E3jlriXMITj9SzZB0_Tjh2_xGwA&usqp=CAU"
                description="Boys playing Futsal in the morning"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <PhotoCard
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgKOOscz3tBcFRcf33OxaC654dQ-kfZlvkeQ&usqp=CAU"
                description="Play the beautiful game anywhere"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <PhotoCard
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRU0Kxz1urO4U-2j7D6mExyb0pyBT4L_a7NQ&usqp=CAU"
                description="Play the beautiful game anytime"
              />
            </Grid>
          </GridStyled>
        </ContainerStyled>
      </div>
    </div>
  );
}

export default HomeContent;
