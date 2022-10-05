import styled from '@emotion/styled';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import StepWizard from 'react-step-wizard';
import stadium from '../../../images/stadium.png';
import Outdoor from '../../../images/Outdoor.png';

export const StyledQuestions = styled(Grid)`
  background: linear-gradient(
    90deg,
    rgba(131, 58, 180, 1) 0%,
    rgba(254, 92, 92, 1) 50%,
    rgba(255, 193, 106, 1) 100%
  );
  min-height: 30%;
`;

export const StyledAnswers = styled(Grid)`
  background-color: #ffffff;
  min-height: 70%;
`;

export const StyledAnswersWrapper = styled.div`
  -webkit-box-direction: normal !important;
  -webkit-box-orient: vertical !important;
  display: flex !important;
  flex-direction: column !important;
  height: calc(100vh - 175px);
  margin: 8px;
  overflow: scroll;
`;

export const StyledMainGrid = styled(Grid)`
  height: calc(100vh - 75px);
`;

export const StyledOptionWrapper = styled.div`
  width: 100% !important;
  max-width: 464px !important;
  margin-bottom: 12px !important;
  margin-left: auto !important;
  margin-right: auto !important;
  animation-duration: 600ms !important;
  animation-iteration-count: 1 !important;
  animation-fill-mode: both !important;
  animation-name: bounce !important;
  animation-delay: 400ms;
  padding-top: 16px !important;

  @keyframes bounce {
    0% {
      opacity: 0;
      transform: translate(0px, 40%);
    }
  }
  100% {
    opacity: 1;
    transform: none;
  }
`;

export const StyledOptionWrapperHours = styled.div`
  width: 100% !important;
  //max-width: 464px !important;
  margin-bottom: 12px !important;
  margin-left: auto !important;
  margin-right: auto !important;
  animation-duration: 600ms !important;
  animation-iteration-count: 1 !important;
  animation-fill-mode: both !important;
  animation-name: bounce !important;
  animation-delay: 400ms;
  padding-top: 16px !important;

  @keyframes bounce {
    0% {
      opacity: 0;
      transform: translate(0px, 40%);
    }
  }
  100% {
    opacity: 1;
    transform: none;
  }
`;

export const StyledProgress = styled(LinearProgress)`
  background-color: #d3d5d6;

  .MuiLinearProgress-bar {
    background-color: black;
  }
`;

export const StyledOption = styled.div`
  -webkit-box-align: center !important;
  -webkit-box-pack: justify !important;
  box-sizing: border-box !important;
  border-radius: 12px !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  width: 100% !important;
  min-height: 68px !important;
  cursor: pointer !important;
  padding: 0 !important;
  outline: none !important;
  background-color: ${(props) => {
    return props.selected ? '#f7f7f7' : '#FFFFFF';
  }};
  box-shadow: ${(props) => {
    return props.selected ? 'rgb(34 34 34) 0px 0px 0px 2px' : 'none';
  }};
  border: 1px solid rgb(221, 221, 221) !important;

  :hover {
    border-color: transparent !important;
    box-shadow: rgb(34 34 34) 0 0 0 2px !important;
  }
`;

export const StyledOptionField = styled.div`
  -webkit-box-align: center !important;
  -webkit-box-pack: justify !important;
  box-sizing: border-box !important;
  display: flex !important;
  flex-direction: column;
  justify-content: space-between !important;
  align-items: center !important;
  width: 100% !important;
  min-height: 68px !important;
  cursor: pointer !important;
  padding: 0 !important;
  outline: none !important;

  :hover {
    border-color: transparent !important;
  }
`;

export const StyledOptionName = styled.div`
  text-align: left !important;
  width: 100% !important;
  color: rgb(34, 34, 34) !important;
  margin: 10px 16px !important;
`;

export const StyledCommon = styled.div`
  //min-height: 94vh;
  height: 100% !important;
  width: 100% !important;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const StyledOptionIconWrapper = styled.div`
  margin: 16px !important;
`;

export const StyledOptionIcon = styled.div`
  display: inline-block;
  vertical-align: bottom;
  height: 56px;
  width: 56px;
  min-height: 1px;
  border-radius: 4px;
  background-position: 50% 50% !important;
  background-repeat: no-repeat !important;
  background-image: url(${stadium});
`;

export const StyledOptionIconOutdoor = styled.div`
  display: inline-block;
  vertical-align: bottom;
  height: 56px;
  width: 56px;
  min-height: 1px;
  border-radius: 4px;
  background-position: 50% 50% !important;
  background-repeat: no-repeat !important;
  background-image: url(${Outdoor});
`;

export const StyledNav = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding: 8px 12px 8px 12px;
  background-color: #e5e7ed;
`;

export const StyledCenterContent = styled.div`
  margin-top: auto;
  margin-bottom: auto;
`;

export const StyledCenterQuestions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
`;

export const StyledStepWizard = styled(StepWizard)`
  height: 100%;
`;

export const StyledQuestionField = styled('p')`
  text-align: left;
`;

export const StyledMainQuestion = styled.h1`
  font-size: 26px !important;
  line-height: 30px !important;
  margin-bottom: 0 !important;
  font-weight: 600 !important;
  color: white;

  @media screen and (min-width: 744px) {
    font-size: 48px !important;
    line-height: 56px !important;
    margin-bottom: 12px !important;
  }
`;
