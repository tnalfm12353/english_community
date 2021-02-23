import React,{useState,useRef} from 'react';
import styled from 'styled-components';

const PostInputForm = ({onChange,title,content}) =>{
    const ContentRef =  useRef(null);

    const [fontSize,setFontSize] = useState(1.25);
    const [maxRows,setMaxRows] = useState(8);
    const [value,setValue] = useState();
    
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
                <ContentInput placeholder="Content"
                    fontSize={fontSize} 
                    minRows={4}
                    maxRows={maxRows}
                    name="content"
                    value={content}
                    onChange = {onChange}/>
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

const ContentInput = styled.textarea`
    font-family: 'Jua', sans-serif;
    font-size:${props => props.fontSize}rem;
    width:100%;

    resize:none;
    outline:none;
    border:none;
`