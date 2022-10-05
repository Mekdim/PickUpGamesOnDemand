import React, { useContext, useState } from 'react';
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
import { PitchDataContext } from '../../../context/PitchDataContext';
import { updatePitchData } from './HostLogic';

export const PitchDetailsV2 = () => {
  const { pitch } = useContext(PitchDataContext);

  const [pitchName, setName] = useState(pitch.name);
  const [desc, setDescription] = useState(pitch.description);
  const [pricePerHour, setPrice] = useState(pitch.price);
  const [values, setValues] = useState([4, pitch.capacity]);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const save = async () => {
    const details = {
      name: pitchName,
      description: desc,
      capacity: values[1],
      price: pricePerHour,
    };
    setIsLoading(true);
    try {
      await updatePitchData(details, pitch.id, 'pitch/updateDetails');
      setIsError(false);
      setIsSuccess(true);
      setIsLoading(false);
    } catch (e) {
      console.log('Unable to update pitch details', e);
      setIsError(true);
      setIsSuccess(false);
      setIsLoading(false);
    }
  };

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
                value={pitchName}
                id="outlined-required"
                label=" Pitch name"
                onChange={(event) => {
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
                value={desc}
                multiline
                rows={4}
                onChange={(event) => {
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
              value={pricePerHour}
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
      <NavBar
        nextStep={save}
        isError={isError}
        isSuccess={isSuccess}
        isLoading={isLoading}
      />
    </StyledCommon>
  );
};
