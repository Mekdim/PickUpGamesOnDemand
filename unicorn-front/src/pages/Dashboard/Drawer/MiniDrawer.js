import React, { useState } from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Drawer } from './DrawerStyle';
import StadiumIcon from '@mui/icons-material/Stadium';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ContactsIcon from '@mui/icons-material/Contacts';
import { Link } from 'react-router-dom';
import { StyledListItem, DrawerHeader } from './MiniDrawerStyle';

export const MiniDrawer = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      variant="permanent"
      open={open}
      onMouseEnter={handleDrawerOpen}
      onMouseLeave={handleDrawerClose}
    >
      <DrawerHeader>
        {open ? (
          <ChevronLeftIcon fontSize={'medium'} />
        ) : (
          <ChevronRightIcon fontSize={'medium'} />
        )}
      </DrawerHeader>
      <Divider />
      <List>
        <StyledListItem component={Link} key="Dashboard" to="/manage/dashboard">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </StyledListItem>
        <StyledListItem component={Link} key="Pitch" to="/manage/pitches">
          <ListItemIcon>
            <StadiumIcon />
          </ListItemIcon>
          <ListItemText primary="Pitch" />
        </StyledListItem>
        <StyledListItem component={Link} key="Contact" to="/manage/contact">
          <ListItemIcon>
            <ContactsIcon />
          </ListItemIcon>
          <ListItemText primary="Contact" />
        </StyledListItem>
      </List>
      <Divider />
    </Drawer>
  );
};
