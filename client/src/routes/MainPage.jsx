import React, { useEffect, useState, useContext } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AllRoutes } from "./AllRoutes";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import SendIcon from '@mui/icons-material/Send';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../contextAPI/Auth';
import { useMoralis } from "react-moralis";
import { concatStringAddress } from "../utils/helper"
import styles from "./../styles/MainPage.module.css";
import { Avatar, Button, Menu, Stack } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { getMoralisOptionMainDAO, getProviderMainDAOWallet, getProviderSubDAOWallet } from "../utils/helper";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

// Drawer Width
const drawerWidth = 240;

const MainPage = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const { Moralis } = useMoralis();

	const [open, setOpen] = useState(false);
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [loading, setLoading] = useState(false)
	const [anchorEl, setAnchorEl] = useState(null);
	const openWallet = Boolean(anchorEl);

	const { balance, setBalance, isAuth, setUserAddress, handelAuth, userAddress, allSubDao, setAllSubDao, activeDAO, setActiveDAO } = useContext(AuthContext);
	const { isAuthenticated, isWeb3Enabled, authenticate, enableWeb3, logout } = useMoralis();

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleRoute = (para) => {
		navigate(`/${para}`)
	}

	const loginUser = async () => {
		handleClose()
		authenticate({ signingMessage: 'Welcome to Safe House App !' }).then((user) => {
			let addr = user.get("ethAddress")
			setUserAddress(addr);
			handelAuth();
		})
			.then(() => {
				getAllDAO();
			})
	}

	const logoOutuser = () => {
		logout();
		setUserAddress("")
		handelAuth()
		handleClose()
	}

	const changeActiveDAO = (addr) => {
		setActiveDAO(addr)
	}

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	useEffect(() => {
		getAllDAO()
	}, [])

	useEffect(() => {
		allOwnersOfSubDAO()
	}, [activeDAO])

	useEffect(() => {
		if (activeDAO !== "") {
			getSubDAOBalance()
		}
	}, [activeDAO])

	useEffect(() => {
		if (!isWeb3Enabled && isAuthenticated) {
			enableWeb3({ provider: "walletconnect", chainId: 56 });
			console.log("web3 activated");
		}
	}, [isWeb3Enabled, isAuthenticated, enableWeb3]);

	const getAllDAO = async () => {
		try {
			let payLoad = {
				_walletAddress: userAddress
			}
			const option = getMoralisOptionMainDAO('getData', payLoad)
			const allData = await Moralis.executeFunction(option)
			console.log("all data =====", allData)
			if (allData) {
				const { subDAO } = allData
				console.log("=====sub DAO=====", subDAO)
				setAllSubDao(subDAO)
			}
		} catch (error) {
			setLoading(false)
			let ok = JSON.stringify(error)
			let parseOk = JSON.parse(ok)
			console.log("============ getAllDAO parse ok ========", parseOk)
		}
	}

	const getSubDAOBalance = async () => {
		try {
			// const bal = await Moralis.executeFunction(getMoralisOptionMainDAO('getBalaceOfContract'))
			const provider = getProviderSubDAOWallet(activeDAO)
			const bal = await provider.getBalaceOfContract()

			let tempBal = bal.toNumber() * 1000000000000000000
			setBalance(tempBal)
		} catch (error) {
			setLoading(false)
		}
	}

	const allOwnersOfSubDAO = async () => {
		try {
			const provider = getProviderSubDAOWallet(activeDAO)
			const tx = await provider.getAllOwnersList()
			console.log("=======allOwnersOfSubDAO data=====", tx)
		} catch (error) {
			setLoading(false)
			let ok = JSON.stringify(error)
			let parseOk = JSON.parse(ok)
			console.log("============ allOwnersOfSubDAO parse ok ========", parseOk)
		}
	}

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			{/*     AppBar starts here   */}
			<AppBar position="fixed" open={open}>
				<Toolbar className={styles.toolbar}>
					<div className={styles.pageNameDiv}>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							edge="start"
							sx={{ mr: 2, ...(open && { display: 'none' }) }}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" noWrap component="div">
							Safe House
						</Typography>
					</div>
					<div className={styles.walletDiv}>

						<div>
							<div>
								<Button
									id="basic-button"
									aria-controls={openWallet ? 'basic-menu' : undefined}
									aria-haspopup="true"
									aria-expanded={openWallet ? 'true' : undefined}
									onClick={handleClick}
								>
									<Avatar alt="Remy Sharp" src="/metamask.png" style={{ marginRight: 10, width: 45, height: 45 }} />
									<Typography align="center" style={{ color: "white" }}>{userAddress === '' ? 'Connect Wallet' : `rin:${concatStringAddress(userAddress)}`}</Typography>
								</Button>
								<Menu
									id="basic-menu"
									anchorEl={anchorEl}
									open={openWallet}
									onClose={handleClose}
									MenuListProps={{
										'aria-labelledby': 'basic-button',
									}}
									className={styles.walletMenu}
								>
									{
										userAddress === '' ? <MenuItem onClick={loginUser} className={styles.walletMenuItem}>Login</MenuItem> :
											<Box>
												<Typography align='center' style={{ background: '#e8673c', color: "white" }}>Rinkeby</Typography>
												<List align="center" variant='h7'>
													<Stack alignItems="center">
														<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
														<Typography align="center">rin:{concatStringAddress(activeDAO)}</Typography>
														<Typography align="center">{balance} ETH</Typography>
													</Stack>
												</List>
												<Divider />
												<MenuItem onClick={logoOutuser} className={styles.walletMenuItem}>Logout</MenuItem>
											</Box>
									}
									{/* <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem> */}
								</Menu>
							</div>
						</div>

					</div>
				</Toolbar>
			</AppBar>
			{/*     AppBar Ends here   */}

			{/*     Drawer starts here   */}
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						boxSizing: 'border-box',
					},
				}}
				variant="persistent"
				anchor="left"
				open={open}
			>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</IconButton>
				</DrawerHeader>
				<Divider />


				<List>
					<ListItem button key="Home" onClick={() => handleRoute("")}>
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText primary="Home" />
					</ListItem>
					<ListItem button key="Create Safe" onClick={() => handleRoute("create-safe")}>
						<ListItemIcon>
							<AccountBalanceIcon />
						</ListItemIcon>
						<ListItemText primary="Create Safe" />
					</ListItem>
					<ListItem button key="Send Transaction" onClick={() => handleRoute("send-transaction")}>
						<ListItemIcon>
							<SendIcon />
						</ListItemIcon>
						<ListItemText primary="Send Transaction" />
					</ListItem>
					<ListItem button key="Confirm Transaction" onClick={() => handleRoute("confirm-transaction")}>
						<ListItemIcon>
							<DomainVerificationIcon />
						</ListItemIcon>
						<ListItemText primary="Confirm Transaction" />
					</ListItem>
				</List>
				<Divider />
				<List>

					{isAuth && allSubDao.length !== 0 && allSubDao.map((item) => (
						<ListItem button key={item}>
							<ListItemIcon>
								<AccountBalanceWalletIcon />
							</ListItemIcon>
							<ListItemText primary={concatStringAddress(item)} onClick={() => changeActiveDAO(item)} />
						</ListItem>
					))}
				</List>
			</Drawer>
			{/*     Drawer Ends here   */}

			<Main open={open} style={{ border: "1px solid red" }}>
				<DrawerHeader />

				{/* For Handling Page Routes */}
				<AllRoutes />
			</Main>
		</Box>
	);
}



//////////////////////  Drawer and Header Configs ///////////////////////


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
	({ theme, open }) => ({
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: `-${drawerWidth}px`,
		...(open && {
			transition: theme.transitions.create('margin', {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
			marginLeft: 0,
		}),
	}),
);

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end',
}));

export { MainPage }