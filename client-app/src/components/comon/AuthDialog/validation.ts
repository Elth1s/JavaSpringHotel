import * as Yup from 'yup';
const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/

export const RegisterSchema = Yup.object().shape({
    fullname: Yup.string().min(3).max(75).required('Full name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().matches(passwordRegExp, 'Password is not valid').required('Password is required'),
});

export const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().matches(passwordRegExp, 'Password is not valid').required('Password is required'),
});