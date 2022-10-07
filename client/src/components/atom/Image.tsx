interface ImageProps {
  src: string;
  alt: string;
}

function Image({ src, alt }: ImageProps) {
  return <img src={src} alt={alt} />;
}

export default Image;
