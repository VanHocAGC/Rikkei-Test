import * as Yup from 'yup';
export const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(6, 'Username must be more than 6 characters')
    .required('Please enter your username!'),
  password: Yup.string()
    .min(6, 'Password must be more than 6 characters')
    .required('Please enter a password!'),
});
