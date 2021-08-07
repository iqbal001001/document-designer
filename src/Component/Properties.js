import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

import './../App.css';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const ControlProperties = ({item, onChange}) => {

  const GroupCoordinate = (prop, label, placeholder = "") => {
    let value = item && item.Coordinate && item.Coordinate[prop];
        if (placeholder === "") placeholder = label;
        return(
            
            <Form.Group as={Row} controlId={prop}>
                {console.log("Coordinates")}
                {console.log(item )}
              <Form.Label column="sm" lg={2} >
              {label}
              </Form.Label>
              <Col sm={10}>
                <Form.Control size="sm" type="Text" 
                placeholder={placeholder} 
                value={value?? ''}
                onChange={(e) => onChange(prop, e.target.value)} />
              </Col>
            </Form.Group>
            );
}

const GroupFont = (prop, label, placeholder = "") => {
  let value = item && item.Font && item.Font[prop];
  // item?.font === undefined ? "" : item.font[prop];
  if (placeholder === "") placeholder = label;
      return(
          <Form.Group as={Row} controlId={prop}>
            <Form.Label column="sm" lg={2} >
            {label}
            </Form.Label>
            <Col sm={10}>
              <Form.Control size="sm" type="Text" 
              placeholder={placeholder} 
              value={value?? ''}
              onChange={(e) => onChange(prop, e.target.value)} />
            </Col>
          </Form.Group>
          );
}

    const Group = (prop, label, placeholder = "") => {
      let value = item && item[prop];
        if (placeholder === "") placeholder = label;
            return(
                <Form.Group as={Row} controlId={prop}>
                  <Form.Label column="sm" lg={2} >
                  {label}
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control size="sm" type="Text" 
                    placeholder={placeholder} 
                    value={value?? ''}
                    onChange={(e) => onChange(prop, e.target.value)} />
                  </Col>
                </Form.Group>
                );
    }

  return (
        
            <Form>
                <Container>
       
                    {Group("Id", "ID")}
                    {Group("ParentId", "Parent ID")}
                    {Group("DisplayText", "Diplay Text")}

                    {GroupCoordinate("X1", "X1","X1 Coordinate")}
                    {GroupCoordinate("Y1", "Y1","Y1 Coordinate")}
                    {GroupCoordinate("X2", "X2","X2 Coordinate")}
                    {GroupCoordinate("Y2", "Y2","Y2 Coordinate")}
                    
                    {GroupFont("Type", "Font Type")}
                    {GroupFont("Size", "Font Size")}

                    {Group("Width", "Width")}
                    {Group("Height", "Height")}
                    {Group("X", "X")}
                    {Group("Y", "Y")}
                    
                    {Group("NodeName", "Title")}
                    {Group("Alignment", "Alignment")}
                    {Group("RotateAngle", "RotateAngle")}
                </Container>
            </Form>
       
  );
};

export default ControlProperties;