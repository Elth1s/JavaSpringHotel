import {
    Grid,
    Box,
    Button,
    Stack,
    TableContainer,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TableHead,
    Paper,
    Avatar,
    IconButton,
    TableFooter,
    TablePagination
} from "@mui/material";
import { useEffect, useState } from "react";

import CropperDialog from "../../comon/CropperDialog/CropperDialog";
import http from "../../../http_comon"
import { baseURL } from "../../../http_comon"
import { CssTextField } from "../../comon/CssTextFiled";
import { useNavigate, useParams } from "react-router-dom";
import { Add, ArrowBackIosNew, ArrowForwardIos, Clear, RemoveRedEyeOutlined } from "@mui/icons-material";
import TablePaginationActions from "../../comon/TablePaginationActions";

interface IHotelImage {
    id: number,
    name: string
}
interface IHotel {
    name: string,
    description: string,
    images: Array<IHotelImage>
}

const UpdateHotel: React.FC = () => {
    const [hotel, setHotel] = useState<IHotel>({ name: "", description: "", images: [] });
    const [uploadImages, setUploadImages] = useState<Array<string>>([]);
    const [filesForDelete, setFilesForDelete] = useState<Array<string>>([]);

    let { id } = useParams() as any;

    const [tablePage, setTablePage] = useState<number>(0);
    const [tableRowsPerPage, setTableRowsPerPage] = useState<number>(5);

    const [savedFiles, setSavedFiles] = useState<Array<string>>([]);

    const navigate = useNavigate();

    useEffect(() => {
        http.get<IHotel>(`api/hotel/get-by-id/${id}`)
            .then(response => {
                console.log(response)
                setHotel(response.data);
            })
            .catch(err => {
                navigate("/");
            })
    }, []);

    const onSave = async (base64: string) => {
        const response = await http.post<string>("upload", { base64: base64 });
        setUploadImages([...uploadImages, response.data]);
    };

    const updateHotel = async () => {
        http.post(`api/hotel/update/${id}`, { name: hotel.name, description: hotel.description, uploadImages: uploadImages, deleteImages: filesForDelete })
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const dataImages = uploadImages.map((item, key) => {
        return (
            <Grid item xs={2} key={key}>
                <img src={baseURL + item} style={{ borderRadius: 7, width: "160px", height: "160px" }} />
            </Grid>
        )
    })

    const handleChangeTablePage = (event: any, newPage: number) => {
        setTablePage(newPage)
    };
    const handleChangeTableRowsPerPage = (event: any) => {
        setTableRowsPerPage(parseInt(event.target.value, 10))
        setTablePage(0)
    };


    const addOrDeleteFile = (name: string) => {
        if (filesForDelete != null) {
            const indexForDelete = filesForDelete.findIndex(elem => elem === name);
            const indexForSave = savedFiles.findIndex(elem => elem === name);
            const tmpListForDelete = filesForDelete.slice();
            const tmpListForSave = savedFiles.slice();
            if (indexForDelete === -1) {
                tmpListForDelete.push(name)
                tmpListForSave.splice(indexForSave, 1);
            }
            else {
                tmpListForSave.push(name)
                tmpListForDelete.splice(indexForDelete, 1);
            }

            setFilesForDelete(tmpListForDelete);
            setSavedFiles(tmpListForSave);
        }
        else {
            const indexForSave = savedFiles.findIndex(elem => elem === name);
            const tmpListForDelete = [] as Array<string>;
            const tmpListForSave = savedFiles.slice();
            tmpListForDelete.push(name)
            tmpListForSave.splice(indexForSave, 1);
            setFilesForDelete(tmpListForDelete);
            setSavedFiles(tmpListForSave);
        }
    }
    const isImageDeleted = (name: string) => {
        if (filesForDelete != null) {
            const index = filesForDelete.findIndex(elem => elem == name);
            if (index === -1)
                return false
            else
                return true
        }
    }

    return (
        <>
            <Box sx={{ mt: 3 }}>
                <Stack direction="row" >
                    <Grid container sx={{ width: "40%", display: "inline-block", mr: "2%" }} rowSpacing={{ xs: 3 }} >
                        <Grid item xs={12}>
                            <CssTextField
                                fullWidth
                                type="text"
                                label="Name"
                                value={hotel.name}
                                onChange={(e) => {
                                    let data: IHotel = {
                                        ...hotel,
                                        name: e.target.value.toString(),
                                    };
                                    setHotel(data);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CssTextField
                                fullWidth
                                type="text"
                                label="Description"
                                value={hotel.description}
                                onChange={(e) => {
                                    let data: IHotel = {
                                        ...hotel,
                                        description: e.target.value.toString(),
                                    };
                                    setHotel(data);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TableContainer component={Paper} sx={{ border: "1px solid #55FCF1", borderRadius: '7px' }}>
                                <Table aria-label="custom pagination table">
                                    <TableHead>
                                        <TableRow >
                                            <TableCell component="th" scope="row" sx={{ width: 70 }} align="center" >
                                                №
                                            </TableCell>
                                            <TableCell sx={{ width: 70 }}>
                                                Image
                                            </TableCell>
                                            <TableCell align="right">
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(tableRowsPerPage > 0
                                            ? hotel.images.slice(tablePage * tableRowsPerPage, tablePage * tableRowsPerPage + tableRowsPerPage)
                                            : hotel.images
                                        ).map((row, index) => (
                                            <TableRow key={row.id}>
                                                <TableCell component="th" scope="row" sx={{ width: 70 }} align="center" >
                                                    {row.id}.
                                                </TableCell>
                                                <TableCell sx={{ width: 70 }}>
                                                    <Avatar
                                                        src={baseURL + row.name}
                                                        alt="Image"
                                                    />
                                                </TableCell>
                                                <TableCell align="right">
                                                    {isImageDeleted(row.name)
                                                        ? <IconButton aria-label="delete" sx={{ color: "#388e3c" }} onClick={() => addOrDeleteFile(row.name)}>
                                                            <Add />
                                                        </IconButton>
                                                        : <IconButton sx={{ color: "#d32f2f" }} onClick={() => { addOrDeleteFile(row.name) }}>
                                                            <Clear />
                                                        </IconButton>}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TablePagination sx={{ border: 0, color: "#55FCF1" }}
                                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                                colSpan={3}
                                                count={hotel.images.length}
                                                rowsPerPage={tableRowsPerPage}
                                                page={tablePage}
                                                SelectProps={{
                                                    inputProps: {
                                                        'aria-label': 'rows per page',
                                                    },
                                                    native: true,
                                                }}
                                                onPageChange={handleChangeTablePage}
                                                onRowsPerPageChange={handleChangeTableRowsPerPage}
                                                ActionsComponent={TablePaginationActions}
                                            />
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                sx={{ paddingX: "35px" }}
                                size="large"
                                type="submit"
                                variant="contained"
                                style={{ backgroundColor: "#45A29E" }}
                                onClick={updateHotel}
                            >
                                Update
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container sx={{ width: "55%" }} columnSpacing={3}>
                        {dataImages}
                        <Grid item xs={2} >
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

export default UpdateHotel;