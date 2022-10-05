import React from 'react';
import styled from '@emotion/styled';
import Duration from '../modal/Duration';
import Divider from '@mui/material/Divider';
import { useTranslation } from 'react-i18next';

const StyledDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 25px;

  @media screen and (max-width: 759px) {
    flex-direction: row;
    padding: 10px;
  }
`;

const StyledDetailsSecondary = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media screen and (max-width: 759px) {
    width: 100%;
  }
`;

const StyledTitle = styled.h3`
  font-family: 'Ubuntu', sans-serif;
  width: 100%;
  text-align: left;
`;

const StyledPrice = styled.p`
  font-family: 'Ubuntu', sans-serif;
  width: 100%;
`;
const StyledEventDate = styled.div`
  height: 60px;
  text-align: left;

  @media screen and (max-width: 759px) {
    min-width: 40px;
    margin-top: 20px;
  }
`;

const StyledTime = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: fit-content;
  background-color: #e0e0e0;
  padding: 4px;
  border-radius: 3px;
`;

const StyledFields = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const StyledFieldName = styled.h5`
  text-align: left;
  font-weight: 500;
  min-width: 85px;
  margin-top: 7px;
  margin-bottom: 7px;
`;

const StyledFieldContainer = styled.h4`
  text-align: left;
  font-weight: 700;
  margin-top: 7px;
  margin-bottom: 7px;
  padding-left: 15px;
`;

const StyledDurationField = styled.h5`
  text-align: left;
  font-weight: 500;
  width: 51px;
`;
const StyledContainer = styled.div`
  width: 100%;
  margin-top: auto;
  margin-bottom: auto;
`;

const StyledMonth = styled.h5`
  padding: 0;
  margin: 0;
  text-align: left;
  font-family: 'Nova Mono', monospace;
`;

const StyledDate = styled.p`
  padding: 0;
  margin: 0;
  text-align: left;
  font-family: 'Nova Mono', monospace;
`;

const EventDetails = ({
  title,
  startTime,
  endTime,
  price,
  participants,
  date,
}) => {
  let dd = new Date(date);
  let currentDate = dd.getDate();
  const { t } = useTranslation('main');
  const monthShort = new Intl.DateTimeFormat('en-US', {
    month: 'short',
  }).format(dd);
  return (
    <StyledDetails>
      <StyledEventDate>
        <StyledTime>
          <StyledMonth>{monthShort}</StyledMonth>
          <StyledDate>{currentDate}</StyledDate>
        </StyledTime>
      </StyledEventDate>
      <StyledDetailsSecondary>
        <StyledTitle>{title}</StyledTitle>
        <Divider flexItem />
        <StyledFields>
          <StyledDurationField>{t('session.time')}</StyledDurationField>
          <StyledContainer>
            <Duration startTime={startTime} endTime={endTime} />
          </StyledContainer>
        </StyledFields>
        <StyledFields>
          <StyledFieldName>{t('session.price')}</StyledFieldName>
          <Divider variant={'middle'} orientation={'vertical'} flexItem />
          <StyledFieldContainer>{price}</StyledFieldContainer>
        </StyledFields>
        <StyledFields>
          <StyledFieldName>{t('session.participants')}</StyledFieldName>
          <Divider variant={'middle'} orientation={'vertical'} flexItem />
          <StyledFieldContainer>{participants}</StyledFieldContainer>
        </StyledFields>
      </StyledDetailsSecondary>
    </StyledDetails>
  );
};

export default EventDetails;
