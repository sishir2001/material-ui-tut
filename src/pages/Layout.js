import {
    AppBar,
    Avatar,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Toolbar,
    Typography,
} from "@material-ui/core";
import { AddCircleOutlineOutlined, SubjectOutlined } from "@material-ui/icons";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import format from "date-fns/format";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import actionCreator from "../actions";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
    return {
        page: {
            background: "#f9f9f9",
            width: "100%",
            padding: theme.spacing(3),
        },
        title: {
            padding: theme.spacing(2),
        },
        root: {
            display: "flex",
        },
        drawer: {
            width: drawerWidth,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        activeTab: {
            background: "#f4f4f4",
        },
        appBar: {
            width: `calc(100% - ${drawerWidth}px)`,
            background: "#ffffff",
            color: "#000000",
        },
        toolbar: theme.mixins.toolbar,
        date: {
            flexGrow: 1,
        },
        avatar: {
            marginLeft: theme.spacing(2),
        },
    };
});
const Layout = ({ children }) => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const { accountActions, apiActions } = actionCreator;

    const { auth, account, api } = useSelector((state) => state);

    useEffect(() => {
        console.log(auth);
        console.log(account);
        console.log(api);
    }, [api.itemList]);

    const menuItems = [
        {
            path: "/",
            icon: <SubjectOutlined color="secondary" />,
            text: "My Notes",
        },
        {
            path: "/create",
            icon: <AddCircleOutlineOutlined color="secondary" />,
            text: "Create Note",
        },
    ];

    return (
        <div className={classes.root}>
            {/* app bar */}
            <AppBar elevation={1} className={classes.appBar}>
                <Toolbar>
                    <Typography className={classes.date}>
                        {format(new Date(), "do MMMM Y")}
                    </Typography>
                    <Typography>Mario</Typography>
                    <Avatar src="/mario.png" className={classes.avatar} />
                </Toolbar>
            </AppBar>

            {/* navigation drawer */}
            <Drawer
                className={classes.drawer}
                variant="permanent"
                anchor="left"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div>
                    <Typography variant="h5" className={classes.title}>
                        Ninja Notes
                    </Typography>
                    {/* Mapping menuItems */}
                    <List>
                        {menuItems.map((item) => (
                            <ListItem
                                button
                                key={item.text}
                                onClick={() => {
                                    history.push(item.path);
                                    dispatch(accountActions.depositMoney(1000));
                                    dispatch(apiActions.fetchList());
                                }}
                                className={
                                    location.pathname === item.path
                                        ? classes.activeTab
                                        : null
                                }
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                {children}
            </div>
        </div>
    );
};
export default Layout;
