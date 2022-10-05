import EventBox from './EventBox';
import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import CurrentTimeIndicator from './CurrentTimeIndicator';
import { convertDate } from '../pitch/pitchHelper';

const StyledDay = styled.div`
  width: 100%;
`;

const StyledListItemButton = styled(ListItemButton)`
  padding: 0;
`;

const StyledList = styled(List)`
  padding: 6px 0 0 0;
`;

const Day = ({ events, click, hours, height, leadDate }) => {
  let lead = convertDate(new Date(leadDate));
  let current = convertDate(new Date());
  const [width, setWidth] = useState(0);
  const [showTimeIndicator, setShowTimeIndicator] = useState(
    lead.localeCompare(current) === 0
  );
  const dayRef = useCallback(
    (node) => {
      if (node !== null) {
        setWidth(node.getBoundingClientRect().width);
      }
    },
    [height]
  );
  useEffect(() => {
    setShowTimeIndicator(lead.localeCompare(current) === 0);
  }, [leadDate]);

  return (
    <StyledDay onClick={click}>
      {showTimeIndicator && (
        <CurrentTimeIndicator
          id={'current-time'}
          height={height}
          width={width}
        />
      )}
      <StyledList>
        <ListItem disablePadding ref={dayRef}>
          <StyledListItemButton>
            <EventBox children={events ? events[0] : null} enabled={hours[0]} />
          </StyledListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <StyledListItemButton>
            <EventBox children={events ? events[1] : null} enabled={hours[1]} />
          </StyledListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <StyledListItemButton>
            <EventBox children={events ? events[2] : null} enabled={hours[2]} />
          </StyledListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <StyledListItemButton>
            <EventBox children={events ? events[3] : null} enabled={hours[3]} />
          </StyledListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <StyledListItemButton>
            <EventBox children={events ? events[4] : null} enabled={hours[4]} />
          </StyledListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <StyledListItemButton>
            <EventBox children={events ? events[5] : null} enabled={hours[5]} />
          </StyledListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <StyledListItemButton>
            <EventBox children={events ? events[6] : null} enabled={hours[6]} />
          </StyledListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <StyledListItemButton>
            <EventBox children={events ? events[7] : null} enabled={hours[7]} />
          </StyledListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <StyledListItemButton>
            <EventBox children={events ? events[8] : null} enabled={hours[8]} />
          </StyledListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <StyledListItemButton>
            <EventBox children={events ? events[9] : null} enabled={hours[9]} />
          </StyledListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <StyledListItemButton>
            <EventBox
              children={events ? events[10] : null}
              enabled={hours[10]}
            />
          </StyledListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <StyledListItemButton>
            <EventBox
              children={events ? events[11] : null}
              enabled={hours[11]}
            />
          </StyledListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <StyledListItemButton>
            <EventBox
              children={events ? events[12] : null}
              enabled={hours[12]}
            />
          </StyledListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <StyledListItemButton>
            <EventBox
              children={events ? events[13] : null}
              enabled={hours[13]}
            />
          </StyledListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <StyledListItemButton>
            <EventBox
              children={events ? events[14] : null}
              enabled={hours[14]}
            />
          </StyledListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <StyledListItemButton>
            <EventBox
              children={events ? events[15] : null}
              enabled={hours[15]}
            />
          </StyledListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <StyledListItemButton>
            <EventBox
              children={events ? events[16] : null}
              enabled={hours[16]}
            />
          </StyledListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <StyledListItemButton>
            <EventBox
              children={events ? events[17] : null}
              enabled={hours[17]}
            />
          </StyledListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <StyledListItemButton>
            <EventBox
              children={events ? events[18] : null}
              enabled={hours[18]}
            />
          </StyledListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <StyledListItemButton>
            <EventBox
              children={events ? events[19] : null}
              enabled={hours[19]}
            />
          </StyledListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <StyledListItemButton>
            <EventBox
              children={events ? events[20] : null}
              enabled={hours[20]}
            />
          </StyledListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <StyledListItemButton>
            <EventBox
              children={events ? events[21] : null}
              enabled={hours[21]}
            />
          </StyledListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <StyledListItemButton>
            <EventBox
              children={events ? events[22] : null}
              enabled={hours[22]}
            />
          </StyledListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <StyledListItemButton>
            <EventBox
              children={events ? events[23] : null}
              last={true}
              enabled={hours[23]}
            />
          </StyledListItemButton>
        </ListItem>
      </StyledList>
    </StyledDay>
  );
};

export default Day;
