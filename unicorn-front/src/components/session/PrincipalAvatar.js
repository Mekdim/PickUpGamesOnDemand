import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import styled from '@emotion/styled';
import { Stack } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Tooltip from '@mui/material/Tooltip';
import ParticipantsModal from '../modal/ParticipantsModal';

const StyledAvatarGroup = styled(AvatarGroup)`
  align-items: center;
  cursor: pointer;
`;

const StyledAvatar = styled(Avatar)`
  background-color: #37b4fc;
`;

const playersAvatarWrapper = (players) => {
  let clonedArray = JSON.parse(JSON.stringify(players)); // deep clone of the state
  return players.map((player) => {
    return (
      <Tooltip
        key={player.first_name}
        title={player.first_name}
        placement="bottom"
        arrow
      >
        <StyledAvatar key={player.first_name} alt={player.first_name}>
          {player.first_name.slice(0, 1)}
        </StyledAvatar>
      </Tooltip>
    );
  });
};

const PrincipalAvatar = ({ players, setPlayers, isLoading }) => {
  //const [players, setPlayers] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  //const [backEndUrl, setBackEndUrl] = useState("http://localhost:8080");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const playersAvatar = useMemo(() => playersAvatarWrapper(players), [players]);

  // useEffect(async () => {
  //   try {
  //     setIsLoading(true);
  //     let data = await fetchSessionPlayers({ sessionId });
  //     setPlayers(data);
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.error("Unable to fetch event session ", error);
  //     setIsLoading(false);
  //   }
  // }, []);
  return (
    <>
      {isLoading ? (
        <Stack sx={{ m: 4 }} direction={'row'}>
          <Skeleton variant="circular" width={50} height={50} />
          <Skeleton variant="circular" width={50} height={50} />
          <Skeleton variant="circular" width={50} height={50} />
        </Stack>
      ) : (
        <>
          <StyledAvatarGroup max={3} spacing={'small'} onClick={handleOpen}>
            {playersAvatar}
          </StyledAvatarGroup>
          <ParticipantsModal
            open={open}
            handleClose={handleClose}
            players={players}
            setPlayers={setPlayers}
          />
        </>
      )}
    </>
  );
};

export default PrincipalAvatar;
