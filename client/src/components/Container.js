import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const DContainer = (props) => {
  return (<Container {...props}/>);
};

export const DRow = (props) => {
  return (<Row {...props}/>);
};

export const DCol = (props) => {
  return (<Col {...props}/>);
};
