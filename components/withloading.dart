// components/withLoading.js

import { useRouter } from 'next/router';
import Loading from './Loading';

const withLoading = (WrappedComponent) => {
  return () => {
    const router = useRouter();

    // Check if the page is loading
    if (router.isFallback) {
      return <Loading />;
    }

    // If not loading, render the wrapped component
    return <WrappedComponent />;
  };
};

export default withLoading;
