import React from 'react';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Divider, TextField } from '@mui/material';

const StyledSlider = styled(Slider)(({ theme }) => ({
  color: '#3a8589',
  height: 3,
  padding: '13px 0',
  '& .MuiSlider-thumb': {
    height: 27,
    width: 27,
    backgroundColor: '#fff',
    border: '1px solid currentColor',
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
    },
    '& .styled-bar': {
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  '& .MuiSlider-track': {
    height: 3,
  },
  '& .MuiSlider-rail': {
    color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
    opacity: theme.palette.mode === 'dark' ? undefined : 1,
    height: 3,
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
}));

function ThumbComponent(props) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <span className="styled-bar" />
      <span className="styled-bar" />
      <span className="styled-bar" />
    </SliderThumb>
  );
}

const StyledField = styled(TextField)`
  width: 45%;
`;

const StyledWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const StyledQuestion = styled('p')`
  text-align: left;
`;

const PitchSizeSlider = ({ values, setValues }) => {
  return (
    <Box>
      <StyledQuestion>
        Select minimum and Maximum number of players per field?
      </StyledQuestion>
      <StyledSlider
        valueLabelDisplay="auto"
        components={{ Thumb: ThumbComponent }}
        getAriaLabel={(index) =>
          index === 0 ? 'Minimum size' : 'Maximum size'
        }
        value={values}
        min={0}
        max={25}
        onChange={(e) => {
          setValues(e.target.value);
        }}
      />
      <StyledWrapper>
        <StyledField
          variant="filled"
          fullWidth
          id="outlined-required"
          label="Min"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(event) => {
            setValues([Number(event.target.value), values[1]]);
          }}
          inputProps={{ min: 0, max: 25 }}
          value={values[0]}
        />
        <Divider flexItem orientation={'vertical'} />
        <StyledField
          variant="filled"
          fullWidth
          id="outlined-required"
          label="Max"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(event) => {
            setValues([values[0], Number(event.target.value)]);
          }}
          inputProps={{ min: 0, max: 25 }}
          value={values[1]}
        />
      </StyledWrapper>
    </Box>
  );
};

export default PitchSizeSlider;
