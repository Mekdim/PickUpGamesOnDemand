import List from '@mui/material/List';
import OpenHourDayV2 from './OpenHourDayV2';
import React, { useContext } from 'react';
import styled from '@emotion/styled';
import ListItem from '@mui/material/ListItem';
import { PitchDataContext } from '../../../context/PitchDataContext';

const StyledList = styled(ListItem)`
  min-height: 40px;
  margin-bottom: 6px;
`;

const StandardHoursV2 = (props) => {
  const { pitch } = useContext(PitchDataContext);
  //TODO sort the opening hours to list from Monday - Sunday than randomly listing it
  return (
    <List>
      <StyledList>
        <OpenHourDayV2
          dayOfWeek={pitch?.openingHours[0]?.dayofweek}
          data={pitch?.openingHours[0]}
          {...props}
        />
      </StyledList>
      <StyledList>
        <OpenHourDayV2
          dayOfWeek={pitch?.openingHours[1]?.dayofweek}
          data={pitch?.openingHours[1]}
          {...props}
        />
      </StyledList>
      <StyledList>
        <OpenHourDayV2
          dayOfWeek={pitch?.openingHours[2]?.dayofweek}
          data={pitch?.openingHours[2]}
          {...props}
        />
      </StyledList>
      <StyledList>
        <OpenHourDayV2
          dayOfWeek={pitch?.openingHours[3]?.dayofweek}
          data={pitch?.openingHours[3]}
          {...props}
        />
      </StyledList>
      <StyledList>
        <OpenHourDayV2
          dayOfWeek={pitch?.openingHours[4]?.dayofweek}
          data={pitch?.openingHours[4]}
          {...props}
        />
      </StyledList>
      <StyledList>
        <OpenHourDayV2
          dayOfWeek={pitch?.openingHours[5]?.dayofweek}
          data={pitch?.openingHours[5]}
          {...props}
        />
      </StyledList>
      <StyledList>
        <OpenHourDayV2
          dayOfWeek={pitch?.openingHours[6]?.dayofweek}
          data={pitch?.openingHours[6]}
          {...props}
        />
      </StyledList>
    </List>
  );
};

export default StandardHoursV2;
