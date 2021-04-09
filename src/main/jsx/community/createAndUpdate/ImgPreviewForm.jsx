import React from 'react';
import styled from 'styled-components';

const ImgPreviewForm = ({fileList,onRemove}) =>{

    return(
        <ImgContainer>
            <Image id={fileList.id} src={fileList.file} onClick={()=>onRemove(fileList.id)}></Image>
        </ImgContainer>
    );
}

export default ImgPreviewForm;

const ImgContainer =styled.div`
    
`
const Image = styled.img`
   border-radius: 10px;
`