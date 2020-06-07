import React from "react";
import { useState, useEffect } from "react";
import clsx from "clsx";
import axios from "axios";
import { useHistory } from "react-router-dom";
// Material UI
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Badge,
  Avatar,
} from "@material-ui/core/";

// Material Icons
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CalendarTodayIcon from "@material-ui/icons/CalendarTodayOutlined";
import AccountTreeIcon from "@material-ui/icons/AccountTreeOutlined";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import TableChartIcon from "@material-ui/icons/TableChartOutlined";
import ClearAllIcon from "@material-ui/icons/ClearAll";
import SettingsIcon from "@material-ui/icons/SettingsOutlined";
import NotificationsIcon from "@material-ui/icons/NotificationsNoneOutlined";
import BarChartIcon from "@material-ui/icons/BarChart";
import FolderOpenIcon from "@material-ui/icons/FolderOpenOutlined";
import DashboardIcon from "@material-ui/icons/DashboardOutlined";
import { ReactComponent as SuitIcon } from "../../assets/icons/suit.svg";
import pic1 from "../../assets/img/1.png";
import pic2 from "../../assets/img/2.png";
import pic3 from "../../assets/img/3.png";
import pic4 from "../../assets/img/4.png";

const api = axios.create({
  baseURL: "https://q3rgtdews6.execute-api.us-east-2.amazonaws.com/default/",
});

const GreenStyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}))(Badge);

const RedStyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#FF0000",
    color: "#FF0000",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}))(Badge);

const YellowStyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#ffe606",
    color: "#ffe606",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}))(Badge);

const SmallAvatar = withStyles((theme) => ({
  root: {
    width: 33,
    height: 33,
  },
}))(Avatar);

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "streach",
  },
  grow: {
    flexGrow: 1,
  },
  table: {
    minWidth: 700,
  },
  main: {
    bottom: 0,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "white",
    color: "black",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(10),
    backgroundColor: "#f1f5fc",
    paddingBottom: "500px",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  suitIcon: {
    width: "25px",
    height: "25px",
  },
}));

const Dashboard = (props) => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();

  const loggedIn = props.history.location.state.loggedIn;
  if (loggedIn !== true) {
    history.push({
      pathname: "/",
      state: { error: "Not Logged In!" },
    });
  }

  useEffect(() => {
    try {
      api.get("/user").then((users) => {
        setUsers(users.data.model.users);
      });
    } catch (e) {
      console.log("Error: " + e);
    }
  }, []);

  // Helper functions
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        elevation={0}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <ClearAllIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            <IconButton color="inherit">
              <SuitIcon className={classes.suitIcon} />
            </IconButton>
            Epic Admin Dashboard
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton color="inherit">
              <RedStyledBadge
                overlap="circle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                variant="dot"
              >
                <NotificationsIcon />
              </RedStyledBadge>
            </IconButton>
            <IconButton color="inherit">
              <GreenStyledBadge
                overlap="circle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                variant="dot"
              >
                <SmallAvatar src={pic1} />
              </GreenStyledBadge>
            </IconButton>
            <IconButton color="inherit">
              <GreenStyledBadge
                overlap="circle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                variant="dot"
              >
                <SmallAvatar src={pic2} />
              </GreenStyledBadge>
            </IconButton>
            <IconButton color="inherit">
              <GreenStyledBadge
                overlap="circle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                variant="dot"
              >
                <SmallAvatar src={pic3} />
              </GreenStyledBadge>
            </IconButton>
            <IconButton color="inherit">
              <YellowStyledBadge
                overlap="circle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                variant="dot"
              >
                <SmallAvatar src={pic4} />
              </YellowStyledBadge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ClearAllIcon /> : <ClearAllIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon style={{ color: "#9edac4" }} />
            </ListItemIcon>
            <ListItemText primary={"Dash Home"} />
            <ExpandMoreIcon />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <TableChartIcon style={{ color: "blue" }} />
            </ListItemIcon>
            <ListItemText primary={"Table"} />
            <UnfoldMoreIcon />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <FolderOpenIcon style={{ color: "#f79838" }} />
            </ListItemIcon>
            <ListItemText primary={"Project"} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <FormatListNumberedIcon style={{ color: "#1e1e1e" }} />
            </ListItemIcon>
            <ListItemText primary={"Timeline"} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <CalendarTodayIcon style={{ color: "#d75cdb" }} />
            </ListItemIcon>
            <ListItemText primary={"Calendar"} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AccountTreeIcon style={{ color: "#48d996" }} />
            </ListItemIcon>
            <ListItemText primary={"Integration"} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <BarChartIcon style={{ color: "#1e1e1e" }} />
            </ListItemIcon>
            <ListItemText primary={"Statistics"} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon style={{ color: "#f3c988" }} />
            </ListItemIcon>
            <ListItemText primary={"Settings"} />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container className={classes.main} maxWidth="md" fixed>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="left">Name </TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Phone</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.phone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </main>
    </div>
  );
};

export default Dashboard;
