import React from 'react';
import styled from 'styled-components';
import TextareaAutoSize from '../../components/TextareaAutoSize.jsx';

const PostInputForm = ({onChange,title,content}) =>{
    return(
        <InputFormContainer>
            <TitleArea>
                <TitleInput placeholder="Title"
                    name="title"
                    value={title}
                    onChange={onChange}
                />
            </TitleArea>
            <ContentArea>
                <TextareaAutoSize 
                    placeholder={"Content"}
                    name="content"
                    maxRows={8}
                    minRows={1}
                    textValue={content}
                    handleChange = {onChange}/>
            </ContentArea>
        </InputFormContainer>
    );

}

export default PostInputForm;

const InputFormContainer = styled.div`
    display:flex;
    flex-direction:column;
    width: 100%;
    height: auto%;
    padding:1rem;
`

const TitleArea = styled.div`
    width:100%;
    height:auto;
    padding: 0.3em 0;
    margin:.5rem 0;
`
const TitleInput = styled.input`
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 1.5rem;
    width:100%;
    outline:none;
    border: none;
    border-bottom:1px solid #ccc;
    
`
const ContentArea = styled.div`
    width:100%;
    height:auto;
    margin:.5rem 0;
`