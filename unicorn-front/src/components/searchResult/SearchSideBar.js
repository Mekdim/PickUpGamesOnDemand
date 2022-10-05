import PitchCard from '../PitchCard';
import React from 'react';
import styled from '@emotion/styled';
import Paper from '@mui/material/Paper';
import markerDefault from '../../images/MarkerDefault.png';
import markerActive from '../../images/MarkerActive.png';

const StyledPara = styled.p`
  text-align: center;
`;

const Item = styled(Paper)`
  padding: 8px;
  text-align: center;
  box-shadow: none;
`;

const SearchSideBar = ({ homeFields }) => {
  if (homeFields) {
    return homeFields.fields.map((field) => (
      <Item
        key={field.pitch_id}
        onMouseEnter={(e) => {
          let marker = document.getElementById(`marker-id-${field.pitch_id}`);
          marker.style.backgroundImage = `url(${markerActive})`;
          marker.style.backgroundColor = `white`;
        }}
        onMouseLeave={(e) => {
          let marker = document.getElementById(`marker-id-${field.pitch_id}`);
          marker.style.backgroundImage = `url(${markerDefault})`;
          marker.style.backgroundColor = `white`;
        }}
      >
        <PitchCard
          path={'/pitch' + '/' + field.pitch_id + '/' + field.dateSearched}
          key={field.pitch_id}
          src={field.src}
          name={field.name}
          description={field.description}
        />
      </Item>
    ));
  }
  return (
    <StyledPara>
      No results! To get more results, try adjusting your search by changing
      your dates
    </StyledPara>
  );
};

export default SearchSideBar;
