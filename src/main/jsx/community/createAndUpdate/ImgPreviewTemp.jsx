import React from 'react';
import styled from 'styled-components';

import ImgPreviewForm from './ImgPreviewForm.jsx';

const ImgPreviewTemp = ({fileList,onRemove}) =>{
    return(
        <FileUploadContainer>
            {fileList.map((fileList, key)=>{
                return <ImgPreviewForm fileList = {fileList.toJS()} key={key} onRemove = {onRemove} onClick={(e)=>e.stopPropagation()}/>
            })}
        </FileUploadContainer>
    );
}

export default ImgPreviewTemp;

const FileUploadContainer = styled.div`
    display:grid;
    width: 100%;
    height:auto;
    grid-template-columns: repeat(auto-fit,minmax(20%,auto));
    gap:2px;
    box-shadow: 0 1.5px 3px rgba(0,0,0,0.16), 0 1.5px 3px rgba(0,0,0,0.23);
`