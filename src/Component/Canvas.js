import React, { useState, useEffect } from 'react';
import Rectangle from './Rectangle';
import { Stage, Layer, Rect, Text, Image} from 'react-konva';
import Konva from 'konva';
import styled from 'styled-components';
import UTIF from 'utif';

//const Tiff = require('tiff');

export const CanvasStyle = styled.div`
    background: green;
`

const Canvas = ({rectangles, setRectangles, selectedShape, setSelectedShape, imageBase64 }) => {
  const imageRef = React.useRef();

  const [image, selectImage] = useState(null);
  const [imageWidth, selectImageWidth] = useState(window.innerWidth);
  const [imageHeight, selectImageHeight] = useState(window.innerHeight);

  useEffect(() => {
    selectBackGroundImage(imageBase64);
  },[imageBase64]);

  const selectBackGroundImage =  async(imageBase64) => {
    if (imageBase64 !== "" &&  imageBase64 !== undefined ) {
      console.log("On Canvas")    
      if (imageBase64.includes("tiff")){
        try{
        let b = _base64ToArrayBuffer(imageBase64);
        const ifds = UTIF.decode(b);
        const firstPageOfTif = ifds[0];
        UTIF.decodeImage(b, ifds[0]);
        const rgba = UTIF.toRGBA8(firstPageOfTif);
  
        const imageWidth = firstPageOfTif.width;
        const imageHeight = firstPageOfTif.height;
  
        const cnv = document.createElement('canvas');
        cnv.width = imageWidth;
        cnv.height = imageHeight;
  
        const ctx = cnv.getContext('2d');
        const imageData = ctx.createImageData(imageWidth, imageHeight);
        for (let i = 0; i < rgba.length; i++) {
          imageData.data[i] = rgba[i];
        }
        ctx.putImageData(imageData, 0, 0);

        selectImage(cnv);
        selectImageWidth(imageWidth);
        selectImageHeight(imageHeight);

     
      }catch(err){
          console.log(err)
        }
        //var tiff = new Tiff({ buffer: convertDataURIToBinary(imageBase64) }); 
        //var imageBase64 = await tiff.getImage().toDataURL();
      }else{
        var img = new window.Image();
        img.onload = function(){
          console.log("onload");
          console.log(img.width + ' img ' + img.height) 
           selectImageWidth(img.width);
           selectImageHeight(img.height);
           selectImage(img);
        }
        img.onerror = function(e){
          console.log("error");
        }
        img.src = imageBase64;
      }
      }else{
        selectImageWidth(window.innerWidth);
        selectImageHeight(window.innerHeight);
        selectImage(null);
      }
     }

     const BASE64_MARKER = ';base64,';

function convertDataURIToBinary(dataURI) {
  var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  var base64 = dataURI.substring(base64Index);
  var raw = window.atob(base64);
  var rawLength = raw.length;
  var array = new ArrayBuffer(rawLength)
  var arrayU = new Uint8Array(array);

  for(var i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
}

function _base64ToArrayBuffer(dataURI) {
  var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  var base64 = dataURI.substring(base64Index);
  return Uint8Array.from(atob(base64), c => c.charCodeAt(0));
}

  const checkDeselect = e => {
    // deselect when clicked on empty area
    console.log(e.target + " ===" + imageRef.current)
    const clickedOnEmpty = e.target === imageRef.current;
    if (clickedOnEmpty) {
      setSelectedShape(null);
    }
  };

 const GetAllShapes = (cells) => {

  let Shapes = [];
  console.log('GetAllShapes');
  //console.log(cells);
  //cells.length !==0  && Shapes.push(GetRectangle(cells[6]));
    cells.map((cell) => {
      Shapes.push(GetRectangle(cell));
      if (cell.SubData !== null && cell.SubData !== undefined){
        Shapes.push(GetRectangle(cell.SubData));
        (Array.isArray(cell.SubData.SubData)?
          cell.SubData.SubData : Object.values(cell.SubData.SubData))
                        .map((subCell) => {
                            Shapes.push(GetRectangle(subCell));
                          });
      }
    });
  return Shapes;
 }

  const GetRectangle = (rect) =>{
    console.log('selectedShape');
    console.log(selectedShape);
    return rect !== undefined && (
      <Rectangle
        key={rect.Id}
        shapeProps={rect}
        
        isSelected={rect.Id === selectedShape?.Id}
        onSelect={() => {
          console.log("rect");
          console.log(rect);
          setSelectedShape(rect);
  
        }}
        onChange={newAttrs => {
          newAttrs.Coordinate = {
            X1:newAttrs.X * 1,
            Y1:newAttrs.Y * 1,
            X2:newAttrs.X * 1 + newAttrs.Width * 1,
            Y2:newAttrs.Y * 1 + newAttrs.Height * 1
          
          } 
          
          const rects = rectangles.slice();

          const keys = rect.NavigationKey.split('/');
          const levels = keys.length - 1;

          if (levels === 0){
            let index = rects.findIndex( ({ Id }) => Id === keys[0] * 1) ;
            if (index > -1) {
              rects[index]  = newAttrs;
               
             }   
            }

            if (levels === 1){
                let index = rects.findIndex( ({ Id }) => Id === keys[0] * 1) ;
                if (index > -1) {
                  rects[index].SubData = newAttrs;;
                  }     
            }

            if (levels === 2){
                let index1 = rects.findIndex( ({ Id }) => Id === keys[0] * 1) ;
                if (index1 > -1) {
                    let index2 = rects[index1].SubData.SubData.findIndex( ({ Id }) => Id === keys[2] * 1) ;
                    if (index1 > -1) {
                      rects[index1].SubData.SubData[index2] = newAttrs;
                    }  
                }   
            }


          // rects[index] = newAttrs;
          //console.log("newAttrs" + index);
          
          console.log("Canvas onChange");
          console.log(newAttrs.X + " " +  newAttrs.Y + " " + newAttrs.Width + " " + newAttrs.Height);
    
          console.log(newAttrs);
          setRectangles(rects);
          setSelectedShape(newAttrs);
        }
        }
      />
    );
  }

  return (
    <CanvasStyle>
    <Stage
    width={imageWidth/2} 
    height={imageHeight/2} 
    scaleX={0.5} 
    scaleY={0.5}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
    >
      <Layer>
      <Image image={image} ref={imageRef}
        width={imageWidth} height={imageHeight}
        stroke= {'red'} strokeWidth ={10}
         x={0} y={0} />

      {rectangles && 
        GetAllShapes(rectangles)
      }     
      </Layer>
    </Stage>
    </CanvasStyle>
  );
};

export default Canvas;
