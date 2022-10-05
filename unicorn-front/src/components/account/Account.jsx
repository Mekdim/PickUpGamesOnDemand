import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { AccountCircle } from '@mui/icons-material';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import { Avatar, Divider, ListItemIcon } from '@mui/material';
import Cookies from 'js-cookie';
import Settings from '@mui/icons-material/Settings';
import Star from '@mui/icons-material/Star';
import Logout from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStateValue } from '../../StateProvider';
import { useHistory } from 'react-router-dom';
import { logOutUser } from '../logic/logic';
import { auth } from '../../Firebase';
import Chip from '@mui/material/Chip';
import styled from '@emotion/styled';

const StyledChip = styled(Chip)`
  border: none;
  color: white;
  cursor: pointer;
  background: rgb(63, 94, 251);
  background: linear-gradient(
    90deg,
    rgba(63, 94, 251, 1) 0%,
    rgba(252, 70, 107, 1) 100%
  );
  transition: border 280ms cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-box-shadow: 0px 1px 2px 0px rgb(60 64 67 / 30%),
    0px 1px 3px 1px rgb(60 64 67 / 15%);
  box-shadow: 0px 1px 2px 0px rgb(60 64 67 / 30%),
    0px 1px 3px 1px rgb(60 64 67 / 15%);
  :focus,
  :hover {
    transition: border 280ms cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
    -webkit-box-shadow: 0px 4px 4px 0px rgb(60 64 67 / 30%),
      0px 8px 12px 6px rgb(60 64 67 / 15%);
    box-shadow: 0px 4px 4px 0px rgb(60 64 67 / 30%),
      0px 8px 12px 6px rgb(60 64 67 / 15%);
  }
`;

export const Account = () => {
  const { i18n } = useTranslation('main');

  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [state, dispatch] = useStateValue();
  const [user] = useState(state.user?.id || Cookies.get('id') || null);

  const [eligibleForFreeGames, setEligibleForFreeGames] = useState(false);

  const backEndUrl =
    process.env.REACT_APP_backEndUrl || 'http://localhost:8080';

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toContactUs = () => {
    setAnchorEl(null);
    history.push('/contactus');
  };
  const signInAndHandleClose = () => {
    setAnchorEl(null);
    history.push('/signin');
  };

  const signUpAndHandleClose = () => {
    setAnchorEl(null);
    history.push('/signup');
  };

  const goToSettings = () => {
    setAnchorEl(null);
    history.push('/manage/pitches');
  };

  const becomeHost = () => {
    setAnchorEl(null);
    history.push('/become-a-host');
  };

  const goToProfileAndHandleClose = () => {
    setAnchorEl(null);
    history.push('/profile');
  };

  const signOutAndHandleClose = async () => {
    setAnchorEl(null);
    try {
      await logOutUser();
    } catch (error) {
      alert(
        'Sorry, there was an error while logging out. Your session tokens might not reset properly'
      );
    }

    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        Cookies.remove('email');
        Cookies.remove('uid');
        Cookies.remove('firstname');
        Cookies.remove('id');
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        history.push('/signin');
      })
      .catch((err) => {
        alert(' An Error occurred while signing out');
      });
  };

  const isUserEligibleForFreeGames = useCallback(async () => {
    return fetch(`${backEndUrl}/users/isUserEligibleForFreeGame/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        id: user,
      }),
      //phone number has to be inserted properly as well on sign up
    }).then((response) => {
      if (!response.ok) {
        throw response;
      } else {
        setEligibleForFreeGames(true);
        return response.json();
      }
    });
  }, []);

  useEffect(() => {
    isUserEligibleForFreeGames();
  }, []);

  return (
    <>
      <Tooltip title="Account" placement={'bottom'} arrow>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={handleClick}
        >
          <AccountCircle fontSize={'medium'} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {user ? (
          <MenuList>
            <MenuItem onClick={() => goToProfileAndHandleClose()}>
              <Avatar />
              {state.user?.firstname || Cookies.get('firstname')}
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => becomeHost()}>
              <StyledChip
                label="Become a host"
                color="success"
                variant="outlined"
              />
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => goToSettings()}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <Divider />
            {eligibleForFreeGames && (
              <MenuItem>
                <ListItemIcon>
                  <Star fontSize="small" color="green" />
                </ListItemIcon>
                <p style={{ color: 'green' }}>
                  You have a reward of two free Games! Contact Us for refund!
                </p>
              </MenuItem>
            )}
            <MenuItem onClick={() => signOutAndHandleClose()}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </MenuList>
        ) : (
          <MenuList>
            <MenuItem onClick={() => signInAndHandleClose()}>
              <ListItemIcon>
                <LoginIcon fontSize="small" />
              </ListItemIcon>
              Sign in
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => signUpAndHandleClose()}>
              <ListItemIcon>
                <PersonAddAltIcon fontSize="small" />
              </ListItemIcon>
              Sign Up
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => toContactUs()}>Help</MenuItem>
          </MenuList>
        )}
      </Menu>
    </>
  );
};
