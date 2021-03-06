import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Paper,
    Slide
} from "@mui/material";
import { Close } from "@mui/icons-material";

import { LegacyRef, forwardRef, useRef, useState, useEffect } from "react";
import Cropper from "cropperjs";

import { ICropperDialog } from "./types";

const Transition = forwardRef(function Transition(props: any, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const CropperDialog: React.FC<ICropperDialog> = ({ aspectRation = 1 / 1, onDialogSave }) => {
    const [cropperObj, setCropperObj] = useState<Cropper>();
    const imgRef = useRef<HTMLImageElement>(null);
    const prevRef = useRef<HTMLDivElement>();

    const [isCropperDialogOpen, setIsCropperDialogOpen] = useState(false);

    const selectImage = async (url: string) => {
        if (!cropperObj) {
            const cropper = new Cropper(imgRef.current as HTMLImageElement, {
                aspectRatio: aspectRation,
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

        setIsCropperDialogOpen(true);
    }

    const handleImageChange = async function (e: React.ChangeEvent<HTMLInputElement>) {
        const fileList = e.target.files;
        if (!fileList || fileList.length === 0) return;

        await selectImage(URL.createObjectURL(fileList[0]));
        e.target.value = "";
    };

    const cropperDialogClose = () => {
        setIsCropperDialogOpen(false);
    };

    const cropperDialogSave = async function (e: React.MouseEvent<HTMLElement>) {
        const base64 = cropperObj?.getCroppedCanvas().toDataURL() as string;
        onDialogSave(base64);
        setIsCropperDialogOpen(false);
    };

    return (
        <>
            <Box>
                <label htmlFor="Image">
                    <img
                        src={"https://www.phoca.cz/images/projects/phoca-download-r.png"}
                        alt="DefaultImage"
                        style={{ width: "160px", height: "160px", cursor: "pointer", borderRadius: 7 }} />
                </label>
                <input style={{ display: "none" }} type="file" name="Image" id="Image" onChange={handleImageChange} />
            </Box>
            <Dialog
                open={isCropperDialogOpen}
                TransitionComponent={Transition}
                maxWidth="lg"
                keepMounted
                onClose={cropperDialogClose}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    sx: {
                        width: {
                            sm: "50rem"
                        }
                    },
                    style: { borderRadius: 10, background: "#18181b" }
                }}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} color="#55FCF1">
                    Change photo
                    <IconButton
                        aria-label="close"
                        onClick={cropperDialogClose}
                        sx={{
                            position: 'absolute',
                            my: "auto",
                            right: 8,
                            top: 10,
                            color: "#55FCF1"
                        }}
                    >
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers sx={{ borderColor: '#45A29E' }} >
                    <Grid container rowSpacing={{ xs: 3 }} columnSpacing={{ xs: 3 }}>
                        <Grid item lg={9} xs={12} sx={{ height: "475px" }}>
                            <Paper>
                                <img ref={imgRef}
                                    alt="SelectedImage"
                                    src={"https://www.phoca.cz/images/projects/phoca-download-r.png"}
                                    style={{ width: "100%", height: "450px", display: "block" }} />
                            </Paper>
                        </Grid>
                        <Grid item lg={3} xs={12}>
                            <Paper sx={{ backgroundColor: "#18181b" }} elevation={0} >
                                <div ref={prevRef as LegacyRef<HTMLDivElement>}
                                    style={{
                                        width: "170px",
                                        height: "170px",
                                        overflow: "hidden",
                                        borderRadius: "7px",
                                    }}>
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus size="medium"
                        variant="contained"
                        style={{ backgroundColor: "#45A29E" }}
                        onClick={cropperDialogSave}
                    >
                        Save changes
                    </Button>
                </DialogActions>

            </Dialog >
        </>
    )
}
export default CropperDialog;