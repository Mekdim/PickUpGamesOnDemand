import React, { useMemo } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import styled from '@emotion/styled';
import DialogContent from '@mui/material/DialogContent';
import PlayerLine from '../session/PlayerLine';
import { Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

const StyledTitle = styled.p`
  //font-family: "Nova Mono", monospace;
  font-family: 'Roboto', sans-serif;
  text-align: center;
  width: 100%;
`;

const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    font-family: 'Roboto', sans-serif;
    border-radius: 15px;
    margin: 0;
  }

  .MuiDialogContent-root {
    padding: 16px 12px;
  }
`;

const Debug = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-height: 300px;
`;

const ModalTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const CloseButton = styled.div`
  width: 50px;
  height: 50px;
  text-align: right;
`;

const StyledDialogTitle = styled(DialogTitle)`
  padding: 6px 6px 0 0;
`;

const playersAvatarWrapper = (players, setPlayers) => {
  let loggedInId = Cookies.get('id');
  return players.map((player) => {
    return (
      <div key={player.first_name + Math.random()}>
        <PlayerLine
          key={player.first_name}
          name={player.first_name}
          status={player.status}
          close={player.id === Number(loggedInId)}
          playerId={player.id}
          players={players}
          setPlayers={setPlayers}
        />
        <Divider variant={'middle'} />
      </div>
    );
  });
};

const ParticipantsModal = ({ open, handleClose, players, setPlayers }) => {
  const { t } = useTranslation('main');
  const playersAvatar = useMemo(
    () => playersAvatarWrapper(players, setPlayers),
    [players]
  );
  return (
    <StyledDialog onClose={handleClose} open={open}>
      <StyledDialogTitle>
        <ModalTitle>
          <StyledTitle>{t('session.playerList')}</StyledTitle>
          <CloseButton>
            <IconButton onClick={handleClose} aria-label="close" size="medium">
              <CloseIcon fontSize={'medium'} />
            </IconButton>
          </CloseButton>
        </ModalTitle>
      </StyledDialogTitle>
      <DialogContent dividers>
        <Debug>{playersAvatar}</Debug>
      </DialogContent>
    </StyledDialog>
  );
};

export default ParticipantsModal;
