import List from '@mui/material/List';
import OpenHourDay from './OpenHourDay';
import React from 'react';
import styled from '@emotion/styled';
import ListItem from '@mui/material/ListItem';

const StyledList = styled(ListItem)`
  min-height: 40px;
  margin-bottom: 6px;
`;

const StandardHours = (props) => {
  return (
    <List>
      <StyledList>
        <OpenHourDay day={'Monday'} {...props} />
      </StyledList>
      <StyledList>
        <OpenHourDay day={'Tuesday'} {...props} />
      </StyledList>
      <StyledList>
        <OpenHourDay day={'Wednesday'} {...props} />
      </StyledList>
      <StyledList>
        <OpenHourDay day={'Thursday'} {...props} />
      </StyledList>
      <StyledList>
        <OpenHourDay day={'Friday'} {...props} />
      </StyledList>
      <StyledList>
        <OpenHourDay day={'Saturday'} {...props} />
      </StyledList>
      <StyledList>
        <OpenHourDay day={'Sunday'} {...props} />
      </StyledList>
    </List>
  );
};

export default StandardHours;
