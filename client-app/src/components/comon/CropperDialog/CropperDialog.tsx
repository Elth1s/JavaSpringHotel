import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Paper
} from "@mui/material";
import { Close } from "@mui/icons-material";

import { LegacyRef, MutableRefObject } from "react";

interface ICropperDialog {
    isDialogOpen: boolean,
    Transition: any,
    modalClose: any,
    imgRef: LegacyRef<HTMLImageElement>,
    preview: MutableRefObject<HTMLDivElement | undefined>,
    image: string,
    modalSave: any,
}
const CropperDialog: React.FC<ICropperDialog> = ({ isDialogOpen, Transition, modalClose, imgRef, image, modalSave, preview }) => {
    return (
        <Dialog
            open={isDialogOpen}
            TransitionComponent={Transition}
            maxWidth="lg"
            keepMounted
            onClose={modalClose}
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
                    onClick={modalClose}
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
                                src={image}
                                style={{ width: "100%", height: "450px", display: "block" }} />
                        </Paper>
                    </Grid>
                    <Grid item lg={3} xs={12}>
                        <Paper sx={{ backgroundColor: "#18181b" }} elevation={0} >
                            <div ref={preview as LegacyRef<HTMLDivElement>}
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
                    onClick={modalSave}>
                    Save changes
                </Button>
            </DialogActions>

        </Dialog >
    )
}
export default CropperDialog;