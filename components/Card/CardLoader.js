/* eslint-disable react/jsx-one-expression-per-line */
import { Card, Skeleton } from 'antd';

export default function CardLoader() {
  return (
    <div className="card-flex">
      <Card className="card-component" hoverable>
        <div className="card-container">
          <Skeleton active />
          <Skeleton active />
        </div>
      </Card>
    </div>
  );
}

CardLoader.propTypes = {};
