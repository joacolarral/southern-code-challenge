/* eslint-disable react/jsx-one-expression-per-line */
import { Card } from 'antd';
import Image from 'next/image';
import { string, number, shape } from 'prop-types';

export default function CardComponent(props) {
  const { imgUrl, metadata } = props;
  const { roverData, cameraData } = metadata;
  return (
    <div className="card-flex">
      <Card
        className="card-component"
        hoverable
        cover={<Image src={imgUrl} width={350} height={350} />}
      >
        <div className="card-container">
          <div className="card-metadata">
            <div className="rover-data">
              <h2>{roverData.name}</h2>
              <div className="metadata">
                <div>
                  <strong>Landing date:</strong> {roverData.landing_date}
                </div>
                <div>
                  <strong>Launch date:</strong> {roverData.launch_date}
                </div>
                <div>
                  <strong>Earth date:</strong> {metadata.earthDate}
                </div>
                <div>
                  <strong>Camera name:</strong> {cameraData.full_name}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

CardComponent.propTypes = {
  imgUrl: string.isRequired,
  metadata: shape({
    cameraData: {
      id: number.isRequired,
      name: string.isRequired,
      rover_id: number.isRequired,
      full_name: string.isRequired,
    },
    earthDate: string.isRequired,
    roverData: {
      id: number.isRequired,
      name: string.isRequired,
      landing_date: string.isRequired,
      launch_date: string.isRequired,
      status: string.isRequired,
    },
  }).isRequired,
};
