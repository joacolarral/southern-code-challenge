/* eslint-disable no-use-before-define */
/* eslint-disable comma-dangle */
/* eslint-disable consistent-return */
import { Layout, Card, Row, Col } from 'antd';
import Image from 'next/image';
import Banner from '../components/Banner/Banner';
import FooterComponent from '../components/Footer';
import LayoutComponent from '../components/Layout/Layout';
import curiosityImg from '../assets/img/curiosity.jpeg';
import opportunityImg from '../assets/img/opportunity.jpeg';
import spiritImg from '../assets/img/spirit.jpeg';
import Link from 'next/link';

const { Content } = Layout;
const { Meta } = Card;
const rovers = [
  {
    name: 'Curiosity',
    imgUrl: curiosityImg,
  },
  {
    name: 'Opportunity',
    imgUrl: opportunityImg,
  },
  {
    name: 'Spirit',
    imgUrl: spiritImg,
  },
];

export default function Home() {
  return (
    <LayoutComponent>
      <Banner />
      <Content className="home-container">
        <Row gutter={24} className="title" justify="center">
          <Col>
            <h2>Choose the rover to see the photo album</h2>
          </Col>
        </Row>
        <Row gutter={24} justify="center">
          {rovers.map((rover) => (
            <Col key={rover.name} span={6} className="cards-home">
              <Link href={`/rovers/${rover.name.toLowerCase()}`}>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={<Image src={rover.imgUrl} width={350} height={350} />}
                >
                  <Meta title={rover.name} />
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Content>
      <FooterComponent />
    </LayoutComponent>
  );
}
