import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    Switch,
    Toolbar,
    Typography,
    CssBaseline
} from "@mui/material";
import {
    Home,
    Person,
    Login,
    Logout,
    NightlightOutlined,
    PersonOutlineOutlined
} from "@mui/icons-material";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthDialog from "../../comon/AuthDialog";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

interface ISettingsMenuItem {
    label: string,
    icon: any,
    onClick: any,
    switchElement: boolean
}



const Header = () => {
    const { SetTheme, LogoutUser } = useActions();
    const { darkTheme } = useTypedSelector((state) => state.ui);
    const { user, isAuth } = useTypedSelector((state) => state.auth)

    const UISettings: Array<ISettingsMenuItem> = [
        {
            label: 'Dark theme',
            icon: <NightlightOutlined />,
            onClick: () => handleThemeChange(),
            switchElement: true
        }
    ];


    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleThemeChange = () => {
        SetTheme(!darkTheme)
        localStorage.darkTheme = !darkTheme;
    };

    const handleLogOut = () => {
        setAnchorEl(null);
        LogoutUser();
        navigate("/");
    }
    return (
        <Box sx={{ flexGrow: 1 }} mb={{ xs: 9, sm: 11 }} >
            <AppBar color="transparent" sx={{ borderBottom: 1, borderColor: '#45A29E' }} position="fixed" >
                <Container sx={{ maxWidth: { xl: "xl", lg: "lg", md: "md" } }}>
                    <Toolbar style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <Typography
                            component={Link} to="/"
                            variant="h4"
                            noWrap
                            color="secondary"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                            style={{ textDecoration: 'none' }}
                        >
                            Hotel
                        </Typography>
                        <Typography
                            component={Link} to="/regions/create"
                            variant="h6"
                            noWrap
                            color="secondary"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                            style={{ textDecoration: 'none' }}
                        >
                            Create region
                        </Typography>
                        <Typography
                            component={Link} to="/hotels/create"
                            variant="h6"
                            noWrap
                            color="secondary"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                            style={{ textDecoration: 'none' }}
                        >
                            Create hotel
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />


                        <Button
                            sx={{
                                minWidth: 36,
                                height: 36,
                                p: 0,
                                borderRadius: 2
                            }}
                            onClick={handleClick}
                            size="small"
                            color="secondary"
                        >

                            <PersonOutlineOutlined />

                        </Button>

                    </Toolbar>
                </Container>
            </AppBar>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        borderRadius: 3,
                        overflow: 'visible',
                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))',
                        mt: 0.5,
                        minWidth: "200px",
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        }
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {isAuth &&
                    <Box>
                        <Box sx={{ my: 0.5, mb: 1.5, px: 2.5 }}>
                            <Typography variant="subtitle1" noWrap >
                                {user.fullname}
                            </Typography>
                            <Typography variant="body2" noWrap>
                                {user.username}
                            </Typography>
                        </Box>
                        <Divider sx={{ my: 1, background: "#45a29e" }} />
                    </Box>
                }
                {UISettings.map((option) => (
                    <MenuItem
                        key={option.label}
                        onClick={option.onClick}
                        sx={{ py: 1, px: 2.5 }}
                        style={{ textDecoration: 'none', color: 'unset' }}
                    >
                        <IconButton sx={{ mr: 2, width: 24, height: 24 }}>
                            {option.icon}
                        </IconButton>
                        <Typography variant="subtitle1" noWrap sx={{ color: 'secondary' }}>
                            {option.label}
                        </Typography>
                        {option.switchElement &&
                            <Switch checked={darkTheme} />
                        }
                    </MenuItem>
                ))}
                {isAuth
                    ? <Box>
                        <Divider sx={{ my: 1, background: "#45a29e" }} />
                        <MenuItem
                            onClick={handleLogOut}
                            sx={{ py: 1, px: 2.5 }}
                            style={{ textDecoration: 'none', color: 'unset' }}
                        >
                            <IconButton sx={{ mr: 2, width: 24, height: 24 }}>
                                <Logout />
                            </IconButton>
                            <Typography variant="subtitle1" noWrap >
                                Log Out
                            </Typography>
                        </MenuItem>
                    </Box>
                    : <AuthDialog />}
            </Menu>
        </Box >
    );
};

export default Header;