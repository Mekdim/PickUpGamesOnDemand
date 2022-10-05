import React, { useState } from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemText from '@mui/material/ListItemText';
import { Drawer } from './DrawerStyle';
import StadiumIcon from '@mui/icons-material/Stadium';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ContactsIcon from '@mui/icons-material/Contacts';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationIcon from '../../../components/icons/Location';
import { Link } from 'react-router-dom';
import {
  StyledListItem,
  DrawerHeader,
  StyledListItemIcon,
  StyledListItemText,
} from './MiniDrawerStyle';

export const MiniDrawer = ({ pitchId }) => {
  const [open, setOpen] = useState(false);

  const detailsUrl = `/edit/pitch/${pitchId}/details`;
  const typeUrl = `/edit/pitch/${pitchId}/type`;
  const openingHoursUrl = `/edit/pitch/${pitchId}/openingHours`;
  const imageUrl = `/edit/pitch/${pitchId}/image`;
  const locationUrl = `/edit/pitch/${pitchId}/location`;

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
        <StyledListItem component={Link} key="details" to={detailsUrl}>
          <StyledListItemIcon>
            <DashboardIcon />
          </StyledListItemIcon>
          <StyledListItemText primary="Details" />
        </StyledListItem>
        <StyledListItem component={Link} key="Type" to={typeUrl}>
          <StyledListItemIcon>
            <StadiumIcon />
          </StyledListItemIcon>
          <StyledListItemText primary="Type" />
        </StyledListItem>
        <StyledListItem component={Link} key="Hours" to={openingHoursUrl}>
          <StyledListItemIcon>
            <AccessTimeIcon />
          </StyledListItemIcon>
          <StyledListItemText primary="Hours" />
        </StyledListItem>
        <StyledListItem component={Link} key="Image" to={imageUrl}>
          <StyledListItemIcon>
            <ContactsIcon />
          </StyledListItemIcon>
          <StyledListItemText primary="Image" />
        </StyledListItem>
        <StyledListItem component={Link} key="Location" to={locationUrl}>
          <StyledListItemIcon>
            <LocationIcon />
          </StyledListItemIcon>
          <StyledListItemText primary="Location" />
        </StyledListItem>
      </List>
    </Drawer>
  );
};
