import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LoginIcon from "@mui/icons-material/Login";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import CarRentalIcon from "@mui/icons-material/CarRental";
import { useContext, useState } from "react";
import { UserContext } from "../../providers/UserProvider";
import MenuItem from "./MenuItem";
import { Button } from "@mui/material";
import "./Sidebar.css";


const drawerWidth = 240;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
	({ theme, open }) => ({
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: "nowrap",
		boxSizing: "border-box",
		...(open && {
			...openedMixin(theme),
			"& .MuiDrawer-paper": openedMixin(theme),
		}),
		...(!open && {
			...closedMixin(theme),
			"& .MuiDrawer-paper": closedMixin(theme),
		}),
	}),
);


export default function Sidebar({ children }) {
	const theme = useTheme();
	const [open, setOpen] = useState(true);
	const { user, logout } = useContext(UserContext)

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar position="fixed" open={open}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{
							marginRight: 5,
							...(open && { display: "none" }),
						}}>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						Mobility Rental
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer variant="permanent" open={open}>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					{/* LOGGED IN MENU */}
					{user.jwt ?
						(
							<>
								<MenuItem route="/" text="Dashboard" icon={<DashboardIcon />} open={open} />
								<MenuItem route="offers" text="Offers (Medewerker)" icon={< AssignmentIcon />} open={open} />
								<MenuItem route="purchase-request" text="Purchase Request (Dealer)" icon={< AddShoppingCartIcon />} open={open} />
								<MenuItem route="purchase-request/accepted" text="Accepted PR (Medewerker)" icon={< AddShoppingCartIcon />} open={open} />
								<MenuItem route="purchase-order" text="Purchase Order (Dealer)" icon={< CarCrashIcon />} open={open} />
							</>
						)
						:
						(
							<>
								<MenuItem route="login" text="Login" icon={< LoginIcon />} open={open} />
							</>
						)
					}
				</List>
				{user.jwt && <Divider />}
				{/* NORMAL USER MENU */}
				<List>
					<>
						<MenuItem route="vehicles" text="Vehicles" icon={< CarRentalIcon />} open={open} />

					</>

				</List>
				{user.jwt ?
					(
						<>
							<div>
								<Button className="log-button" variant="contained" onClick={() => logout()}>removeCookie (Log Out)</Button>
							</div>
						</>
					)
					:
					(
						<>

						</>
					)
				}
			</Drawer>

			{/* CONTENT */}
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<DrawerHeader />
				{children}
			</Box>
		</Box >
	);
}
