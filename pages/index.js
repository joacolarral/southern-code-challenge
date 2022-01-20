import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function home() {
  const router = useRouter();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (router.pathname === '/') return router.push('/home');
  }, []);
}
