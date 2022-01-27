/* eslint-disable react/jsx-props-no-spreading */
import { func, shape } from 'prop-types';
import React from 'react';
import '../styles/index.scss';

function MyApp(props) {
  const { Component, pageProps } = props;
  return <Component {...pageProps} />;
}

MyApp.propTypes = {
  Component: func.isRequired,
  pageProps: shape({}).isRequired,
};

export default MyApp;
