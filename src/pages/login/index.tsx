import Loading from 'components/common/Loading';
import Login from 'components/pageComponents/login';
import React,{Suspense} from 'react';

export interface ILoginPageProps {
}

export default function LoginPage (props: ILoginPageProps) {
  return (
    <Suspense fallback={<Loading />}>
        <Login />
    </Suspense>
  );
}
