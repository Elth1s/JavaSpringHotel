import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Grid, IconButton, InputAdornment, Typography } from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../hooks/useActions";
import { CssTextField } from "../CssTextField";

import { IRegisterModel } from "./types";
import { RegisterSchema } from "./validation";


const RegisterPage = () => {
    const { RegisterUser } = useActions();

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const registerModel: IRegisterModel = { fullname: '', email: '', password: '' };

    const formik = useFormik({
        initialValues: registerModel,
        validationSchema: RegisterSchema,
        onSubmit: async (values) => {
            console.log(values)
            try {
                await RegisterUser(values);
                navigate("/");
            }
            catch (exeption: any) {
                let message = `Register failed! \n${exeption.data}`;
                toast.error(message);
            }

        }
    });


    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    };



    const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;
    return (
        <FormikProvider value={formik} >
            <Form autoComplete="off" noValidate onSubmit={handleSubmit} >

                <Grid container rowSpacing={4}>
                    <Grid item xs={12}>
                        <CssTextField
                            fullWidth
                            autoComplete="fullname"
                            type="text"
                            label="Full name"
                            {...getFieldProps('fullname')}
                            error={Boolean(touched.fullname && errors.fullname)}
                            helperText={touched.fullname && errors.fullname}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CssTextField
                            fullWidth
                            autoComplete="email"
                            type="email"
                            label="Email address"
                            {...getFieldProps('email')}
                            error={Boolean(touched.email && errors.email)}
                            helperText={touched.email && errors.email}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <CssTextField
                            fullWidth
                            autoComplete="password"
                            type={showPassword ? 'text' : 'password'}
                            label="Password"
                            {...getFieldProps('password')}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleShowPassword} edge="end">
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            error={Boolean(touched.password && errors.password)}
                            helperText={touched.password && errors.password}
                        />
                    </Grid>

                    <Grid item xs={12} mt={3} display="flex" justifyContent="center" >
                        <LoadingButton
                            sx={{ paddingX: "35px" }}
                            size="large"
                            type="submit"
                            variant="contained"
                            loading={isSubmitting}
                            style={{ backgroundColor: "#45A29E" }}
                        >
                            Sign Up
                        </LoadingButton>
                    </Grid>
                </Grid>

            </Form>
        </FormikProvider >
    )
}

export default RegisterPage;