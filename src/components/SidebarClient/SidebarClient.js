import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./SidebarClient.css";

import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";

import HomeIcon from '@material-ui/icons/Home';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  content: {
    flexGrow: 1,
    width: "100%",
    padding: 0,
    // paddingTop: theme.spacing(3),
  },
}));

export default function ComputerSidebar(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const objListOptionsClient = [
    {
      itemName: "Home",
      itemIcon: <HomeIcon />,
      path: "/",
    },
    {
      itemName: "Loja",
      itemIcon: <LocalMallIcon />,
      path: "/shop",
    },
    {
      itemName: "Contato",
      itemIcon: <ContactMailIcon />,
      path: "/contact",
    },
    {
      itemName: "Carrinho",
      itemIcon: <ShoppingCartIcon />,
      path: "/cart"
    },
  ];

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List className="sidebarListaClient">
          {
              objListOptionsClient.map((item, index) => (
                <Link to={`${item.path}`}>
                  <ListItem button key={index}>
                    <ListItemIcon>{item.itemIcon}</ListItemIcon>
                    <ListItemText primary={item.itemName.toUpperCase()} />
                  </ListItem>
                </Link>
              ))
          }
      </List>
    </div>
  );
  
  const container = window !== undefined ? () => window().document.body : undefined;


  return (
    <div className="sidebarClient">
      {/* <CssBaseline /> */}
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}

ComputerSidebar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
