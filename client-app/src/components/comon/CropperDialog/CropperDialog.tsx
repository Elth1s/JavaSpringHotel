import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { LegacyRef } from "react";
interface ICropperDialog {
    isDialogOpen: boolean,
    Transition: any,
    modalClose: any,
    imgRef: LegacyRef<HTMLImageElement>,
    image: string,
    modalSave: any
}
const CropperDialog: React.FC<ICropperDialog> = ({ isDialogOpen, Transition, modalClose, imgRef, image, modalSave }) => {
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
            <DialogContent dividers sx={{ borderColor: '#45A29E' }}>

                <Box sx={{ height: "500px" }}>
                    <img ref={imgRef}
                        alt="SelectedImage"
                        src={image}
                        style={{ width: "100%", display: "block" }} />
                </Box>

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