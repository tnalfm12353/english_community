import React from 'react';
import styled from 'styled-components';
import pictureIcon from '../../../webapp/img/icons8-picture.png';
const PostEtcButton = ({onChange}) =>{
    return(
        <EtcButtonDiv>
            <Span>Add to Your Post</Span>
            <ImageUpload>
                <label htmlFor="file-input">
                    <img src ={pictureIcon}/>
                </label>    
                <ImgFile
                    id= "file-input"
                    type='file'
                    accept='image/*'
                    multiple
                    onChange={onChange}/>
            </ImageUpload>

            <Temp border-color="red">&times;</Temp>
            <Temp border-color="green">&times;</Temp>
        </EtcButtonDiv>
    );
}

export default PostEtcButton;

const EtcButtonDiv = styled.div`
    display:flex;
    border:1px solid #eee;
    border-radius: 10px;
    box-shadow: 0 1.5px 3px rgba(0,0,0,0.16), 0 1.5px 3px rgba(0,0,0,0.23);
    align-items: center;
	width: 95%;
	height: 100%;
    margin: 0 auto;
    padding: 0.3em 0.6em;

`

const Span = styled.span`
    margin-right: auto;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: .9rem;
    font-weight: bold;
`

const ImageUpload = styled.div`
    margin-left:1em;
    width:2.5rem;
    height:100%;
`
const ImgFile = styled.input`
    display:none;
`
const Temp = styled.div`
    margin-left:1em;
    width:3rem;
    height:100%;
    border: 1px solid black;
`