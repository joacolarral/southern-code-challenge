import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Home from './home';

export default function home() {
  const router = useRouter();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (router.pathname === '/') return router.push('/');
  }, []);

  return <Home />;
}
