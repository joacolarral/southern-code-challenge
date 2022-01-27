/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
import { Empty } from 'antd';
import { shape, arrayOf, bool, func } from 'prop-types';
import CardComponent from '../Card/Card';
import CardLoader from '../Card/CardLoader';

export default function PhotoGrid(props) {
  const { photosData, loading, reachBottom, hasMore } = props;

  return (
    <div className="photogrid-container">
      {photosData.length ? (
        <>
          {photosData.map((photo) => (
            <CardComponent
              key={photo.id}
              imgUrl={photo.img_src}
              metadata={{
                roverData: photo.rover,
                earthDate: photo.earth_date,
                cameraData: photo.camera,
              }}
            />
          ))}
          {hasMore && <div ref={reachBottom}>{loading && <CardLoader />}</div>}
        </>
      ) : (
        <div className="empty-state">
          <Empty />
        </div>
      )}
    </div>
  );
}

PhotoGrid.propTypes = {
  photosData: arrayOf(shape({})),
  loading: bool,
  reachBottom: func.isRequired,
  hasMore: bool.isRequired,
};

PhotoGrid.defaultProps = {
  photosData: [],
  loading: true,
};
