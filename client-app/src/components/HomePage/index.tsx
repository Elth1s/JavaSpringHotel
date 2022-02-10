import {
    ExpandLess,
    ExpandMore
} from "@mui/icons-material";
import {
    Box,
    Collapse,
    List,
    ListItem,
    Slide,
    ListItemText
} from "@mui/material";
import Cropper from "cropperjs";

import { forwardRef, useRef, useState } from "react"
import { Link as RouterLink } from 'react-router-dom';
import CropperDialog from "../comon/CropperDialog/CropperDialog";


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

    const [open, setOpen] = useState(true);
    const [isCropperDialogOpen, setIsCropperDialogOpen] = useState(false);

    const handleClick = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const selectImage = async (url: string) => {
        if (!cropperObj) {
            const cropper = new Cropper(imgRef.current as HTMLImageElement, {
                aspectRatio: 1 / 1,
                viewMode: 1,
                dragMode: 'move',
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
            <Box
                sx={{
                    mt: 1,
                }}
                component="nav"
            >
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
            </Box>
            <Box
                sx={{
                    mt: 1,
                }}
                component="main"
            >
                <label htmlFor="Image">
                    <img
                        src={fileSelected}
                        alt="DefaultImage"
                        style={{ width: "160px", height: "160px", cursor: "pointer", borderRadius: 7 }} />
                </label>
                <input style={{ display: "none" }} type="file" name="Image" id="Image" onChange={handleImageChange} />
            </Box>
            <CropperDialog
                Transition={Transition}
                imgRef={imgRef}
                modalSave={cropperDialogSave}
                isDialogOpen={isCropperDialogOpen}
                modalClose={cropperDialogClose}
                image={fileSelected} />
        </>
    )
}

export default Home;