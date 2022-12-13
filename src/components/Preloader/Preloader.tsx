import React from 'react';
import {Spinner} from "react-bootstrap";

const Preloader = () => {
  return (
    <>
      <Spinner animation="border" variant="warning"/>
    </>
  );
};

export default Preloader;