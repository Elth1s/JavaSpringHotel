import {
    AppBar,
    Avatar,
    Box,
    Container,
    IconButton,
    Toolbar,
    Typography
} from "@mui/material";
import {
    Home,
    Person,
    Login
} from "@mui/icons-material";

import React from "react";
import { Link, useNavigate } from "react-router-dom";


interface IMenuItem {
    label: string,
    icon: any,
    link: string,
}

const menuItems: Array<IMenuItem> = [
    {
        label: 'Home',
        icon: <Home />,
        link: '/',
    },
    {
        label: 'Profile',
        icon: <Person />,
        link: '/user/profile'
    },
    {
        label: 'Admin',
        icon: <Person />,
        link: '/admin/countries/list'
    }
];


const Header = () => {
    // const { LogoutUser } = useActions();
    // const { user, isAuth } = useTypedSelector((state) => state.auth);


    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        setAnchorEl(null);
        // LogoutUser();
        navigate("/");
    }
    return (
        <Box sx={{ flexGrow: 1 }} mb={{ xs: 9, sm: 11 }}  >
            <AppBar sx={{ background: "#18181b", borderBottom: 1, borderColor: '#45A29E' }} position="fixed" >
                <Container sx={{ maxWidth: { xl: "xl", lg: "lg", md: "md" } }}>
                    <Toolbar style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <Typography
                            component={Link} to="/"
                            variant="h4"
                            noWrap
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                            style={{ textDecoration: 'none', color: '#55FCF1' }}
                        >
                            Hotel
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />


                        <IconButton
                            sx={{ paddingRight: 0 }}
                            onClick={handleClick}
                            size="small"
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar
                                sx={{
                                    width: 32,
                                    height: 32,
                                    color: "#55FCF1",
                                    border: 2,
                                    borderColor: '#45A29E'
                                }}
                                style={{ backgroundColor: "transparent" }}
                            >
                                <Person />
                            </Avatar>
                            {/* {(user.photo === "")
                                    ? <Avatar
                                        sx={{
                                            width: 32,
                                            height: 32,
                                            color: "#55FCF1",
                                            border: 2,
                                            borderColor: '#45A29E'
                                        }}
                                        style={{ backgroundColor: "transparent" }}
                                    >
                                        {user.name[0].toUpperCase()}
                                    </Avatar>
                                    : <Avatar alt="Image"
                                        sx={{
                                            width: 32,
                                            height: 32,
                                            color: "#55FCF1",
                                            border: 2,
                                            borderColor: '#45A29E'
                                        }} src={baseURL + user.photo} />} */}
                        </IconButton>

                    </Toolbar>
                </Container>
            </AppBar>
            {/* <Menu
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
                        background: "#18181b",
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
                <Box sx={{ my: 0.5, mb: 1.5, px: 2.5 }}>
                    <Typography variant="subtitle1" noWrap sx={{ color: '#f1f1f1' }}>
                        {user.name} {user.surname}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#f1f1f1' }} noWrap>
                        {user.email}
                    </Typography>
                </Box>
                <Divider sx={{ my: 1, background: "#45A29E" }} />
                {menuItems.map((option) => (
                    option.label === "Admin" && user.roles !== "Admin"
                        ?
                        < MenuItem
                            key={option.label}
                            to={option.link}
                            component={Link}
                            onClick={handleClose}
                            sx={{ py: 1, px: 2.5 }}
                            style={{ textDecoration: 'none', color: 'unset', display: "none" }}
                        >

                        </MenuItem>
                        :
                        < MenuItem
                            key={option.label}
                            to={option.link}
                            component={Link}
                            onClick={handleClose}
                            sx={{ py: 1, px: 2.5 }}
                            style={{ textDecoration: 'none', color: 'unset' }}
                        >
                            <IconButton sx={{ mr: 2, width: 24, height: 24, color: "#f1f1f1" }}>
                                {option.icon}
                            </IconButton>
                            <Typography variant="subtitle1" noWrap sx={{ color: '#f1f1f1' }}>
                                {option.label}
                            </Typography>
                        </MenuItem>
                ))}
                <Divider sx={{ my: 1, background: "#45A29E" }} />
                <MenuItem
                    onClick={handleLogOut}
                    sx={{ py: 1, px: 2.5 }}
                    style={{ textDecoration: 'none', color: 'unset' }}
                >
                    <IconButton sx={{ mr: 2, width: 24, height: 24, color: "#f1f1f1" }}>
                        <Logout />
                    </IconButton>
                    <Typography variant="subtitle1" noWrap sx={{ color: '#f1f1f1' }}>
                        Log Out
                    </Typography>
                </MenuItem>
            </Menu> */}
        </Box >

    );
};

export default Header;