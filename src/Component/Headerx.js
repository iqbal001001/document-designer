import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AwesomeButton } from "react-awesome-button";
import Modal from "./Model";
import ReactFileReader from 'react-file-reader';
import FileSaver from 'file-saver';
import X2JS from 'x2js';
import Template from '../Data/Template';
import Layout from '../Data/Layout';
import _ from 'lodash';

export const ScrollerStyle = styled.div`
    margin: 0 auto;
    height: 300px;
    width: 500px;
    overflow: auto;

    .item {
        margin: 30px 0;
        Display: flex;
        justify-content: flex-start;

        img {

        }

        .name {

        }

        .button{

        }
    }
`
const Scroller = ({children}) => {
    return (<ScrollerStyle>{children}</ScrollerStyle> );
}

export const HeaderStyle = styled.div`
    height: 50px;
    background: pink;
    Display: flex;

    .select{
        width:200px;
    }
`
 
const Header = ({templateName, setTemplateName,
                 setError, setImageBase64, setLayout,
                  version, layout, items,
                isTemplateNew, isDirty, isNewVersion,
                handleOnLoad, handleAddNewVersion, handleCreateNewTemplate,handlePresistance
                }) => {

    const [templates, setTemplates] =  useState([]);  
    const [uploadLayout, setUploadLayout] = useState([]);
    const [name, setName] =  useState(templateName);    
    const [attrs, setAttrs] = useState([]);         
    const modalRef = React.useRef();

    const openModal = () => {
        modalRef.current.openModal()
        GetAllTemplate();
    };

    const closeModal = () => {
        modalRef.current.close()
    };

    useEffect(() => {
        setTemplateName(name);
     }, [name]);

     useEffect(() => {
        setLayout(uploadLayout);
     }, [uploadLayout]);

     useEffect(() => {
        console.log(attrs);
     }, [attrs]);

    const GetAllTemplate = () => {
        Template.getDataList()
        .then(response => {
            let templates = response.data

            setTemplates(templates);
            console.log(templates);
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

      const BASE64_MARKER = ';base64,';

      const handleUploadTemplate = (file) => {
        var base64Index = file.base64.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
        var base64 = file.base64.substring(base64Index);
          let x = file.base64;
        var decodedString = atob(base64);
        console.log(decodedString);
        var x2js = new X2JS({
            attributePrefix : "$"
        });
        var jsonObj = x2js.xml2js( decodedString );
        console.log(jsonObj);

        let newObj = objectKeysToFirstCapital(jsonObj);

        console.log(attrs);

        let newItems = applyAttribute(newObj?.Settings?.CellData?? []);
        newObj.Settings.CellData = newItems;

        let l = {
            Setting : { 
                CellData : newItems,
                Page : newObj.Settings.Page,
            },
            Version : 0
        };
        console.log(l);

        setUploadLayout(l);
      }

      const applyAttribute = (items) => {
        
     let id = 1;
 let newItem =  Object.values(items).map((cell) => {
    cell.Id = id++;
    cell.ParentId = 0;
    cell.Stroke = "red";
    cell.StrokeWidth = 6;
    cell.NavigationKey = cell.Id.toString();
    ApplyCoordinate(cell);
    if (cell.SubData !== undefined && cell.SubData !== null && (!_.isEmpty(cell.SubData))) {
        let SubData = cell.SubData;
        SubData.Id = id++;
        SubData.ParentId = cell.Id;
        SubData.Stroke = "yellow";
        SubData.StrokeWidth = 6;
        SubData.NavigationKey = cell.NavigationKey.toString() + "/" + SubData.Id.toString();
        SubData.Coordinate.Y1 = cell.Coordinate.Y1;
        SubData.Coordinate.Y2 = cell.Coordinate.Y2;
        ApplyCoordinate(SubData);
        if (cell.SubData.SubData !== undefined && cell.SubData.SubData !== null && (!_.isEmpty(cell.SubData.SubData))) {
          Object.values(cell.SubData.SubData).map((cellSub) => {
              cellSub.Id = id++;
              cellSub.ParentId = SubData.Id;
              cellSub.Stroke = "green";
              cellSub.StrokeWidth = 6; 
              cellSub.NavigationKey = SubData.NavigationKey.toString() + "/" + cellSub.Id.toString();
              cellSub.Coordinate.Y1 = cell.SubData.Coordinate.Y1;
              cellSub.Coordinate.Y2 = cell.SubData.Coordinate.Y2;
              ApplyCoordinate(cellSub);
                return cell;
            })
        }
        cell.SubData = SubData?? null;
    }
    return cell;
  });
  return newItem;
}
        
    const ApplyCoordinate = (cell) => {
        cell.X = Math.abs(cell.Coordinate.X1 * 1);
        cell.Y = Math.abs(cell.Coordinate.Y1 * 1);
        cell.Width =  Math.abs(cell.Coordinate['X1'] * 1 - cell.Coordinate['X2'] * 1);
        cell.Height = Math.abs(cell.Coordinate['Y1'] * 1 - cell.Coordinate['Y2'] * 1);
    }

      let objectKeysToFirstCapital = function (origObj) {
        return Object.keys(origObj).reduce(function (newObj, key) {
            let val = origObj[key];
            let newVal = (typeof val === 'object') ? objectKeysToFirstCapital(val) : val;
            if (key === 'coordinates') key = 'coordinate';
            let newKey = jsUcfirst(key);

            console.log(key.indexOf('$'));
            if (key.indexOf('$') !== -1) {
                
                if (attrs.findIndex( ({ Originalkey }) => Originalkey === key) === -1){
                   // let arr = [...attrs.list, {key, newKey}];
                   // arr.push({key, newKey});
                   attrs.push({Originalkey : key, newKey : newKey});
                    setAttrs(attrs);
                }
            }
            console.log(attrs);
            newObj[newKey] = newVal;
            return newObj;
        }, {});
    }
        function jsUcfirst(string) 
        {
            if (string.indexOf('$') !== -1) 
                string = string.slice(1);
            return string.charAt(0).toUpperCase() + string.slice(1);
        } 

      const handleUpdateName = (name) => {
        console.log(name);
        setTemplateName(name);
      }

      let objectKeysToFirstLower = function (origObj) {
        let obj =  Object.keys(origObj).reduce(function (newObj, key) {
            let val = origObj[key];
            let newVal = (typeof val === 'object') ? objectKeysToFirstLower(val) : val;
            if (key === 'Coordinate') key = 'coordinates';
            let newKey = jsLcfirst(key);

            if (attrs.findIndex( ({ newKey }) => newKey === key) !== -1){
                newKey = '$' + newKey;
            }
           
            console.log(attrs);
            newObj[newKey] = newVal;
            return newObj;
        }, {});

        let revisedObj =  deletObject(obj);
        return revisedObj;
    }
        function jsLcfirst(string) 
        {
            // if (string.indexOf('$') !== -1) 
            //     string = string.slice(1);
            return string.charAt(0).toLowerCase() + string.slice(1);
        } 

        function deletObject(v) {
                delete v.id 
                delete v.parentId
                delete v.stroke
                delete v.strokeWidth
                delete v.width
                delete v.height
                delete v.x
                delete v.y
                delete v.navigationKey

                return v;
        }
        
      const handleFileSave = () => {
        var x2js = new X2JS({
            attributePrefix : "$"
        });

        var settings = {
            settings : {
                cellData :items,
                page : layout.Setting.Page
            }
        }

        let x = objectKeysToFirstLower(items);
        let newObj = Object.values(x);


        var settings = {
            settings : {
                cellData :newObj,
                page : layout.Setting.Page
            }
        }

        var xmlObj = x2js.js2xml( settings );
        console.log(xmlObj);

        var blob = new Blob([xmlObj], {type: "xml/plain;charset=utf-8"});
        FileSaver.saveAs(blob, "template.xml");
      }

    //   useEffect(() => {
    //     console.log(name);
    //     setTemplateName(name);
    //  }, [name]);

    return (
        <React.Fragment> 
                 <HeaderStyle>
                <h1>Designer</h1>
                
                    {/* <input 
                    value = {name}
                    onChange={e => {
                    
                        setName(e.target.value);
                    
                    }} 
                    placeholder="Type and search"
                    disabled = {!isTemplateNew} 
                    /> */}
                
                
                {/* <AwesomeButton
                    type="primary"
                    ripple
                    onPress={() => {
                        handleCreateNewTemplate();
                    }}
                    >
                    New
                </AwesomeButton> */}
                {true  &&
                <ReactFileReader base64={true} handleFiles={ (file) => setImageBase64(file.base64)} fileTypes={[".tif"]}>
                    <AwesomeButton
                    type="primary"
                    ripple
                    >
                    Upload Image
                    </AwesomeButton>
                </ReactFileReader>
                }
                {true  &&
                <ReactFileReader base64={true} handleFiles={ (file) => handleUploadTemplate(file)} fileTypes={[".xml"]}>
                    <AwesomeButton
                    type="primary"
                    ripple
                    >
                    Upload Template
                    </AwesomeButton>
                </ReactFileReader>
                }
                {/* <AwesomeButton
                    type="primary"
                    ripple
                    onPress={() => {
                        openModal();
                    }}
                    >
                    Find
                </AwesomeButton>
                
                <Modal ref={modalRef}>
                    <h1>Please Select ur Template</h1>
                        {templates && 
                          <Scroller>
                          {templates.map(({ Id, Name, Base64Thumbnail }) => {
                            return (
                                <div className="item">
                                  <img src={Base64Thumbnail} />
                                  <span className="name">{Name}</span>
                                  <AwesomeButton
                                  className="button"
                                    type="primary"
                                    ripple
                                    onPress={() => {
                                        handleOnLoad(Id);
                                        closeModal();
                                    }}
                                    >
                                    Select
                                </AwesomeButton>
                                </div>
                            );
                          })}
                        </Scroller>
                        }
                    
                    <AwesomeButton
                    type="primary"
                    ripple
                    onPress={() => {
                        closeModal();
                    }}
                    >
                    Close
                </AwesomeButton>
                   
                </Modal>
                {isTemplateNew? "true" : "false"}
                    {isDirty? "true" : "false"}
                {(!isTemplateNew) && isDirty && (!isNewVersion) &&
                <AwesomeButton
                    type="primary"
                    ripple
                    onPress={() => {
                        handleAddNewVersion();
                    }}
                    >
                    Add Version
                </AwesomeButton>
                }
                
                {(!isTemplateNew) && version &&
                <span>{isNewVersion ? "New Version" : "Version " + version?? "0"}</span>
                }
                
                {isDirty &&
                <AwesomeButton
                    type="primary"
                    ripple
                    onPress={() => {
                        handlePresistance();
                    }}
                    >
                    {isTemplateNew ? "Create" : "Save"  }
                </AwesomeButton>
                } */}

                {isDirty &&
                <AwesomeButton
                    type="primary"
                    ripple
                    onPress={() => {
                        handleFileSave();
                    }}
                    >
                    SaveToFile
                </AwesomeButton>
                }
            </HeaderStyle>
        </React.Fragment>
    );
}

export default Header;