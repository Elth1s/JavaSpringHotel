import {
    Grid,
    Collapse,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import {
    ExpandLess,
    ExpandMore
} from "@mui/icons-material";

import { Link as RouterLink } from 'react-router-dom';

import "./HomePage.css"
import { useState } from "react";

const breadcrumbNameMap: any = {
    '/inbox': 'Inbox',
    '/inbox/important': 'Important',
    '/trash': 'Trash',
    '/spam': 'Spam',
    '/drafts': 'Drafts',
};

const ListItemLink: React.FC<any> = (props) => {
    const { to, open, ...other } = props;
    const primary = breadcrumbNameMap[to];

    let icon = null;
    if (open != null) {
        icon = open ? <ExpandLess /> : <ExpandMore />;
    }

    return (
        <li>
            <ListItem button component={RouterLink} to={to} {...other}>
                <ListItemText primary={primary} />
                {icon}
            </ListItem>
        </li>
    );
}


const Home: React.FC = () => {
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    return (
        <>
            <Grid container sx={{ mt: 1 }}>
                <Grid item xs={6}>
                    <List>
                        <ListItemLink to="/inbox" open={open} onClick={handleClick} />
                        <Collapse component="li" in={open} timeout="auto" unmountOnExit>
                            <List disablePadding>
                                <ListItemLink sx={{ pl: 4 }} to="/inbox/important" />
                            </List>
                        </Collapse>
                        <ListItemLink to="/trash" />
                        <ListItemLink to="/spam" />
                    </List>
                </Grid>

            </Grid>
        </>
    )
}

export default Home;