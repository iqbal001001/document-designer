import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Canvas from './Canvas';
import ControlProperties from './Properties';
import Header from "./Header";
import Tree from "./Tree";
import ImageUploader from 'react-images-uploading';
import 'bootstrap/dist/css/bootstrap.min.css';


import TreeMenu , { defaultChildren, ItemComponent } from 'react-simple-tree-menu';
import 'react-simple-tree-menu/dist/main.css';

import Template from '../Data/Template';
import Layout from '../Data/Layout';

import './../App.css';

export const ErrorStyle = styled.div`
    background: red;
    Display: flex;
`
export const Container = styled.div`
    display: flex;
    flex-direction: column;
`
export const HeaderStyle = styled.div`
    height: 50px;
    background: pink;
    Display: flex;

    .select{
        width:200px;
    }
`
export const SectionStyle = styled.div`
    display: flex;
    flex-direction: row;
`
export const DetailStyle = styled.div`
    height: 1000px;
    widht: 200px;
    Display: flex;
`

export const PropertiesStyle = styled.div`
    background: yellow;
    max-height:100%;
    overflow-y:auto;
`

const Error = ({children}) => {
    return (<ErrorStyle>{children}</ErrorStyle> );
}

const Section = ({children}) => {
    return (<SectionStyle>{children}</SectionStyle> );
}

const Detail = ({children}) => {
    return (<DetailStyle>{children}</DetailStyle> );
}

const Properties = ({children}) => {
    return (<PropertiesStyle>{children}</PropertiesStyle> );
}

