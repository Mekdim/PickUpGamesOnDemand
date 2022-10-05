import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import styled from '@emotion/styled';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link } from 'react-router-dom';
import React from 'react';
import LogoSvg from '../images/LogoMain.svg';
import SearchBar from './search/SearchBar';
import Notifications from './notification/Notifications';
import { Language } from './Language';
import { Account } from './account/Account';

const LogoStyled = styled(LogoSvg)`
  margin-top: 2.5px;
`;

const StyledPara = styled.p`
  margin: 0;
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: white;
  font-family: 'Ubuntu', 'sans-serif';
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
  const theme = useTheme();
  const medium = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <HeaderStyled position={'sticky'}>
      <Toolbar>
        <HeaderMain>
          <HeaderLogo>
            <Link to="/">
              <LogoStyled />
            </Link>
            {medium && (
              <LinkStyled to="/">
                <StyledPara> Kuaas </StyledPara>
              </LinkStyled>
            )}
          </HeaderLogo>
          {showSearchBar && medium && (
            <HeaderSearchBar>
              <SearchBar />
            </HeaderSearchBar>
          )}
          <HeaderRight>
            <MenuItem>
              <Language />
            </MenuItem>
            {medium && (
              <MenuItem>
                <Notifications />
              </MenuItem>
            )}
            <MenuItem>
              <Account />
            </MenuItem>
          </HeaderRight>
        </HeaderMain>
      </Toolbar>
    </HeaderStyled>
  );
}
