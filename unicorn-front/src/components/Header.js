import React, { useState } from 'react'
import '../css/Header.css'
import LanguageIcon from '@mui/icons-material/Language';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Button, Menu, MenuItem, ListItemIcon, Divider, IconButton } from '@mui/material';
import { useStateValue } from '../StateProvider'
import { actionTypes } from '../reducer'
import SearchDateComponent from './SearchDateComponent';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { auth } from '../Firebase'
import Cookies from 'js-cookie'
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import Toolbar from '@mui/material/Toolbar';

import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

//drawer
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';


function Header(props) {
  const history = useHistory()

  //react useState hook to save the current open/close state of the drawer, normally variables dissapear afte the function was executed
  const [hamburgerOpen, setHamburgerOpenState] = useState(false);


  //function that is being called every time the drawer should open or close, the keys tab and shift are excluded so the user can focus between the elements with the keys
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    //changes the function state according to the value of open
    setHamburgerOpenState(open);
  };

  const [state, dispatch] = useStateValue();
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setuser] = useState(state.user?.id || Cookies.get('id') || null);
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const goHomeAndHandleClose = (event) => {
    setAnchorEl(null);
    setHamburgerOpenState(false);
    history.push("/")
  }
  const signInAndHandleClose = (event) => {
    setHamburgerOpenState(false);
    setAnchorEl(null);
    history.push("/signin")
  }
  const signUpAndHandleClose = (event) => {
    setAnchorEl(null);
    setHamburgerOpenState(false);
    history.push("/signup")
  }
  const signOutAndHandleClose = (event) => {
    setAnchorEl(null);
    setHamburgerOpenState(false);

    auth.signOut().then(() => {
      // Sign-out successful.
      Cookies.remove('email')
      Cookies.remove('uid')
      Cookies.remove('firstname')
      Cookies.remove('id')
      history.push("/signin")

    }).catch((error) => {
      // An error happened.
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(" An Error occured while signing out")
    });

  }
  const goToProfileAndHandleClose = (event) => {
    setAnchorEl(null);
    setHamburgerOpenState(false);
    history.push("/profile")
  };

  const handleClose = (value) => {
    setHamburgerOpenState(false);
    setAnchorEl(null);
  };
  // SearchdateComponent could be conditioned on location/date state too rather than homefield
  return (
    <div className="header">
      <Container className="header__container" maxWidth="lg" disableGutters="true">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={toggleDrawer(true)}
            sx={{
              mr: 2,
              display: {
                xs: 'block',
                sm: 'none',
              },
              marginLeft: '20px'
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* The outside of the drawer */}
          <Drawer
            sx={{

              width: "100vw"

            }}
            //from which side the drawer slides in
            anchor="left"
            open={hamburgerOpen}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            {/* The inside of the drawer */}
            <Box sx={{
              p: 2,
              height: 1,
              backgroundColor: "#dbc8ff",
            }}>

              {/* when clicking the icon it calls the function toggleDrawer and closes the drawer by setting the variable open to false */}
              <IconButton sx={{ mb: 2 }}>
                <CloseIcon onClick={toggleDrawer(false)} />
              </IconButton>

              <Divider sx={{ mb: 2 }} />

              <Box sx={{ mb: 2, width: "80vw" }}>
                {user ? (
                  <>
                    <MenuItem onClick={(e) => goHomeAndHandleClose()} style={{ width: "25vw" }} >
                      Home
                    </MenuItem>
                    <MenuItem onClick={(e) => goToProfileAndHandleClose()}>
                       Profile
                    </MenuItem>
                    <MenuItem>

                      Settings
                    </MenuItem>
                    <MenuItem onClick={(e) => signOutAndHandleClose()}>

                      Logout
                    </MenuItem>
                  </>
                ) :
                  <>
                    <MenuItem onClick={(e) => goHomeAndHandleClose()} style={{ width: "25vw" }} >
                      Home
                    </MenuItem>
                    <MenuItem onClick={(e) => signInAndHandleClose()} style={{ width: "25vw" }} >
                      Sign in
                    </MenuItem>
                    <MenuItem onClick={(e) => signUpAndHandleClose()} >
                      Sign Up
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                      Help
                    </MenuItem>
                  </>}
              </Box>

            </Box>

          </Drawer>


        </Toolbar>
      </Container>
      <div className="header__left">
        <Link to='/'>
          <img
            className="header__icon"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHYB-DYArIgG5AEqY0uuR2Tgwk6_GbR2f54Q&usqp=CAU"
            alt=""
          />
        </Link>
        <Link to='/' style={{ "height": "3em", "text-decoration": "none" }}> <p> Kuas </p> </Link>
      </div>
      {props.showSearchComponent ? (
        <SearchDateComponent />
      ) : ""
      }
      <div className="header__right">
        <div className="Avatar">
          <IconButton onClick={handleClick} className="header__right__avatar">
            <Avatar />
          </IconButton>
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
              <>
                <MenuItem onClick={(e) => goToProfileAndHandleClose()}>
                  <Avatar /> {state.user?.firstname || Cookies.get("firstname")}
                </MenuItem>

                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem onClick={(e) => signOutAndHandleClose()}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </>
            ) :
              <>
                <MenuItem onClick={(e) => signInAndHandleClose()} style={{ width: "25vw" }} >
                  Sign in
                </MenuItem>
                <MenuItem onClick={(e) => signUpAndHandleClose()} >
                  Sign Up
                </MenuItem>
                <Divider />
                <MenuItem>
                  Help
                </MenuItem>
              </>}

          </Menu>
        </div>
      </div>
    </div>
  )
}

export default Header;
