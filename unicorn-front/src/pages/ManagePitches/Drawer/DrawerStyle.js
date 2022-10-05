import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';

export const openedMixin = (theme) => ({
  width: '240px',
  top: '100px',
  borderRadius: '0 14px 14px 0',
  height: '350px',
  borderRight: 0,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

export const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  top: '100px',
  borderRadius: '0 14px 14px 0',
  '& .MuiDrawer-paper': {
    border: '1px solid rgba(0, 0, 0, 0.12)',
    borderRight: 0,
    height: '350px',
  },
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: '240px',
  flexShrink: 0,
  backgroundColor: '#e5e7ed',
  whiteSpace: 'nowrap',
  '& .MuiPaper-root': {
    position: 'absolute',
    top: '4.9rem',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    borderRight: 0,
    height: '350px',
  },
  boxSizing: 'border-box',
  '&:hover': {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  },
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));
