import {
    ExpandLess,
    ExpandMore
} from "@mui/icons-material";
import {
    Grid,
    Collapse,
    List,
    ListItem,
    Slide,
    ListItemText,
    TableContainer,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TableHead,
    Paper,
    Pagination,
    PaginationItem
} from "@mui/material";
import Cropper from "cropperjs";

import { forwardRef, useEffect, useRef, useState } from "react"
import { Link as RouterLink } from 'react-router-dom';
import CropperDialog from "../comon/CropperDialog/CropperDialog";

import { User, UserRequest } from "./types"

import http from "../../http_comon"

import "./HomePage.css"

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

const Transition = forwardRef(function Transition(props: any, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const Home: React.FC = () => {
    const [fileSelected, setFileSelected] = useState<string>("https://www.phoca.cz/images/projects/phoca-download-r.png")
    const [cropperObj, setCropperObj] = useState<Cropper>();
    const imgRef = useRef<HTMLImageElement>(null);
    const prevRef = useRef<HTMLDivElement>();

    const [open, setOpen] = useState(true);
    const [isCropperDialogOpen, setIsCropperDialogOpen] = useState(false);

    const [page, setPage] = useState<number>(1);
    const [numberOfPages, setNumberOfPages] = useState<number>(1);

    const [users, setUsers] = useState<Array<User>>();

    useEffect(() => {
        getUsers(page);
    }, []);

    const getUsers = (page: number) => {
        http.get<UserRequest>("api/user/get-all", { params: { page: page - 1 } })
            .then(response => {
                setUsers(response.data.content);
                setNumberOfPages(response.data.totalPages);
                console.log(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleClick = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const selectImage = async (url: string) => {
        if (!cropperObj) {
            const cropper = new Cropper(imgRef.current as HTMLImageElement, {
                aspectRatio: 1 / 1,
                viewMode: 1,
                dragMode: 'move',
                preview: prevRef.current,
            });
            cropper.replace(url);
            setCropperObj(cropper);
        }
        else {
            cropperObj?.replace(url);
        }

        console.log("qwe")
        setIsCropperDialogOpen(true);
    }

    const handleImageChange = async function (e: React.ChangeEvent<HTMLInputElement>) {
        const fileList = e.target.files;
        console.log("asd")
        if (!fileList || fileList.length === 0) return;

        await selectImage(URL.createObjectURL(fileList[0]));
        e.target.value = "";
    };

    const cropperDialogClose = () => {
        setIsCropperDialogOpen(false);
    };

    const cropperDialogSave = async function (e: React.MouseEvent<HTMLElement>) {
        const base = cropperObj?.getCroppedCanvas().toDataURL() as string;
        await setFileSelected(base)
        setIsCropperDialogOpen(false);
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
                <Grid item xs={6}>
                    <label htmlFor="Image">
                        <img
                            src={fileSelected}
                            alt="DefaultImage"
                            style={{ width: "160px", height: "160px", cursor: "pointer", borderRadius: 7 }} />
                    </label>
                    <input style={{ display: "none" }} type="file" name="Image" id="Image" onChange={handleImageChange} />
                </Grid>
            </Grid>

            <TableContainer component={Paper} sx={{ my: 3 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="center">Display Name</TableCell>
                            <TableCell align="center">Down Votes</TableCell>
                            <TableCell align="center">Location</TableCell>
                            <TableCell align="center">Reputation</TableCell>
                            <TableCell align="center">Up Votes</TableCell>
                            <TableCell align="center">Views</TableCell>
                            <TableCell align="center">Website Url</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users && users.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="center">{row.displayName}</TableCell>
                                <TableCell align="center">{row.downVotes}</TableCell>
                                <TableCell align="center">{row.location}</TableCell>
                                <TableCell align="center">{row.reputation}</TableCell>
                                <TableCell align="center">{row.upVotes}</TableCell>
                                <TableCell align="center">{row.views}</TableCell>
                                <TableCell align="center">{row.websiteUrl}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container sx={{ mb: 5 }}>
                <Pagination count={numberOfPages} page={page} shape="rounded" variant="outlined" size="large" showFirstButton showLastButton sx={{ mx: "auto" }}
                    onChange={(event: any, value) => {
                        setPage(value)
                        getUsers(value);
                    }}
                    renderItem={(item) => <PaginationItem {...item}
                        sx={{ color: "#55FCF1", background: "#18181b", borderColor: "#55FCF1" }} />} />
            </Grid>
            <CropperDialog
                Transition={Transition}
                imgRef={imgRef}
                preview={prevRef}
                modalSave={cropperDialogSave}
                isDialogOpen={isCropperDialogOpen}
                modalClose={cropperDialogClose}
                image={fileSelected} />
        </>
    )
}

export default Home;