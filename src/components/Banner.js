/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import '../assets/Banner.css';
import logo from '../assets/logo.jpeg';

function Banner() {
  return (
    <div className="Banner">
      <img src={logo} className="bannerLogo" alt="d" />
    </div>
  );
}

export default Banner;
