import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import styled from '@emotion/styled';
import SpecialHour from './SpecialHour';
import Button from '@mui/material/Button';
import './style.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AddIcon from '@mui/icons-material/Add';

const StyledList = styled(ListItem)`
  min-height: 40px;
  margin-bottom: 6px;
`;

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const SpecialHours = (props) => {
  const [specialDays, setSpecialDays] = useState([]);
  const [counter, setCounter] = useState(1);

  return (
    <StyledColumn>
      <TransitionGroup component={List}>
        {specialDays.map((day, id) => (
          <CSSTransition
            classNames={'item'}
            timeout={1000}
            key={`specialDay-${id}`}
          >
            <StyledList key={`specialDay-${id}`}>
              <SpecialHour
                key={day}
                setDays={setSpecialDays}
                days={specialDays}
                index={id}
                {...props}
              />
            </StyledList>
          </CSSTransition>
        ))}
      </TransitionGroup>
      <Button
        variant={'outlined'}
        startIcon={<AddIcon />}
        onClick={() => {
          setSpecialDays([...specialDays, `key-type-${counter}`]);
          setCounter(counter + 1);
        }}
      >
        Add Special Date...
      </Button>
    </StyledColumn>
  );
};

export default SpecialHours;
