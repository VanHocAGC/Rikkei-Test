import Loading from 'components/common/Loading';
import Home from 'components/pageComponents/home';
import { Suspense } from 'react';
export interface  HomePageProps {
}

export default function HomePage (props:  HomePageProps) {
  return (
    <Suspense fallback={<Loading />}>
        <Home />
    </Suspense>
  );
}
