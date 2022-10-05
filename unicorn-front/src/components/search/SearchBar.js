import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';
import { MobileDatePicker } from '@mui/lab';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import Picker from './Picker';
import { getPitches } from './SearchBarLogic';
import Loader from '../Loader';
import PitchLine from './PitchLine';
import {
  StyledPopper,
  Box,
  StyledDividerHorizontal,
  SearchField,
  SearchRow,
  ButtonBar,
  SearchButton,
  SearchIconButton,
  SearchInput,
  SearchLabelStyled,
  StyledAutocomplete,
  StyledDividerVertical,
} from './SearchBarStyles';
import usePitches from './hooks/usePitches';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& .MuiAutocomplete-listbox': {
        '& li': {
          borderRadius: '15px',
        },
        '& li:hover, li:focus': {
          borderRadius: '15px',
          backgroundColor: '#ebf8f8',
        },
      },

      '& .MuiAutocomplete-paper': {
        minHeight: '320px',
        maxHeight: '320px',
        border: '1px solid #c7c7c7',
        'border-radius': '20px',
        'margin-top': '20px',
        padding: '16px 24px 16px 24px',
        boxShadow:
          '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)',
        transition:
          'opacity 326ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 217ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      },
    },
  })
);

const PopperMy = function (props) {
  const classes = useStyles();
  return (
    <StyledPopper
      {...props}
      className={classes.root}
      placement="bottom-start"
    />
  );
};

const SearchBar = () => {
  const { moment } = new DateAdapter();
  const { t } = useTranslation('main');
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down('sm'));
  const smallDevice = useMediaQuery('(max-width: 759px)');

  const history = useHistory();
  const [{ selectedDate, pitchSearched }, dispatch] = useStateValue();
  const [date, setDate] = useState(selectedDate ? selectedDate : null);
  const [locationSelected, setLocationSelected] = useState(
    pitchSearched ? pitchSearched : null
  );
  const [loading, setLoading] = useState(false);

  const { pitches } = usePitches();
  let pitchFormatted = [];

  if (pitches?.length > 0) {
    const values = [];
    for (let i = 0; i < pitches.length; i++) {
      values.push({
        name: pitches[i].name,
        type: pitches[i].type,
        address: pitches[i].address,
        label: pitches[i].description,
        id: pitches[i].id,
      });
    }
    pitchFormatted = values;
  }

  return (
    <Box>
      <SearchRow>
        <SearchField>
          <SearchLabelStyled>{t('searchBar.locationLabel')}</SearchLabelStyled>
          <StyledAutocomplete
            isOptionEqualToValue={(option, value) => option.id === value.id}
            PopperComponent={PopperMy}
            id="combo-box-demo"
            options={pitchFormatted}
            value={locationSelected ? locationSelected : pitchSearched}
            onChange={(event, newValue) => {
              setLocationSelected(newValue);
            }}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <PitchLine name={option.name} status={option.address} />
              </li>
            )}
            renderInput={(params) => (
              <SearchInput
                variant="standard"
                placeholder={t('searchBar.locationPlaceHolder')}
                {...params}
              />
            )}
          />
        </SearchField>
        <StyledDividerVertical
          orientation={'vertical'}
          variant={'middle'}
          flexItem
        />
        <StyledDividerHorizontal variant={'middle'} flexItem />
        {!small && <Picker date={date} setDate={setDate} />}
        {small && (
          <SearchField>
            <SearchLabelStyled>{t('searchBar.date')}</SearchLabelStyled>
            <LocalizationProvider dateAdapter={DateAdapter}>
              {small && (
                <MobileDatePicker
                  minDate={moment(new Date().getDate(), 'DD/MM/YYYY')}
                  value={date}
                  onChange={(value) => {
                    setDate(value);
                  }}
                  renderInput={(params) => {
                    return (
                      <SearchInput
                        variant="standard"
                        placeholder={t('searchBar.time')}
                        {...params}
                      />
                    );
                  }}
                />
              )}
            </LocalizationProvider>
          </SearchField>
        )}
        <StyledDividerHorizontal variant={'middle'} flexItem />
        <ButtonBar>
          {smallDevice && (
            <SearchButton
              startIcon={<SearchIcon fontSize={'large'} />}
              onClick={() =>
                getPitches({
                  date,
                  locationSelected,
                  setLoading,
                  dispatch,
                  history,
                })
              }
            >
              {t('searchBar.searchButton')}
            </SearchButton>
          )}
          {!smallDevice && (
            <SearchIconButton
              aria-label="close"
              size="large"
              onClick={() =>
                getPitches({
                  date,
                  locationSelected,
                  setLoading,
                  dispatch,
                  history,
                })
              }
            >
              <SearchIcon fontSize={'large'} />
            </SearchIconButton>
          )}
        </ButtonBar>
      </SearchRow>
      {loading && <Loader />}
    </Box>
  );
};

export default SearchBar;
