import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

import TreeMenu , { defaultChildren, ItemComponent } from 'react-simple-tree-menu';
import 'react-simple-tree-menu/dist/main.css';

export const TreeStyle = styled.div`
    
    max-height:100%;
    overflow-y:auto;

    .ul {
        list-style-type:none;
        margin:0;
        padding:0;
    }

    .li {
        Display: flex;
        margin:0;
        padding:0;
    
        .cancelBtn {
            border-radius: 50%;
            background: yellow;
        }
    }
`


const Tree = ({treeData, selectedShape, treeOpenNodes, 
    handleAddItemToTreeNode, handleAddContainerToTreeNode,
    handleTreeViewClick, handleDeleteItemfromTree}) => {


    return(
        <TreeStyle>
        <TreeMenu data={treeData} hasSearch={true}
        onClickItem={({ key, label, ...props }) => {
           handleTreeViewClick(key);   
      }}
      activeKey={selectedShape?.NavigationKey ?? ''}
      openNodes={treeOpenNodes}   
    >                       
        {({ search, items, resetOpenNodes }) => (
            <>
            <AwesomeButton
            type="primary"
            ripple
            onPress={() => {
                handleAddItemToTreeNode();
            }}
            >
            Add Item
        </AwesomeButton>
        <AwesomeButton
            type="primary"
            ripple
            onPress={() => {
                handleAddContainerToTreeNode();
            }}
            >
            Add Container
        </AwesomeButton>
        <AwesomeButton
            type="primary"
            ripple
            onPress={resetOpenNodes}
            >
            reset 
        </AwesomeButton>
        <input onChange={e => search(e.target.value)} placeholder="Type and search" />
            <ul className="ul">
                {items.map(({key, ...props}) => (
                <span key={key} className="li">
                    <ItemComponent key={key} {...props} />
                   
                    <AwesomeButton 
                    id = {key}
                        type="primary"
                        ripple
                        onPress={() => {
                            console.log("x");
                            console.log(key);
                            handleDeleteItemfromTree(key);
                        }}
                        >
                        x
                    </AwesomeButton>
                
                </span>
                ))}
            </ul>
            </>
        )}
    </TreeMenu>
    </TreeStyle>
    );
}

export default Tree;