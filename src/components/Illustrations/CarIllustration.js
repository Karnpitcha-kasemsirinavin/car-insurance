import React from 'react';
import imgcar2 from "../../assets/img-car2.svg";

function CarIllustration({ src = imgcar2 , width }) { // Use destructuring to accept src prop
  return (
    <img src={src} alt="Car Illustration" className="car-illustration" style={width={width}} />
  );
}

export default CarIllustration;
