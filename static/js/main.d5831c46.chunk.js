(this["webpackJsonpzap-document-designer"]=this["webpackJsonpzap-document-designer"]||[]).push([[0],{168:function(e,t,n){"use strict";n.r(t);var a=n(1),o=n(0),r=n.n(o),i=n(23),l=n.n(i),c=(n(89),n.p,n(34),n(22)),u=n(16),s=n(10),d=n(12),b=n(13),h=n(21),f=n.n(h),g=n(43),v=n.n(g),j=n(79),p=n(19),O=function(e){var t=e.shapeProps,n=e.isSelected,o=e.onSelect,i=e.onChange,l=r.a.useRef(),c=r.a.useRef();return r.a.useEffect((function(){n&&(console.log("isSelected"),c.current.setNodes([l.current]),c.current.getLayer().batchDraw())}),[n]),Object(a.jsxs)(r.a.Fragment,{children:[Object(a.jsx)(p.Rect,Object(u.a)(Object(u.a)({onClick:o,onTap:o,ref:l},t),{},{draggable:!0,onDragEnd:function(e){console.log("onChange 1"+e.target.x()+" "+e.target.y()+" "+e.target.width()+" "+e.target.height()),i(Object(u.a)(Object(u.a)({},t),{},{X:Math.abs(Math.floor(e.target.x())),Y:Math.abs(Math.floor(e.target.y())),Width:Math.abs(Math.floor(e.target.width())),Height:Math.abs(Math.floor(e.target.height())),rotation:e.target.rotation()})),console.log("onChange 2"+Math.abs(Math.floor(e.target.x()))+" "+Math.abs(Math.floor(e.target.y()))+" "+e.target.width()+" "+e.target.height())},onTransformEnd:function(e){console.log("transform");var n=l.current,a=n.scaleX(),o=n.scaleY();n.scaleX(1),n.scaleY(1),i(Object(u.a)(Object(u.a)({},t),{},{X:Math.abs(Math.floor(n.x())),Y:Math.abs(Math.floor(n.y())),Width:Math.floor(Math.max(5,n.width()*a)),Height:Math.floor(Math.max(n.height()*o)),rotation:n.rotation()}))}})),n&&Object(a.jsx)(p.Transformer,{ref:c,boundBoxFunc:function(e,t){return t.Width<5||t.Height<5?e:t}})]})},y=(n(56),n(32)),S=n.n(y);function m(){var e=Object(d.a)(["\n    background: green;\n"]);return m=function(){return e},e}var x=b.a.div(m()),D=function(e){var t=e.rectangles,n=e.setRectangles,i=e.selectedShape,l=e.setSelectedShape,c=e.imageBase64,u=r.a.useRef(),d=Object(o.useState)(null),b=Object(s.a)(d,2),h=b[0],f=b[1],g=Object(o.useState)(window.innerWidth),y=Object(s.a)(g,2),m=y[0],D=y[1],w=Object(o.useState)(window.innerHeight),C=Object(s.a)(w,2),I=C[0],k=C[1];Object(o.useEffect)((function(){N(c)}),[c]);var N=function(){var e=Object(j.a)(v.a.mark((function e(t){var n,a,o,r,i,l,c,u,s,d,b;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""!==t&&void 0!==t)if(console.log("On Canvas"),t.includes("tiff"))try{for(n=T(t),a=S.a.decode(n),o=a[0],S.a.decodeImage(n,a[0]),r=S.a.toRGBA8(o),i=o.width,l=o.height,(c=document.createElement("canvas")).width=i,c.height=l,u=c.getContext("2d"),s=u.createImageData(i,l),d=0;d<r.length;d++)s.data[d]=r[d];u.putImageData(s,0,0),f(c),D(i),k(l)}catch(h){console.log(h)}else(b=new window.Image).onload=function(){console.log("onload"),console.log(b.width+" img "+b.height),D(b.width),k(b.height),f(b)},b.onerror=function(e){console.log("error")},b.src=t;else D(window.innerWidth),k(window.innerHeight),f(null);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Y=";base64,";function T(e){var t=e.indexOf(Y)+Y.length,n=e.substring(t);return Uint8Array.from(atob(n),(function(e){return e.charCodeAt(0)}))}var X=function(e){console.log(e.target+" ==="+u.current),e.target===u.current&&l(null)},M=function(e){return console.log("selectedShape"),console.log(i),void 0!==e&&Object(a.jsx)(O,{shapeProps:e,isSelected:e.Id===(null===i||void 0===i?void 0:i.Id),onSelect:function(){console.log("rect"),console.log(e),l(e)},onChange:function(a){a.Coordinate={X1:1*a.X,Y1:1*a.Y,X2:1*a.X+1*a.Width,Y2:1*a.Y+1*a.Height};var o=t.slice(),r=e.NavigationKey.split("/"),i=r.length-1;if(0===i){var c=o.findIndex((function(e){return e.Id===1*r[0]}));c>-1&&(o[c]=a)}if(1===i){var u=o.findIndex((function(e){return e.Id===1*r[0]}));u>-1&&(o[u].SubData=a)}if(2===i){var s=o.findIndex((function(e){return e.Id===1*r[0]}));if(s>-1){var d=o[s].SubData.SubData.findIndex((function(e){return e.Id===1*r[2]}));s>-1&&(o[s].SubData.SubData[d]=a)}}console.log("Canvas onChange"),console.log(a.X+" "+a.Y+" "+a.Width+" "+a.Height),console.log(a),n(o),l(a)}},e.Id)};return Object(a.jsx)(x,{children:Object(a.jsx)(p.Stage,{width:m/2,height:I/2,scaleX:.5,scaleY:.5,onMouseDown:X,onTouchStart:X,children:Object(a.jsxs)(p.Layer,{children:[Object(a.jsx)(p.Image,{image:h,ref:u,width:m,height:I,stroke:"red",strokeWidth:10,x:0,y:0}),t&&function(e){var t=[];return console.log("GetAllShapes"),e.map((function(e){t.push(M(e)),null!==e.SubData&&void 0!==e.SubData&&(t.push(M(e.SubData)),(Array.isArray(e.SubData.SubData)?e.SubData.SubData:Object.values(e.SubData.SubData)).map((function(e){t.push(M(e))})))})),t}(t)]})})})},w=(n(66),n(171)),C=n(170),I=n(83);function k(){var e=Object(d.a)(["\n    display: flex;\n    flex-direction: column;\n"]);return k=function(){return e},e}var N=b.a.div(k()),Y=function(e){var t=e.item,n=e.onChange,o=function(e,o){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",i=t&&t.Coordinate&&t.Coordinate[e];return""===r&&(r=o),Object(a.jsxs)(w.a.Group,{as:C.a,controlId:e,children:[console.log("Coordinates"),console.log(t),Object(a.jsx)(w.a.Label,{column:"sm",lg:2,children:o}),Object(a.jsx)(I.a,{sm:10,children:Object(a.jsx)(w.a.Control,{size:"sm",type:"Text",placeholder:r,value:null!==i&&void 0!==i?i:"",onChange:function(t){return n(e,t.target.value)}})})]})},r=function(e,o){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",i=t&&t.Font&&t.Font[e];return""===r&&(r=o),Object(a.jsxs)(w.a.Group,{as:C.a,controlId:e,children:[Object(a.jsx)(w.a.Label,{column:"sm",lg:2,children:o}),Object(a.jsx)(I.a,{sm:10,children:Object(a.jsx)(w.a.Control,{size:"sm",type:"Text",placeholder:r,value:null!==i&&void 0!==i?i:"",onChange:function(t){return n(e,t.target.value)}})})]})},i=function(e,o){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",i=t&&t[e];return""===r&&(r=o),Object(a.jsxs)(w.a.Group,{as:C.a,controlId:e,children:[Object(a.jsx)(w.a.Label,{column:"sm",lg:2,children:o}),Object(a.jsx)(I.a,{sm:10,children:Object(a.jsx)(w.a.Control,{size:"sm",type:"Text",placeholder:r,value:null!==i&&void 0!==i?i:"",onChange:function(t){return n(e,t.target.value)}})})]})};return Object(a.jsx)(w.a,{children:Object(a.jsxs)(N,{children:[i("Id","ID"),i("ParentId","Parent ID"),i("DisplayText","Diplay Text"),o("X1","X1","X1 Coordinate"),o("Y1","Y1","Y1 Coordinate"),o("X2","X2","X2 Coordinate"),o("Y2","Y2","Y2 Coordinate"),r("Type","Font Type"),r("Size","Font Size"),i("Width","Width"),i("Height","Height"),i("X","X"),i("Y","Y"),i("NodeName","Title"),i("Alignment","Alignment"),i("RotateAngle","RotateAngle")]})})},T=n(17);function X(){var e=Object(d.a)(["\n    position: relative;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    min-height: 30%;\n    width: 40%;\n    overflow-y: auto;\n    background-color: white;\n    box-shadow: 0 0 10px rgba(0,0,0,0.25);\n    z-index: 101;\n    padding: 40px;\n"]);return X=function(){return e},e}function M(){var e=Object(d.a)(["\n    position: fixed;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    z-index: 100;\n    background-color: rgba(0,0,0,0.3);\n"]);return M=function(){return e},e}function A(){var e=Object(d.a)(["\n    position: fixed;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n"]);return A=function(){return e},e}b.a.div(A()),b.a.div(M()),b.a.div(X());var L=n(45),W=n.n(L),K=n(84),P=n.n(K),E=n(46),B=n.n(E),F=n(30),H=n.n(F),$=H.a.create({baseURL:"http://localhost:64909/"}),R=function(e){return $({method:"GET",url:"/api/Template/CurrentLayout/"+e})},V=function(e){return $({method:"POST",url:"/api/Template/",data:e})},z=H.a.create({baseURL:"http://localhost:64909/"}),q=function(e){return z({method:"POST",url:"/api/Layout/",data:e})};function G(){var e=Object(d.a)(["\n    height: 50px;\n    background: pink;\n    Display: flex;\n\n    .select{\n        width:200px;\n    }\n"]);return G=function(){return e},e}function U(){var e=Object(d.a)(["\n    margin: 0 auto;\n    height: 300px;\n    width: 500px;\n    overflow: auto;\n\n    .item {\n        margin: 30px 0;\n        Display: flex;\n        justify-content: flex-start;\n\n        img {\n\n        }\n\n        .name {\n\n        }\n\n        .button{\n\n        }\n    }\n"]);return U=function(){return e},e}b.a.div(U());var J=b.a.div(G()),Q=[{Originalkey:"$formatting",newKey:"Formatting"},{Originalkey:"$nodeName",newKey:"NodeName"},{Originalkey:"$alignment",newKey:"Alignment"},{Originalkey:"$wordWrap",newKey:"WordWrap"},{Originalkey:"$type",newKey:"Type"},{Originalkey:"$lastPageOnly",newKey:"LastPageOnly"},{Originalkey:"$newLine",newKey:"NewLine"},{Originalkey:"$specialStartNewLine",newKey:"SpecialStartNewLine"},{Originalkey:"$activateSpecialStartNewLine",newKey:"ActivateSpecialStartNewLine"},{Originalkey:"$alwaysNewLine",newKey:"AlwaysNewLine"},{Originalkey:"$section",newKey:"Section"}],Z=function(e){var t=e.templateName,n=e.setTemplateName,i=(e.setError,e.setImageBase64),l=e.setLayout,u=(e.version,e.layout),d=e.items,b=(e.isTemplateNew,e.isDirty),h=(e.isNewVersion,e.handleOnLoad,e.handleAddNewVersion,e.handleCreateNewTemplate,e.handlePresistance,Object(o.useState)([])),g=Object(s.a)(h,2),v=(g[0],g[1],Object(o.useState)([])),j=Object(s.a)(v,2),p=j[0],O=j[1],y=Object(o.useState)(t),S=Object(s.a)(y,2),m=S[0],x=(S[1],Object(o.useState)(Q)),D=Object(s.a)(x,2),w=D[0],C=D[1];r.a.useRef();Object(o.useEffect)((function(){n(m)}),[m]),Object(o.useEffect)((function(){l(p)}),[p]),Object(o.useEffect)((function(){console.log(w)}),[w]);var I=";base64,",k=function(e){var t=1;return Object.values(e).map((function(e){if(e.Id=t++,e.ParentId=0,e.Stroke="red",e.StrokeWidth=6,e.NavigationKey=e.Id.toString(),N(e),void 0!==e.SubData&&null!==e.SubData&&!f.a.isEmpty(e.SubData)){var n=e.SubData;n.Id=t++,n.ParentId=e.Id,n.Stroke="yellow",n.StrokeWidth=6,n.NavigationKey=e.NavigationKey.toString()+"/"+n.Id.toString(),n.Coordinate.Y1=e.Coordinate.Y1,n.Coordinate.Y2=e.Coordinate.Y2,N(n),void 0===e.SubData.SubData||null===e.SubData.SubData||f.a.isEmpty(e.SubData.SubData)||Object.values(e.SubData.SubData).map((function(a){return a.Id=t++,a.ParentId=n.Id,a.Stroke="green",a.StrokeWidth=6,a.NavigationKey=n.NavigationKey.toString()+"/"+a.Id.toString(),a.Coordinate.Y1=e.SubData.Coordinate.Y1,a.Coordinate.Y2=e.SubData.Coordinate.Y2,N(a),e})),e.SubData=null!==n&&void 0!==n?n:null}return e}))},N=function(e){e.X=Math.abs(1*e.Coordinate.X1),e.Y=Math.abs(1*e.Coordinate.Y1),e.Width=Math.abs(1*e.Coordinate.X1-1*e.Coordinate.X2),e.Height=Math.abs(1*e.Coordinate.Y1-1*e.Coordinate.Y2)},Y=function e(t){return Object.keys(t).reduce((function(n,a){var o=t[a],r="object"===typeof o?Array.isArray(o)?Object.values(e(o)):e(o):o;"coordinates"===a&&(a="coordinate");var i=function(e){-1!==e.indexOf("$")&&(e=e.slice(1));return e.charAt(0).toUpperCase()+e.slice(1)}(a);return console.log(a.indexOf("$")),-1!==a.indexOf("$")&&-1===w.findIndex((function(e){return e.Originalkey===a}))&&(w.push({Originalkey:a,newKey:i}),C(w)),console.log(w),n[i]=r,n}),{})};var X=function e(t){return Array.isArray(t)?t.map((function(t){return t&&"object"===typeof t?e(t):t})).filter((function(e){return!(null==e)})):Object.entries(t).map((function(t){var n=Object(s.a)(t,2),a=n[0],o=n[1];return[a,o&&"object"===typeof o?e(o):o]})).reduce((function(e,t){var n=Object(s.a)(t,2),a=n[0],o=n[1];return null==o||(e[a]=o),e}),{})},M=function e(t){var n,a=Object.keys(t).reduce((function(n,a){var o=t[a];if(null!==o){var r="object"===typeof o?Array.isArray(o)?Object.values(e(o)):e(o):o;"Coordinate"===a&&(a="coordinates");var i,l=(i=a).charAt(0).toLowerCase()+i.slice(1);return-1!==w.findIndex((function(e){return e.newKey===a}))&&(l="$"+l),console.log(w),n[l]=r,n}}),{});return delete(n=a).id,delete n.parentId,delete n.stroke,delete n.strokeWidth,delete n.width,delete n.height,delete n.x,delete n.y,delete n.navigationKey,n};var A=function(e){var t=new B.a({attributePrefix:"$"}),n=M(e),a=t.js2xml(n);return console.log(a),a},L=function(){var e,t={settings:{cellData:Object(c.a)(d),page:null!==(e=u.Setting.Page)&&void 0!==e?e:{X:0,Y:0}}},n=A(X(t)),a=new Blob([n],{type:"xml/plain;charset=utf-8"});P.a.saveAs(a,"template.xml")};return Object(a.jsx)(r.a.Fragment,{children:Object(a.jsxs)(J,{children:[Object(a.jsx)("h1",{children:"Designer"}),Object(a.jsx)(W.a,{base64:!0,handleFiles:function(e){return i(e.base64)},fileTypes:[".tif"],children:Object(a.jsx)(T.AwesomeButton,{type:"primary",ripple:!0,children:"Upload Image"})}),Object(a.jsx)(W.a,{base64:!0,handleFiles:function(e){return function(e){var t,n,a=e.base64.indexOf(I)+I.length,o=e.base64.substring(a),r=(e.base64,atob(o));console.log(r);var i=new B.a({attributePrefix:"$"}).xml2js(r);console.log(i);var l=Y(i);console.log(w);var c=k(null!==(t=null===l||void 0===l||null===(n=l.Settings)||void 0===n?void 0:n.CellData)&&void 0!==t?t:[]);l.Settings.CellData=c;var u={Setting:{CellData:c,Page:l.Settings.Page},Version:0};console.log(u),O(u)}(e)},fileTypes:[".xml"],children:Object(a.jsx)(T.AwesomeButton,{type:"primary",ripple:!0,children:"Upload Template"})}),b&&Object(a.jsx)(T.AwesomeButton,{type:"primary",ripple:!0,onPress:function(){L()},children:"SaveToFile"})]})})},_=n(48),ee=(n(165),n(31));n(76);function te(){var e=Object(d.a)(["\n    \n    max-height:100%;\n    overflow-y:auto;\n\n    .ul {\n        list-style-type:none;\n        margin:0;\n        padding:0;\n    }\n\n    .li {\n        Display: flex;\n        margin:0;\n        padding:0;\n    \n        .cancelBtn {\n            border-radius: 50%;\n            background: yellow;\n        }\n    }\n"]);return te=function(){return e},e}var ne=b.a.div(te()),ae=function(e){var t,n=e.treeData,o=e.selectedShape,r=e.treeOpenNodes,i=e.handleAddItemToTreeNode,l=e.handleAddContainerToTreeNode,c=e.handleTreeViewClick,s=e.handleDeleteItemfromTree;return Object(a.jsx)(ne,{children:Object(a.jsx)(ee.b,{data:n,hasSearch:!0,onClickItem:function(e){var t=e.key;e.label,Object(_.a)(e,["key","label"]);c(t)},activeKey:null!==(t=null===o||void 0===o?void 0:o.NavigationKey)&&void 0!==t?t:"",openNodes:r,children:function(e){var t=e.search,n=e.items,o=e.resetOpenNodes;return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(T.AwesomeButton,{type:"primary",ripple:!0,onPress:function(){i()},children:"Add Item"}),Object(a.jsx)(T.AwesomeButton,{type:"primary",ripple:!0,onPress:function(){l()},children:"Add Container"}),Object(a.jsx)(T.AwesomeButton,{type:"primary",ripple:!0,onPress:o,children:"reset"}),Object(a.jsx)("input",{onChange:function(e){return t(e.target.value)},placeholder:"Type and search"}),Object(a.jsx)("ul",{className:"ul",children:n.map((function(e){var t=e.key,n=Object(_.a)(e,["key"]);return Object(a.jsxs)("span",{className:"li",children:[Object(a.jsx)(ee.a,Object(u.a)({},n),t),Object(a.jsx)(T.AwesomeButton,{id:t,type:"primary",ripple:!0,onPress:function(){console.log("x"),console.log(t),s(t)},children:"x"})]},t)}))})]})}})})};n(166);function oe(){var e=Object(d.a)(["\n    background: yellow;\n    max-height:100%;\n    overflow-y:auto;\n"]);return oe=function(){return e},e}function re(){var e=Object(d.a)(["\n    height: 1000px;\n    widht: 200px;\n    Display: flex;\n"]);return re=function(){return e},e}function ie(){var e=Object(d.a)(["\n    display: flex;\n    flex-direction: row;\n"]);return ie=function(){return e},e}function le(){var e=Object(d.a)(["\n    height: 50px;\n    background: pink;\n    Display: flex;\n\n    .select{\n        width:200px;\n    }\n"]);return le=function(){return e},e}function ce(){var e=Object(d.a)(["\n    display: flex;\n    flex-direction: column;\n"]);return ce=function(){return e},e}function ue(){var e=Object(d.a)(["\n    background: red;\n    Display: flex;\n"]);return ue=function(){return e},e}var se=b.a.div(ue()),de=b.a.div(ce()),be=(b.a.div(le()),b.a.div(ie())),he=b.a.div(re()),fe=b.a.div(oe()),ge=function(e){var t=e.children;return Object(a.jsx)(se,{children:t})},ve=function(e){var t=e.children;return Object(a.jsx)(be,{children:t})},je=function(e){var t=e.children;return Object(a.jsx)(he,{children:t})},pe=function(e){var t=e.children;return Object(a.jsx)(fe,{children:t})},Oe=function(){var e=Object(o.useState)(!1),t=Object(s.a)(e,2),n=t[0],i=t[1],l=Object(o.useState)(!1),d=Object(s.a)(l,2),b=d[0],h=d[1],g=Object(o.useState)(!1),v=Object(s.a)(g,2),j=v[0],p=v[1],O=Object(o.useState)(null),y=Object(s.a)(O,2),S=y[0],m=y[1],x=Object(o.useState)(""),w=Object(s.a)(x,2),C=w[0],I=w[1],k=Object(o.useState)({Id:-1,Layouts:[{Setting:{CellData:[]}}]}),N=Object(s.a)(k,2),T=N[0],X=N[1],M=Object(o.useState)(""),A=Object(s.a)(M,2),L=A[0],W=A[1],K=Object(o.useState)({Setting:{CellData:[]}}),P=Object(s.a)(K,2),E=P[0],B=P[1],F=Object(o.useState)([]),H=Object(s.a)(F,2),$=H[0],z=H[1],G=Object(o.useState)([]),U=Object(s.a)(G,2),J=U[0],Q=U[1],_=Object(o.useState)([""]),ee=Object(s.a)(_,2),te=ee[0],ne=ee[1],oe=Object(o.useState)(null),re=Object(s.a)(oe,2),ie=re[0],le=re[1],ce=Object(o.useState)(""),ue=Object(s.a)(ce,2),se=ue[0],be=ue[1];Object(o.useEffect)((function(){console.log(C)}),[C]),Object(o.useEffect)((function(){var e,t,n;be(T.Base64),B(null!==(e=null===(t=T.Layouts)||void 0===t?void 0:t.find((function(e){return!0})))&&void 0!==e?e:fe()),W(T.Name),h(0===(null!==(n=T.Id)&&void 0!==n?n:0)),he()}),[T]),Object(o.useEffect)((function(){var e,t;z(Se(null!==(e=null===(t=E.Setting)||void 0===t?void 0:t.CellData)&&void 0!==e?e:[])),m(E.Version)}),[E]),Object(o.useEffect)((function(){Q(Oe($)),0==$.length&&le(null),he()}),[$]),Object(o.useEffect)((function(){var e;if((null!==(e=null===ie||void 0===ie?void 0:ie.NavigationKey)&&void 0!==e?e:"").indexOf("/")<0)ne(void 0);else{var t,n=null!==(t=null===ie||void 0===ie?void 0:ie.NavigationKey)&&void 0!==t?t:void 0;ne(n)}}),[ie]);var he=function(){var e,t,n,a,o,r,l=!f.a.isEqual(null!==(e=null===(t=T.Layouts)||void 0===t?void 0:t.find((function(e){return!0})))&&void 0!==e?e:fe(),E),c=!f.a.isEqual(null!==(n=null===(a=T.Layouts)||void 0===a||null===(o=a.find((function(e){return!0})))||void 0===o||null===(r=o.Setting)||void 0===r?void 0:r.CellData)&&void 0!==n?n:[],$);i(!(!l&&!c))},fe=function(){return{Id:0,Setting:{CellData:[],Page:{},RemPage:null,Type:null,Index:0},TemplateId:0,Version:0}},Oe=function(e){var t=[];return e.map((function(e){if(e.SubData){null!==e.SubData.SubData&&Array.isArray(e.SubData.SubData)&&ye(e.SubData.SubData),t.push({key:e.Id,label:e.NodeName,nodes:[{key:e.SubData.Id.toString(),label:e.SubData.NodeName,nodes:ye(e.SubData.SubData)}]})}else t.push({key:e.Id.toString(),label:e.NodeName,nodes:[]});console.log("nodes"),console.log(t)})),t},ye=function(e){var t=[];return(Array.isArray(e)?e:Object.values(e)).map((function(e){t.push({key:e.Id.toString(),label:e.NodeName,nodes:[]})})),t},Se=function(e){return e.map((function(e){e.Stroke="red",e.StrokeWidth=6,void 0!==e.SubData&&null!==e.SubData&&(e.SubData.Stroke="yellow",e.SubData.StrokeWidth=6,void 0!==e.SubData.SubData&&null!==e.SubData.SubData&&(Array.isArray(e.SubData.SubData)?e.SubData.SubData:Object.values(e.SubData.SubData)).map((function(e){e.Stroke="green",e.StrokeWidth=6})))})),console.log("applyGraphics"),console.log(e),e},me=function(e,t,n){switch(t){case"X1":e.Coordinate.X1=1*n,e.X=1*n,e.Width=Math.abs(1*e.Coordinate.X1-1*e.Coordinate.X2);break;case"X2":e.Coordinate.X2=1*n,e.Width=Math.abs(1*e.Coordinate.X1-1*e.Coordinate.X2);break;case"Y1":e.Coordinate.Y1=1*n,e.Y=1*n,e.Height=Math.abs(1*e.Coordinate.Y1-1*e.Coordinate.Y2);break;case"Y2":e.Coordinate.Y2=1*n,e.Height=Math.abs(1*e.Coordinate.Y1-1*e.Coordinate.Y2);break;case"Width":e.Width=1*n,e.Coordinate.X2=Math.abs(1*e.Coordinate.X1+1*e.Width);break;case"Height":e.Height=1*n,e.Coordinate.Y2=Math.abs(1*e.Coordinate.Y1+1*e.Height);break;case"X":e.X=1*n,e.X1=1*n;break;case"Y":e.Y=1*n,e.Y1=1*n;break;default:e[t]=n}},xe=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,o=De(100,200);return{Id:o,parentId:e,LastPageOnly:null,Alignment:"left",Coordinate:{X1:10,X2:110,Y1:10,Y2:110},DisplayText:null,Font:{Type:"arial",Size:"8",Formatting:"",Weight:null},Format:null,Height:100,NavigationKey:(null!==n?n+"/"+o:o).toString(),rotateAngle:0,NodeName:"New Shape",Stroke:t,StrokeWidth:5,SubData:a,Text:{DisplayText:null,Prefix:null,Midfix:null,Postfix:null},Type:null,Width:100,X:10,Y:10}};function De(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e}return Object(a.jsx)(r.a.Fragment,{children:Object(a.jsxs)(de,{children:[Object(a.jsx)(ge,{children:C}),Object(a.jsx)(Z,{templateName:L,setTemplateName:W,setError:I,setImageBase64:be,setLayout:B,version:S,layout:E,items:$,isTemplateNew:b,isDirty:n,isNewVersion:j,handleOnLoad:function(e){R(e).then((function(e){var t=e.data[0],n=t.Layouts,a=Math.max.apply(Math,Object(c.a)(n.map((function(e){return e.Version})))),o=n.find((function(e){return e.Version===a}));t.Layouts=[o],X(t),console.log(t),I("")})).catch((function(e){e.response?I("Failure "+e.response.status):e.request&&I("client never received a response, or request never left")}))},handleAddNewVersion:function(){var e=Object(u.a)({},E);e.Id=0,e.Version=e.Version+1,p(!0),B(e)},handleCreateNewTemplate:function(){var e={Base64:"",Id:0,Layouts:[],Name:"New Template"};X(e),console.log(e)},handlePresistance:function(){if(T.Id>0){var e=Object(u.a)({},E);e.Setting.CellData=$,q(e).then((function(t){console.log(t);var n=t.data;e.Id=n,B(e)})).catch((function(e){e.response?I("Failure "+e.response.status):e.request&&I("client never received a response, or request never left")}))}else{var t=Object(u.a)({},T);t.Base64=se,t.Name=L,E.Setting.CellData=$,t.Layouts=[E],V(t).then((function(e){console.log(e);var n=e.data;t.Id=n,X(t)})).catch((function(e){e.response?I("Failure "+e.response.status):e.request&&I("client never received a response, or request never left")}))}}}),Object(a.jsxs)(ve,{children:[Object(a.jsxs)(je,{children:[Object(a.jsx)(ae,{treeData:J,selectedShape:ie,treeOpenNodes:te,handleAddItemToTreeNode:function(){console.log("handleAddToTree");var e=null,t=Object(c.a)($);if(null===ie||void 0===ie)e=xe(0,"red"),t.push(e);else{var n,a=null===ie||void 0===ie||null===(n=ie.NavigationKey)||void 0===n?void 0:n.split("/");if(null===a||void 0===a)return;if(1===a.length-1){var o=t.find((function(e){return e.Id===1*a[0]}));if(o&&o.SubData.Id!==a[1]){var r=o.SubData;(e=xe(r.Id,"green",r.NavigationKey)).Coordinate={X1:r.Coordinate.X1,X2:110,Y1:r.Coordinate.Y1,Y2:r.Coordinate.Y2},e.X=r.Coordinate.X1,e.Y=r.Coordinate.Y1,e.Height=Math.abs(Math.abs(o.Coordinate.Y1)-Math.abs(o.Coordinate.Y2)),r.SubData.push(e)}}}z(t)},handleAddContainerToTreeNode:function(){var e;console.log("handleAddToTree");var t=Object(c.a)($),n=null===ie||void 0===ie||null===(e=ie.NavigationKey)||void 0===e?void 0:e.split("/"),a=t.find((function(e){return e.Id===1*n[0]}));if(a&&(null===a.SubData||void 0===a.SubData)){var o=xe(a.Id,"yellow",a.NavigationKey,[]);o.Coordinate={X1:a.Coordinate.X1,X2:a.Coordinate.X2,Y1:a.Coordinate.Y1,Y2:a.Coordinate.Y2},o.X=Math.abs(a.Coordinate.X1),o.Y=Math.abs(a.Coordinate.Y1),o.Width=Math.abs(Math.abs(a.Coordinate.X1)-Math.abs(a.Coordinate.X2)),o.Height=Math.abs(Math.abs(a.Coordinate.Y1)-Math.abs(a.Coordinate.Y2)),a.SubData=o}z(t)},handleTreeViewClick:function(e){console.log("TreeMenu click"+e);var t=$.slice(),n=e.split("/"),a=$;n[0]&&(a=t.find((function(e){return e.Id===1*n[0]}))),n[1]&&(a=a.SubData),n[2]&&(a=a.SubData.find((function(e){return e.Id===1*n[2]}))),console.log(a),le(a)},handleDeleteItemfromTree:function(e){console.log("TreeMenu Delete click"+e);var t=e.split("/"),n=t.length-1,a=$.slice();if(0===n){var o=a.findIndex((function(e){return e.Id===1*t[0]}));o>-1&&a.splice(o,1)}if(1===n){var r=a.findIndex((function(e){return e.Id===1*t[0]}));r>-1&&(a[r].SubData=null)}if(2===n){var i=a.findIndex((function(e){return e.Id===1*t[0]}));if(i>-1){var l=a[i].SubData.SubData.findIndex((function(e){return e.Id===1*t[2]}));i>-1&&a[i].SubData.SubData.splice(l,1)}}console.log(a),z(a),le(null)}}),Object(a.jsx)(pe,{children:Object(a.jsx)(Y,{item:ie,onChange:function(e,t){console.log("handleSave"),console.log(ie);var n=$.slice();if(null!==ie&&void 0!==ie){var a=null===ie||void 0===ie?void 0:ie.NavigationKey.split("/"),o={};a[0]&&(o=n.find((function(e){return e.Id===1*a[0]}))),a[1]&&(o=o.SubData),a[2]&&(o=o.SubData.find((function(e){return e.Id===1*a[2]}))),me(o,e,t),z(n),console.log("handleSave rnd "+o+" "+e+" "+t)}}})})]}),Object(a.jsx)(D,{rectangles:$,setRectangles:z,selectedShape:ie,setSelectedShape:le,imageBase64:se})]})]})})},ye=function(){return Object(a.jsx)(Oe,{})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(Object(a.jsx)(r.a.StrictMode,{children:Object(a.jsx)(ye,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},34:function(e,t,n){},89:function(e,t,n){}},[[168,1,2]]]);
//# sourceMappingURL=main.d5831c46.chunk.js.map