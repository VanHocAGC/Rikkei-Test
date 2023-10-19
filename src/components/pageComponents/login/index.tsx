import Title from 'components/common/Title';
import FlexCenter from 'components/common/center';
import { FastField, Form, Formik } from 'formik';
import InputField from 'components/common/InputField';
import { LoginSchema } from 'validation';
import Button from 'components/common/Button';
import { BiUser, BiLockAlt } from 'react-icons/bi';
import { FiAlertTriangle } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { login } from 'features/user/userSlide';
import Loading from 'components/common/Loading';
import { useNavigate } from 'react-router-dom';
export interface RegisterFormType {
  username: string;
  password: string;
}
export interface LoginProps {}

export default function Login(props: LoginProps) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user);
  const initialValues: RegisterFormType = {
    username: '',
    password: '',
  };
  const handleSubmit = (value: RegisterFormType) => {
    dispatch({
      type: login().type,
      payload: {
        value,
        navigate
      },
    });
  };
  return (
    <section className="p-4">
      {userInfo.loading && (
        <FlexCenter className='fixed w-full h-full bg-slate-400 opacity-50 top-0 left-0 z-40'>
          <Loading color='#BD252A' size={40}/>
        </FlexCenter>
      )} 
      <FlexCenter className="flex-col gap-y-3">
        <div className="mx-auto my-10 pb-6 rounded-lg border-2 border-primary p-1 w-2/4">
          <Title name="Login" />
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
            validateOnChange={false}
            validationSchema={LoginSchema}
          >
            {({ values, touched, errors }) => {
              return (
                <Form>
                  <div className="min-w-600">
                    <div className="bg-white py-8 px-4 gap-y-4 flex flex-col">
                      <FastField
                        component={InputField}
                        name="username"
                        title="Username"
                        placeholder="Username"
                        iconTitle={<BiUser size={25} />}
                      />
                      <FastField
                        component={InputField}
                        name="password"
                        title="Password"
                        placeholder="******"
                        type="password"
                        iconTitle={<BiLockAlt size={25} />}
                      />
                    </div>
                  </div>

                  {userInfo.error && (
                    <div className="flex mx-auto justify-center items-center gap-3">
                      <FiAlertTriangle className="text-primary" />
                      <p className="text-sm text-red-600 text-center py-1 font-semibold">
                        {userInfo.error}
                      </p>
                    </div>
                  )}
                  <Button title="Login" className="mx-auto" />
                </Form>
              );
            }}
          </Formik>
        </div>
      </FlexCenter>
    </section>
  );
}
