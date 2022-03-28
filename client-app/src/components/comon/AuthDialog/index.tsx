import {
    Dialog,
    DialogTitle,
    IconButton,
    DialogContent,
    Slide,
    Box,
    Tab,
    Divider,
    MenuItem,
    Typography
} from "@mui/material";
import { TransitionProps } from '@mui/material/transitions';
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Login } from '@mui/icons-material';

import { FC, useState } from "react";
import React from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const ChangePasswordDialog: FC = () => {
    const [title, setTitle] = useState<string>("Log In");
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [tabValue, setTabValue] = React.useState<string>("1");

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    };

    const dialogOpen = () => {
        setIsDialogOpen(true);
    };
    const dialogClose = () => {
        setIsDialogOpen(false);
    };

    const stopPropagationForTab = (event: any) => {
        if (event.key === "Tab") {
            event.stopPropagation();
        }
    };
    return (
        <>
            <Divider sx={{ my: 1, background: "#45a29e" }} />
            <MenuItem
                onClick={dialogOpen}
                sx={{ py: 1, px: 2.5 }}
                style={{ textDecoration: 'none', color: 'unset' }}
            >
                <IconButton sx={{ mr: 2, width: 24, height: 24, color: "secondary" }}>
                    <Login />
                </IconButton>
                <Typography variant="subtitle1" noWrap sx={{ color: 'secondary' }}>
                    Log in
                </Typography>
            </MenuItem>
            <Dialog
                onKeyDown={stopPropagationForTab}
                open={isDialogOpen}
                TransitionComponent={Transition}
                maxWidth="sm"
                onClose={dialogClose}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: { borderRadius: 10, minWidth: "550px", minHeight: "300px" }
                }}
            >
                <GoogleReCaptchaProvider reCaptchaKey="6Lc_nf4eAAAAACeBl6BhMih3uCTngIikJng_nlYG">

                    <DialogTitle sx={{ display: "flex", justifyContent: "center" }} color="secondary">
                        {title}
                    </DialogTitle>
                    <DialogContent>
                        <TabContext value={tabValue} >
                            <Box sx={{ borderBottom: 1, borderColor: "#45a29e" }}>
                                <TabList
                                    textColor="primary"
                                    indicatorColor="primary"
                                    onChange={handleTabChange}
                                    aria-label="lab API tabs example"
                                >
                                    <Tab label="Log In" value="1" onClick={() => { setTitle("Log In") }} sx={{ color: "#a6a6a6" }} />
                                    <Tab label="Sign Up" value="2" onClick={() => { setTitle("Sign Up") }} sx={{ color: "#a6a6a6" }} />
                                </TabList>
                            </Box>
                            <TabPanel value="1" >
                                <LoginPage />
                            </TabPanel>
                            <TabPanel value="2">
                                <RegisterPage />
                            </TabPanel>
                        </TabContext>
                    </DialogContent>

                </GoogleReCaptchaProvider>
            </Dialog >
        </>
    )
}

export default ChangePasswordDialog;