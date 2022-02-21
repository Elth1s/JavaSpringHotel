import {
    Grid,
    Slide,
    Button,
    Stack,
} from "@mui/material";

import { forwardRef, useEffect, useState } from "react"
import CropperDialog from "../../comon/CropperDialog/CropperDialog";

import http from "../../../http_comon"
import { CssTextField } from "../../comon/CssTextFiled";

const Home: React.FC = () => {
    const [name, setName] = useState<string>("")
    const [fileSelected, setFileSelected] = useState<string>("")

    useEffect(() => {

    }, []);

    const createRegion = () => {
        console.log(name, fileSelected);
        http.post("api/region/create", { name: name, base64: fileSelected })
            .then(response => {
            })
            .catch(err => {
                console.log(err)
            })
    }


    const onSave = (base64: string) => {
        setFileSelected(base64);
    };

    return (
        <>
            <Grid container sx={{ mt: 3 }} columnSpacing={{ xs: 3 }}>
                <Grid item xs={4}>
                    <CssTextField
                        fullWidth
                        type="text"
                        label="Name"
                        onChange={(e) => { setName(e.target.value) }}
                    />
                </Grid>
                <Grid item xs={8}>
                    <Stack direction="row" spacing={2}>
                        {fileSelected != ""
                            &&
                            <img
                                src={fileSelected}
                                alt="DefaultImage"
                                style={{ width: "160px", height: "160px", borderRadius: 7 }} />
                        }
                        <CropperDialog
                            onDialogSave={onSave}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={4} display="flex" justifyContent="end" >
                    <Button
                        sx={{ paddingX: "35px" }}
                        size="large"
                        type="submit"
                        variant="contained"
                        style={{ backgroundColor: "#45A29E" }}
                        onClick={createRegion}
                    >
                        Create
                    </Button>
                </Grid>
            </Grid>


        </>
    )
}

export default Home;