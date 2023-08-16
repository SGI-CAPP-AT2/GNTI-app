import Loader from './Loader';
import React from 'react';
const LazyLoad = ({ element }) => {
  return <React.Suspense fallback={<Loader />}>{element}</React.Suspense>;
};
export default LazyLoad;
