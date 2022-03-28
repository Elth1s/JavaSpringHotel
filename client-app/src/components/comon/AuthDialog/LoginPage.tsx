import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Grid, IconButton, InputAdornment, Typography } from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../hooks/useActions";
import { CssTextField } from "../CssTextField";

import { ILoginModel } from "./types";
import { LoginSchema } from "./validation";


const RegisterPage = () => {
    const { LoginUser } = useActions();

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const loginModel: ILoginModel = { email: '', password: '' };

    const formik = useFormik({
        initialValues: loginModel,
        validationSchema: LoginSchema,
        onSubmit: async (values, { setFieldError }) => {
            console.log(values)
            try {
                await LoginUser(values);
                navigate("/");
            }
            catch (exeption: any) {
                let message = `Login failed! \n${exeption.data}`;
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
                            Log In
                        </LoadingButton>
                    </Grid>
                </Grid>

            </Form>
        </FormikProvider >
    )
}

export default RegisterPage;