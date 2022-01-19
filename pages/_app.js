/* eslint-disable react/jsx-props-no-spreading */
import { shape, node } from 'prop-types';
import React from 'react';
import '../styles/index.scss';

function MyApp(props) {
  const { Component, pageProps } = props;
  return <Component {...pageProps} />;
}

MyApp.propTypes = {
  Component: node.isRequired,
  pageProps: shape({}).isRequired,
};

export default MyApp;
