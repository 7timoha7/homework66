import React from 'react';
import {Spinner} from "react-bootstrap";

const Preloader = () => {
  return (
    <div>
      <Spinner animation="border" variant="warning"/>
    </div>
  );
};

export default Preloader;