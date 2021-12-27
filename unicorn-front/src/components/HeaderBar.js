import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import styled from "@emotion/styled";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { Avatar, Divider, ListItemIcon } from "@mui/material";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { auth } from "../Firebase";
import { ReactComponent as LogoSvg } from "../img/Logo--64x97.svg";
import SearchBar from "./search/SearchBar";
import Tooltip from "@mui/material/Tooltip";
import { AccountCircle } from "@mui/icons-material";
import Notifications from "./notification/Notifications";
import MenuList from "@mui/material/MenuList";
import { logOutUser } from "./logic/logic";
const LogoStyled = styled(LogoSvg)`
  margin-top: 2.5px;
`;

const StyledPara = styled.p`
  margin: 0;
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: white;
  font-family: "Ubuntu", "sans-serif";
  font-size: xx-large;
`;

const HeaderStyled = styled(AppBar)`
  background-color: darkcyan;
  z-index: 100;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const HeaderLogo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const HeaderSearchBar = styled.div`
  width: 600px;
`;

const HeaderMain = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export default function HeaderBar({ showSearchBar = false }) {
  const history = useHistory();

  const [state, dispatch] = useStateValue();
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setuser] = useState(
    state.user?.uid || Cookies.get("uid") || null
  );
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const medium = useMediaQuery(theme.breakpoints.up("md"));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const signInAndHandleClose = (event) => {
    setAnchorEl(null);
    history.push("/signin");
  };
  const signUpAndHandleClose = (event) => {
    setAnchorEl(null);
    history.push("/signup");
  };
  const signOutAndHandleClose = async (event) => {
    setAnchorEl(null);
    try{
      let result  = await logOutUser()
    } catch(error){
      alert("Sorry, there was an error while logging out. Your session tokens might not reset properly")
      // if error comes from backend API - we can grab the mesage here or send it to logger in the future
      if (typeof error.json === "function") {
        error.json().then(error => {
          //console.log("An API error from backend API while loging out  for userid XXX");
        }).catch(genericError => {
          //console.log("Another error ");
        });
      }
      else{
        // error status undefined here
        //console.log("some sort of fetch error happended")
      }
    }

    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        Cookies.remove("email");
        Cookies.remove("uid");
        Cookies.remove("firstname");
        Cookies.remove("id");
        history.push("/signin");
      })
      .catch((error) => {
        alert(" An Error occured while signing out");
      });
  };
  const goToProfileAndHandleClose = (event) => {
    setAnchorEl(null);
    history.push("/profile");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <HeaderStyled position={"sticky"}>
      <Toolbar>
        {!medium && (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <HeaderMain>
          <HeaderLogo>
            <Link to="/">
              <LogoStyled />
            </Link>
            {medium && (
              <LinkStyled to="/">
                <StyledPara> Kuas </StyledPara>
              </LinkStyled>
            )}
          </HeaderLogo>
          {showSearchBar && medium && (
            <HeaderSearchBar>
              <SearchBar />
            </HeaderSearchBar>
          )}
          <HeaderRight>
            {medium && (
              <MenuItem>
                <Notifications />
              </MenuItem>
            )}
            <MenuItem onClick={handleClick}>
              <Tooltip title="Account" placement={"bottom"} arrow>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={handleClick}
                >
                  <AccountCircle fontSize={"medium"} />
                </IconButton>
              </Tooltip>
            </MenuItem>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {user ? (
                <MenuList>
                  <MenuItem onClick={(e) => goToProfileAndHandleClose()}>
                    <Avatar />
                    {state.user?.firstname || Cookies.get("firstname")}
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
                </MenuList>
              ) : (
                <MenuList>
                  <MenuItem
                    onClick={(e) => signInAndHandleClose()}
                    style={{ width: "25vw" }}
                  >
                    Sign in
                  </MenuItem>
                  <MenuItem onClick={(e) => signUpAndHandleClose()}>
                    Sign Up
                  </MenuItem>
                  <Divider />
                  <MenuItem>Help</MenuItem>
                </MenuList>
              )}
            </Menu>
          </HeaderRight>
        </HeaderMain>
      </Toolbar>
    </HeaderStyled>
  );
}