const Designer = () => {
    //_.isEqual(one, two); // true

    const [isDirty, setIsDirty] = useState(false);
    const [isTemplateNew, setIsTemplateNew] = useState(false);
    const [isNewVersion, setIsNewVersion] = useState(false);
    const [version, setVersion] = useState(null);
    const [error, setError] = useState("");
    const [template, setTemplate] = useState({Id: -1, Layouts : [{Setting : { CellData : []}}]});
    const [templateName, setTemplateName] = useState("");
    const [layout, setLayout] = useState({Setting : { CellData : []}});
    const [items, setItems] = useState([]);
    const [treeData, setTreeData] = useState([]);
    const [treeOpenNodes, setTreeOpenNodes] = useState(['']);
    const [selectedShape, setSelectedShape] = useState(null);
    const [imageBase64, setImageBase64] = useState("");

    useEffect(() => {
        console.log(error);
    
     }, [error]);
 
    useEffect(() => {
       setImageBase64(template.Base64);
       setLayout(template.Layouts?.find(e => true)?? GetNewLayout());
       setTemplateName(template.Name);
       setIsTemplateNew((template.Id?? 0) === 0 ? true : false);
       handleIsDirty();
   
    }, [template]);

    useEffect(() => {
        setItems(applyLineGraphics(layout.Setting?.CellData?? []));
        setVersion(layout.Version);
     }, [layout]);

    useEffect(() => {
        setTreeData(convertToTreeDate(items));
        if (items.length == 0) setSelectedShape(null); 
        handleIsDirty();
     }, [items]);

    useEffect(() => {
        let indexOfFirst = (selectedShape?.NavigationKey?? "").indexOf('/');
        if (indexOfFirst < 0){
            setTreeOpenNodes(undefined);
        }else
        {
            let openNodes = selectedShape?.NavigationKey ?? undefined
            //  let openNodes = treeOpenNodes
             // openNodes.push(selectedShape.NavigationKey)
              setTreeOpenNodes(openNodes);
        }
     }, [selectedShape]);

     const handleIsDirty = () =>{

        //let isDirtyImage = !_.isEqual(template.Base64, imageBase64);

        let isDirtyLayout = !_.isEqual(template.Layouts?.find(e => true)?? GetNewLayout(), layout);
        let isDirtyItems = !_.isEqual(template.Layouts?.find(e => true)?.Setting?.CellData ?? [], items);

        setIsDirty((isDirtyLayout ||isDirtyItems)? true : false);

     }

     const handleCreateNewTemplate =() =>{
        let t = {
            Base64: "",
            Id: 0,
            Layouts: [],
            Name: "New Template"
        };
        setTemplate(t);
        console.log(t);
     }
     const GetNewLayout = () => {
         return {
            Id: 0,
            Setting: {CellData: [], Page: {}, RemPage: null, Type: null, Index: 0},
            TemplateId: 0,
            Version: 0
           };
     }

  const convertToTreeDate = (items) => {
      let nodes = [];
      
    items.map((cell) => {
        if (cell.SubData){
            let SubNodes = [];
            if (cell.SubData.SubData !== null && Array.isArray(cell.SubData.SubData)){
                SubNodes = GetTreeDataSub(cell.SubData.SubData);
            } 
            nodes.push(
                {
                    key : cell.Id,
                    label : cell.NodeName, 
                    nodes : [
                                {   
                                    key : cell.SubData.Id.toString(), 
                                    label : cell.SubData.NodeName,
                                    nodes : GetTreeDataSub(cell.SubData.SubData)
                                }
                        ]
                    })    
        }
        else
        {
           nodes.push({key : cell.Id.toString() , label : cell.NodeName, nodes : []})
        }
        console.log("nodes");
        console.log(nodes);
        
    });
    return nodes;
  }

  const GetTreeDataSub = (cell) =>
  {
    let nodes = [];
    (Array.isArray(cell)? cell : Object.values(cell))
    .map((cell) => {
            nodes.push({key : cell.Id.toString(), label : cell.NodeName, nodes : []})
        });
        return nodes;
  }

    const applyLineGraphics = (items) => {
        items.map((cell) => {
            cell.Stroke = "red";
            cell.StrokeWidth = 6;
            if (cell.SubData !== undefined && cell.SubData !== null) {
                cell.SubData.Stroke = "yellow";
                cell.SubData.StrokeWidth = 6;
                if (cell.SubData.SubData !== undefined && cell.SubData.SubData !== null) {
                    (Array.isArray(cell.SubData.SubData)?
                        cell.SubData.SubData : Object.values(cell.SubData.SubData))
                        .map((cell) => {
                            cell.Stroke = "green";
                            cell.StrokeWidth = 6; 
                        })
                }
            }
      })

      console.log("applyGraphics");
      console.log(items);
      return items
    }

    const handlePresistance = () => {
        if (template.Id > 0){
            let l = { ...layout};
            l.Setting.CellData = items;

            Layout.postData(l)
                .then(response => {
                    console.log(response);
                    let Id = response.data;
                    l.Id = Id;
                    setLayout(l);
                })
                .catch(err => {
                    if (err.response) {
                      setError("Failure "+ err.response.status);
                    } else if (err.request) {
                        setError("client never received a response, or request never left");
                    } else {
                      // anything else
                    }
                });
            }else{
                let t = { ...template};
                t.Base64 = imageBase64;
                t.Name = templateName;
                
                layout.Setting.CellData = items
                t.Layouts = [layout];
                Template.postData(t)
                .then(response => {
                    console.log(response);
                    let Id = response.data;
                     t.Id = Id;
                    setTemplate(t);
                })
                .catch(err => {
                    if (err.response) {
                      setError("Failure "+ err.response.status);
                    } else if (err.request) {
                        setError("client never received a response, or request never left");
                    } else {
                      // anything else
                    }
                });
            }
    }

      const handleSave = (prop, value) => {
        console.log("handleSave");
        console.log(selectedShape);

        const rects = items.slice();

        if (selectedShape === null || selectedShape === undefined) return; 

        const keys = selectedShape?.NavigationKey.split('/');
        let shapeItem = {};

        if (keys[0]){
              shapeItem = rects.find( ({ Id }) => Id === keys[0] * 1) ;
        }

        if (keys[1]){
            shapeItem = shapeItem.SubData ;

        }

        if (keys[2]){
              shapeItem = shapeItem.SubData.find( ({ Id }) => Id === keys[2] * 1) ;
        }

        updateProperty(shapeItem,prop,value); 

        setItems(rects);
    
       console.log("handleSave rnd " + shapeItem + " " + prop + " " + value);
      }
      
      const updateProperty = (item, prop, value) => {
        switch(prop) {
            case 'X1':
                item.Coordinate['X1'] = value * 1;
                item['X'] = value * 1;
                item['Width'] = Math.abs( item.Coordinate['X1'] * 1 - item.Coordinate['X2'] * 1);
                break;
            case 'X2':
                item.Coordinate['X2'] = value * 1;
                item['Width'] = Math.abs(item.Coordinate['X1'] * 1 - item.Coordinate['X2'] * 1);
              break;
            case 'Y1':
                item.Coordinate['Y1'] = value * 1;
                item['Y'] = value * 1;
                item['Height'] = Math.abs(item.Coordinate['Y1'] * 1 - item.Coordinate['Y2'] * 1);
                break;
            case 'Y2':
                item.Coordinate['Y2'] = value * 1;
                item['Height'] = Math.abs(item.Coordinate['Y1'] * 1 -  item.Coordinate['Y2'] * 1);
              break;
            case 'Width':
                item['Width'] = value * 1;
                item.Coordinate['X2'] = Math.abs(item.Coordinate['X1'] * 1 + item['Width'] * 1);
              break;
            case 'Height':
                item['Height'] = value * 1;
                item.Coordinate['Y2'] = Math.abs(item.Coordinate['Y1'] * 1 + item['Height'] * 1);
              break;
              case 'X':
                item['X'] = value * 1;
                item['X1'] = value * 1;
              break;
              case 'Y':
                item['Y'] = value * 1;
                item['Y1'] = value * 1;
              break;
            default:
                item[prop] = value;
          }
      }

      const handleFiles = (file) => {
        setImageBase64(file.base64);
      }

      const handleTreeViewClick = (key) => {
        console.log("TreeMenu click" + key);
        const rects = items.slice();

        const keys = key.split('/');
        let shapeItem = items;
        let item = {};

        if (keys[0]){
            shapeItem = rects.find( ({ Id }) => Id === keys[0] * 1) ;
        }

        if (keys[1]){
            shapeItem = shapeItem.SubData ;
        }

        if (keys[2]){
            shapeItem = shapeItem.SubData.find( ({ Id }) => Id === keys[2] * 1) ;
        }
       
        console.log(shapeItem);

        setSelectedShape(shapeItem);
      };

      const handleDeleteItemfromTree = (key) => {
        console.log("TreeMenu Delete click" + key);

        const keys = key.split('/');
        const levels = keys.length - 1;
        let shapeItems = items.slice();

        if (levels === 0){
             let index = shapeItems.findIndex( ({ Id }) => Id === keys[0] * 1) ;
             if (index > -1) {
                shapeItems.splice(index, 1);
              }   
        }

        if (levels === 1){
            let index = shapeItems.findIndex( ({ Id }) => Id === keys[0] * 1) ;
            if (index > -1) {
               shapeItems[index].SubData = null;;
             }     
       }

       if (levels === 2){
            let index1 = shapeItems.findIndex( ({ Id }) => Id === keys[0] * 1) ;
            if (index1 > -1) {
                let index2 = shapeItems[index1].SubData.SubData.findIndex( ({ Id }) => Id === keys[2] * 1) ;
                if (index1 > -1) {
                    shapeItems[index1].SubData.SubData.splice(index2, 1);
                }  
            }   
       }

       console.log(shapeItems);

        setItems(shapeItems); 
        setSelectedShape(null);    
       
      }

      const handleAddItemToTreeNode = () => {
        console.log("handleAddToTree");
        let newShape = null;

         const shapeItems = [...items];
        if (selectedShape === null || selectedShape === undefined){
            newShape = GetNewShape(0, 'red');
           
           shapeItems.push(newShape);
        }else{
            const keys = selectedShape?.NavigationKey?.split('/');
            if (keys === null || keys === undefined) return;
            const levels = keys.length - 1;
            if (levels === 1){
                let shapeItem = shapeItems.find( ({ Id }) => Id === keys[0] * 1) ;
                if (shapeItem && shapeItem.SubData.Id !== keys[1]) {
                    let sub = shapeItem.SubData;
                    newShape = GetNewShape(sub.Id, 'green', sub.NavigationKey);
                    newShape.Coordinate = {
                        X1:sub.Coordinate.X1,
                        X2:110,
                        Y1:sub.Coordinate.Y1,
                        Y2:sub.Coordinate.Y2
                    }
                    newShape.X = sub.Coordinate.X1;
                    newShape.Y = sub.Coordinate.Y1;
                    newShape.Height =
                     Math.abs(Math.abs(shapeItem.Coordinate.Y1) -  Math.abs(shapeItem.Coordinate.Y2));
                    sub.SubData.push(newShape);
                }  
            }
        }

        setItems(shapeItems);
       // if (newShape) setSelectedShape(newShape);
      }

      
      const handleAddContainerToTreeNode = () => {
        console.log("handleAddToTree");

        const shapeItems = [...items];
      
        const keys = selectedShape?.NavigationKey?.split('/');

        let shapeItem = shapeItems.find( ({ Id }) => Id === keys[0] * 1) ;
            if (shapeItem) {
                if (shapeItem.SubData === null || shapeItem.SubData === undefined){
                    let newShape = GetNewShape(
                        shapeItem.Id, 'yellow', shapeItem.NavigationKey, []);
                    newShape.Coordinate = {
                        X1:shapeItem.Coordinate.X1,
                        X2:shapeItem.Coordinate.X2,
                        Y1:shapeItem.Coordinate.Y1,
                        Y2:shapeItem.Coordinate.Y2,
                    }
                    newShape.X = Math.abs(shapeItem.Coordinate.X1);
                    newShape.Y = Math.abs(shapeItem.Coordinate.Y1);
                     newShape.Width =
                      Math.abs(Math.abs(shapeItem.Coordinate.X1) -  Math.abs(shapeItem.Coordinate.X2));
                     newShape.Height =
                     Math.abs(Math.abs(shapeItem.Coordinate.Y1) -  Math.abs(shapeItem.Coordinate.Y2));
                  shapeItem.SubData = newShape;
                }
            }  
    
        setItems(shapeItems);
      }

      const GetNewShape = (pId, stroke, pNavigationKey = null, pSubData = null) => {
          let id = getRandomInt(100,200);
          let navigationKey = "';"
          if (pNavigationKey !== null) {
              navigationKey = pNavigationKey + "/" + id;
          }else{
            navigationKey = id;
          }

       return  {
            Id: id,
            parentId: pId,
            // ImageData: null,
            // ImageSource: null,
             LastPageOnly: null,
           Alignment: "left",
            Coordinate: {
              X1:10,
              X2:110,
              Y1:10,
              Y2:110
            },
            DisplayText: null,
            Font: {Type: "arial", Size: "8", Formatting: "", Weight: null},
            Format: null,
            Height: 100,
            NavigationKey: navigationKey.toString(),
            rotateAngle: 0,
            NodeName:'New Shape',
            Stroke: stroke,
            StrokeWidth:5,
            SubData: pSubData,
            Text: {DisplayText: null, Prefix: null, Midfix: null, Postfix: null},
            Type: null,
            Width:100,
            X:10,
            Y:10
          }
      }
      
      function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const handleAddNewVersion = () => {

        let l = { ...layout};
        l.Id = 0;
        l.Version = l.Version + 1;
        setIsNewVersion(true);
        setLayout(l);
      };

      const handleOnLoad = (id) => {
        Template.getCurrentLayoutData(id)
        .then(response => {
            let template = response.data[0]
            let layouts = template.Layouts;

            let maxVersion = Math.max(...layouts.map(o => o.Version));
            let currentLayout = layouts.find( ({ Version }) => Version === maxVersion);

            template.Layouts = [currentLayout]
            setTemplate(template);
            console.log(template);
            setError("");
        })
        .catch(err => {
            if (err.response) {
              setError("Failure "+ err.response.status);
            } else if (err.request) {
                setError("client never received a response, or request never left");
            } else {
              // anything else
            }
        })
      }

     


  return (
    <React.Fragment> 
        <Container>
            <Error>{error}</Error>
            <Header templateName = {templateName} setTemplateName = {setTemplateName}
                    setError = {setError} 
                    setImageBase64 = {setImageBase64} 
                    setLayout = {setLayout}
                    version = {version} 
                    layout = {layout}
                    items = {items}
                    isTemplateNew = {isTemplateNew} isDirty = {isDirty} isNewVersion = {isNewVersion}
                    handleOnLoad ={handleOnLoad}
                    handleAddNewVersion= {handleAddNewVersion}
                    handleCreateNewTemplate = {handleCreateNewTemplate}
                    handlePresistance = {handlePresistance}/>
            <Section>
            <Detail>
                    <Tree treeData = {treeData}
                     selectedShape = {selectedShape}
                    treeOpenNodes = {treeOpenNodes} 
                    handleAddItemToTreeNode = {handleAddItemToTreeNode}
                    handleAddContainerToTreeNode = {handleAddContainerToTreeNode}
                    handleTreeViewClick = {handleTreeViewClick}
                    handleDeleteItemfromTree = {handleDeleteItemfromTree}>
                        
                      
                    </Tree>
                    <Properties>                   
                         <ControlProperties item = {selectedShape} onChange={handleSave}/>
                    </Properties>
                </Detail>
                <Canvas rectangles={items} setRectangles={setItems}
                    selectedShape = {selectedShape} setSelectedShape = {setSelectedShape}
                    imageBase64 = {imageBase64}/>
            </Section>
        </Container>
    </React.Fragment>
  );
};

export default Designer;
