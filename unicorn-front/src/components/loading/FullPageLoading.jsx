import React from 'react';
import styled from '@emotion/styled';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';

const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  background: rgb(229, 231, 237);
`;

const Ball = styled(SportsSoccerIcon)`
  width: 25px;
  height: 25px;
  top: 50%;
  left: 50%;
  position: absolute;

  animation: bounce 0.5s;
  animation-direction: alternate;
  animation-timing-function: cubic-bezier(0.5, 0.05, 1, 0.5);
  animation-iteration-count: infinite;

  @keyframes bounce {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(0, 50px, 0);
    }
  }
`;

export const FullPageLoading = () => {
  return (
    <Background>
      <Ball />
    </Background>
  );
};
