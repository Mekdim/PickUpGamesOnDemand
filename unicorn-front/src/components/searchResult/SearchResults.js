import React from 'react';
import '../../css/HomeContent.css';
import { useStateValue } from '../../StateProvider';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import styled from '@emotion/styled';
import SearchBar from '../search/SearchBar';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import SearchSideBar from './SearchSideBar';
import SearchMap from './SearchMap';
import Stack from '@mui/material/Stack';

const ContainerStyled = styled(Container)`
  padding: 0;
`;

const StyledHeader = styled.h1`
  margin-top: 8px;
  margin-bottom: 4px;
`;

const StyledMapColumn = styled.div`
  height: 100% !important;
  width: 100% !important;
`;

const StyledResultsBar = styled(Stack)`
  overflow: scroll;
  height: calc(100vh - 150px) !important;
`;

function SearchResults() {
  const [{ homeFields }] = useStateValue();
  const theme = useTheme();
  const smallest = useMediaQuery(theme.breakpoints.down('sm'));
  const small = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const medium = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const large = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <div className="homeSection">
      {(smallest || small) && <SearchBar />}
      <StyledHeader>Search Results</StyledHeader>
      <ContainerStyled maxWidth={'xl'}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={4} lg={3}>
            <StyledResultsBar spacing={1}>
              <SearchSideBar homeFields={homeFields} />
            </StyledResultsBar>
          </Grid>
          {(medium || large) && homeFields?.fields && (
            <Grid item md={8} lg={9}>
              <StyledMapColumn>
                <SearchMap locations={homeFields} />
              </StyledMapColumn>
            </Grid>
          )}
        </Grid>
      </ContainerStyled>
    </div>
  );
}

export default SearchResults;
