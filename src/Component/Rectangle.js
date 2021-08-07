import React from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Rect, Transformer } from 'react-konva';

const Rectangle = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
        console.log("isSelected");
      // we need to attach transformer manually
      //trRef.current.setNode(shapeRef.current);
      trRef.current.setNodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Rect
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={e => {
          console.log("onChange 1" +  e.target.x() + " " +  e.target.y() + " " + e.target.width() + " " + e.target.height());
           onChange({
            ...shapeProps,
            X: Math.abs( Math.floor(e.target.x())),
            Y: Math.abs( Math.floor(e.target.y())),
            Width: Math.abs(Math.floor(e.target.width())),
            Height: Math.abs(Math.floor(e.target.height())),
            rotation: e.target.rotation()
          }); 
          console.log("onChange 2" +  Math.abs( Math.floor(e.target.x())) + " " +  Math.abs( Math.floor(e.target.y()))+ " " + e.target.width() + " " + e.target.height());
        }} 
        onTransformEnd={e => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          console.log("transform");
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
           onChange({
            ...shapeProps,
            X: Math.abs(Math.floor(node.x())),
            Y: Math.abs(Math.floor(node.y())),
            // set minimal value
            Width: Math.floor(Math.max(5, node.width() * scaleX)),
            Height: Math.floor(Math.max(node.height() * scaleY)),
            rotation: node.rotation()
          }); 
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.Width < 5 || newBox.Height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

export default Rectangle;


