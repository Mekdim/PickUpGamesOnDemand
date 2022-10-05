import { getDayOfMonth, getDayOfWeek } from '../../utils/utils';
import React from 'react';
import styled from '@emotion/styled';
import { convertDate } from '../pitch/pitchHelper';
import { useTranslation } from 'react-i18next';

const StyledH2 = styled.h2`
  font-weight: 400;
  text-align: center;
  width: 50%;
  margin: 0 0 6px;
`;

const StyledDayString = styled.div`
  line-height: 32px;
  position: relative;
  z-index: 4;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.8px;
  margin-left: 0;
  margin-top: 8px;
  text-indent: 0.8px;
  text-transform: uppercase;
  color: ${(props) => {
    return props.enabled ? '#70757a' : '#1a73e8';
  }};
`;

const StyledDay = styled.div`
  position: relative;
  z-index: 4;
  font-size: 26px;
  letter-spacing: -2.6px;
  text-indent: -2.6px;
  font-variant: tabular-nums;
  -webkit-font-feature-settings: 'tnum' 1;
  font-feature-settings: 'tnum' 1;
  -webkit-border-radius: 100%;
  border-radius: 100%;
  font-family: Ubuntu Sans, Roboto, Arial, sans-serif;
  line-height: 46px;
  height: 46px;
  margin-left: auto;
  margin-right: auto;
  margin-top: -8px;
  width: 46px;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  -webkit-justify-content: center;
  justify-content: center;

  cursor: pointer;
  outline: none;

  background-color: ${(props) => {
    return props.enabled ? 'white' : '#1a73e8';
  }};
  color: ${(props) => {
    return props.enabled ? '#3c4043' : 'white';
  }};

  :hover {
    background-color: ${(props) => {
      return props.enabled ? '#f1f3f4' : '#1967d2';
    }};
    color: ${(props) => {
      return props.enabled ? '#3c4043' : 'white';
    }};
  }
`;
const LastDayH2 = styled(StyledH2)`
  margin-right: -40px;
  border-right: 0;
`;

const CalendarHeader = ({
  small,
  medium,
  large,
  currentDate,
  nextDate,
  secondNextDate,
  thirdNextDate,
}) => {
  const { t } = useTranslation('main');
  return (
    <>
      <StyledH2>
        <StyledDayString
          enabled={convertDate(new Date(currentDate)).localeCompare(
            convertDate(new Date())
          )}
        >
          {t(`calendar.${getDayOfWeek(currentDate)}`)}
        </StyledDayString>
        <StyledDay
          enabled={convertDate(new Date(currentDate)).localeCompare(
            convertDate(new Date())
          )}
        >
          {getDayOfMonth(currentDate)}
        </StyledDay>
      </StyledH2>
      {small && (
        <LastDayH2>
          <StyledDayString
            enabled={convertDate(new Date(nextDate)).localeCompare(
              convertDate(new Date())
            )}
          >
            {t(`calendar.${getDayOfWeek(nextDate)}`)}
          </StyledDayString>
          <StyledDay
            enabled={convertDate(new Date(nextDate)).localeCompare(
              convertDate(new Date())
            )}
          >
            {getDayOfMonth(nextDate)}
          </StyledDay>
        </LastDayH2>
      )}
      {(medium || large) && (
        <StyledH2>
          <StyledDayString
            enabled={convertDate(new Date(nextDate)).localeCompare(
              convertDate(new Date())
            )}
          >
            {t(`calendar.${getDayOfWeek(nextDate)}`)}
          </StyledDayString>
          <StyledDay
            enabled={convertDate(new Date(nextDate)).localeCompare(
              convertDate(new Date())
            )}
          >
            {getDayOfMonth(nextDate)}
          </StyledDay>
        </StyledH2>
      )}
      {medium && (
        <LastDayH2>
          <StyledDayString
            enabled={convertDate(new Date(secondNextDate)).localeCompare(
              convertDate(new Date())
            )}
          >
            {t(`calendar.${getDayOfWeek(secondNextDate)}`)}
          </StyledDayString>
          <StyledDay
            enabled={convertDate(new Date(secondNextDate)).localeCompare(
              convertDate(new Date())
            )}
          >
            {getDayOfMonth(secondNextDate)}
          </StyledDay>
        </LastDayH2>
      )}
      {large && (
        <StyledH2>
          <StyledDayString
            enabled={convertDate(new Date(secondNextDate)).localeCompare(
              convertDate(new Date())
            )}
          >
            {t(`calendar.${getDayOfWeek(secondNextDate)}`)}
          </StyledDayString>
          <StyledDay
            enabled={convertDate(new Date(secondNextDate)).localeCompare(
              convertDate(new Date())
            )}
          >
            {getDayOfMonth(secondNextDate)}
          </StyledDay>
        </StyledH2>
      )}
      {large && (
        <LastDayH2>
          <StyledDayString
            enabled={convertDate(new Date(thirdNextDate)).localeCompare(
              convertDate(new Date())
            )}
          >
            {t(`calendar.${getDayOfWeek(thirdNextDate)}`)}
          </StyledDayString>
          <StyledDay
            enabled={convertDate(new Date(thirdNextDate)).localeCompare(
              convertDate(new Date())
            )}
          >
            {getDayOfMonth(thirdNextDate)}
          </StyledDay>
        </LastDayH2>
      )}
    </>
  );
};

export default CalendarHeader;
