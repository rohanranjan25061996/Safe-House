import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';

import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Transaction from '../components/pages/TxPage';
import { AuthContext } from '../contextAPI/Auth';
import {useMoralis} from "react-moralis"
import {concatStringAddress} from "../utils/helper"
import CreateNewSafe from '../components/pages/CreateSafe';
import Main from '../components/pages/Main';

const drawerWidth = 240;
const settings = ['Logout'];
const connectSetting = ['Connect']


export default function ClippedDrawer() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const {balance, setBalance, isAuth, setUserAddress, handelAuth, userAddress, allSubDao, activeDAO, setActiveDAO} = React.useContext(AuthContext);

    const {isAuthenticated, isWeb3Enabled, authenticate, enableWeb3, logout} = useMoralis();

    console.log(allSubDao);
    React.useEffect(() => {
        if (!isWeb3Enabled && isAuthenticated) {
          enableWeb3({ provider: "walletconnect", chainId: 56 });
          console.log("web3 activated");
        }
      }, [isWeb3Enabled, isAuthenticated, enableWeb3]);

      const loginUser = async () => {
        authenticate({signingMessage: 'Welcome to Safe House App !'}).then((user) => {
           let addr = user.get("ethAddress")
           setUserAddress(addr);
           handelAuth();
      })
    }

    const logoOutuser = () => {
        logout();
        setUserAddress("")
        handelAuth()
    }

    const changeActiveDAO = (addr) => {
      setActiveDAO(addr)
    }
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    // uef
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} style={{ background: '#2E3B55',color:"white" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            Safe House
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
            
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
         
              
          
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/metamask.png" />
            
               
  
  
  <Stack alignItems="center" variant='p' style={{color:"white"}} >
  <Typography >Metamask</Typography>
  <Typography  align="center">{userAddress === '' ? 'connect to wallet' : `rin:${concatStringAddress(userAddress)}` }</Typography>


  </Stack>
    

              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px'}}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userAddress !== '' && settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick = {logoOutuser}>{setting}</Typography>
                </MenuItem>
              ))}
              {userAddress === '' && <MenuItem key={connectSetting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick = {loginUser}>{connectSetting}</Typography>
                </MenuItem>}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
            <Typography align='center' style={{ background: '#e8673c',color:"white" }}>Rinkeby</Typography>
          <List align="center" variant='h7'>
  
          <Stack alignItems="center">
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          <Typography  align="center">rin:{concatStringAddress(activeDAO)}</Typography>
          <Typography  align="center">{balance} ETH</Typography>
         <Transaction/>
        
         
          </Stack>
            
          </List>
          <Divider />
          <List>
            {isAuth && allSubDao.length !== 0 && allSubDao.map((item) => (
              <ListItem button key={item}>
              <ListItemText primary={concatStringAddress(item)} onClick={() => changeActiveDAO(item)} />
            </ListItem>
            ))}
          </List>
        
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography paragraph>
            {isAuth && <Main />}
        </Typography>
        <Typography paragraph>
          
        </Typography>
      </Box>
    </Box>
  );
}
