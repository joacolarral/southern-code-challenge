import Image from 'next/image';

export default function Card() {
  const { imgUrl, metadata } = props;
  const { title } = metadata;
  return (
    <div className="card-container">
      <div className="card-image">
        <Image />
      </div>
      <div className="card-metadata"></div>
    </div>
  );
}
