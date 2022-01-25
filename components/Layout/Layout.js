import Layout from 'antd/lib/layout/layout';
import Head from 'next/head';
import { node } from 'prop-types';
import Navbar from '../Navbar/Navbar';

export default function LayoutComponent(props) {
  const { children } = props;
  return (
    <>
      <Head>
        <title>Data Mars</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout className="layout">
        <Navbar />
        {children}
      </Layout>
    </>
  );
}

LayoutComponent.propTypes = {
  children: node.isRequired,
};
