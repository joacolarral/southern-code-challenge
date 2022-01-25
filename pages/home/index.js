/* eslint-disable no-use-before-define */
/* eslint-disable comma-dangle */
/* eslint-disable consistent-return */
import { Layout } from 'antd';
import Banner from './components/Banner';
import FooterComponent from '../../components/Footer';
import LayoutComponent from '../../components/Layout/Layout';

const { Content } = Layout;

export default function Home() {
  return (
    <LayoutComponent>
      <Banner />
      <Content style={{ padding: '0 50px' }}>
        <div>Hello World</div>
      </Content>
      <FooterComponent />
    </LayoutComponent>
  );
}
