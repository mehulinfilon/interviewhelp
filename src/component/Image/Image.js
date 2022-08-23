import { useState } from "react";
import PropTypes from "prop-types";

function Image({ src, alt }) {
  const [isloaded, setIsLoaded] = useState(false);

  return isloaded ? (
    <img src={src} alt="" />
  ) : (
    <>
      <span>{alt.slice(0, 1)}</span>
      <img src={src} alt="" onLoad={() => setIsLoaded(true)} />
    </>
  );
}

Image.prototype = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

export default Image;
