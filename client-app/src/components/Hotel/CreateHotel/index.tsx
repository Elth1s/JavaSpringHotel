import {
    Grid,
    Box,
    Button,
    Stack
} from "@mui/material";
import { useState } from "react";

import CropperDialog from "../../comon/CropperDialog/CropperDialog";
import http from "../../../http_comon"
import { baseURL } from "../../../http_comon"
import { CssTextField } from "../../comon/CssTextFiled";

const CreateHotel: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const [images, setImages] = useState<Array<string>>([]);

    const onSave = async (base64: string) => {
        const response = await http.post<string>("upload", { base64: base64 });
        setImages([...images, response.data]);
    };

    const createHotel = async () => {
        http.post("api/hotel/create", { name: name, description: description, images: images })
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const dataImages = images.map((item, key) => {
        return (
            <Grid item xs={2} key={key}>
                <img width="100%" src={baseURL + item} style={{ borderRadius: 7 }} />
            </Grid>
        )
    })

    return (
        <>
            <Box sx={{ mt: 3 }}>
                <Stack direction="row" >
                    <Grid container sx={{ width: "30%", display: "inline-block", mr: "2%" }} rowSpacing={{ xs: 2 }} >
                        <Grid item xs={12}>
                            <CssTextField
                                fullWidth
                                type="text"
                                label="Name"
                                onChange={(e) => { setName(e.target.value) }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CssTextField
                                fullWidth
                                type="text"
                                label="Description"
                                onChange={(e) => { setDescription(e.target.value) }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                sx={{ paddingX: "35px" }}
                                size="large"
                                type="submit"
                                variant="contained"
                                style={{ backgroundColor: "#45A29E" }}
                                onClick={createHotel}
                            >
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container sx={{ width: "68%" }} rowSpacing={{ xs: 2 }} columnSpacing={{ xs: 2 }}>
                        {dataImages}
                        <Grid item xs={2}>
                            <CropperDialog
                                aspectRation={1 / 1}
                                onDialogSave={onSave}
                            />
                        </Grid>
                    </Grid>
                </Stack>
            </Box>

        </>
    )
}

export default CreateHotel;