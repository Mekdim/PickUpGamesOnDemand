import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import PitchSizeSlider from './PitchSizeSlider';
import { FilledInput, InputAdornment } from '@mui/material';
import {
  StyledAnswersWrapper,
  StyledCenterContent,
  StyledCommon,
  StyledOptionField,
  StyledOptionWrapper,
  StyledQuestionField,
} from './WelcomeStyles';
import { NavBar } from './NavBar';

export const PitchDetails = (props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [values, setValues] = useState([10, 18]);
  const [allow, setAllow] = useState(false);

  useEffect(() => {
    props.update('name', name);
    props.update('description', description);
    props.update('minMax', values);
    props.update('price', price);
    if (name !== '' && description !== '' && price !== '') {
      setAllow(true);
    }
  }, [name, description, values, price]);

  return (
    <StyledCommon>
      <StyledAnswersWrapper>
        <StyledCenterContent>
          <StyledOptionWrapper>
            <StyledOptionField>
              <TextField
                variant="filled"
                fullWidth
                autoFocus
                id="outlined-required"
                label=" Pitch name"
                onBlur={(event) => {
                  setName(event.target.value);
                }}
                inputProps={{ maxLength: 20 }}
              />
            </StyledOptionField>
          </StyledOptionWrapper>
          <StyledOptionWrapper>
            <StyledOptionField>
              <TextField
                variant="filled"
                fullWidth
                id="pitch-description"
                label="Pitch Description"
                multiline
                rows={4}
                onBlur={(event) => {
                  setDescription(event.target.value);
                }}
                inputProps={{ maxLength: 100 }}
              />
            </StyledOptionField>
          </StyledOptionWrapper>
          <StyledOptionWrapper>
            <PitchSizeSlider values={values} setValues={setValues} />
          </StyledOptionWrapper>
          <StyledOptionWrapper>
            <StyledQuestionField>Set price per hour?</StyledQuestionField>
            <FilledInput
              id="filled-adornment-price"
              fullWidth
              label="Price per Hour"
              type="number"
              inputProps={{ maxLength: 5, min: 1, max: 100000 }}
              onChange={(event) => {
                setPrice(Number(event.target.value));
              }}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </StyledOptionWrapper>
        </StyledCenterContent>
      </StyledAnswersWrapper>
      <NavBar step={1} allow={allow} {...props} />
    </StyledCommon>
  );
};
