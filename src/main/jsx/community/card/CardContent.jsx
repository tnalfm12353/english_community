import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const CardContent = ({content}) =>{
    const [maxContent,setMaxContent] = useState([]);
    const [minContent,setMinContent] = useState([]);
    const [readMoreLabel, setReadMoreLabel] = useState(false);

    useEffect(()=>{
        if(content != undefined){
            const min = content.split("\n",3);
            const max = content.split("\n");

            if(min.length < max.length){
                setMaxContent(max);
                setMinContent(min);
                setReadMoreLabel(true);
            }else{
                setMaxContent(max);
            }
        }
    },[content])

    function openUp(){
        setReadMoreLabel(false);
    }

    return(
        <ContentTemplate>
            {
                readMoreLabel? 
                <>
                    {minContent.map((text,key) =>{
                        return <Content id={key} key={key}>{text}</Content>
                    })
                    }
                    <ReadMoreLabel onClick = {openUp}>Read More</ReadMoreLabel>
                </>
                    :
                    maxContent.map((text,key)=>{
                        return <Content key={key}>{text}</Content>
                    })
            }
        </ContentTemplate>
    );

}

export default CardContent;

const ContentTemplate = styled.div`
    margin: 1rem 0;
`

const Content = styled.div`
    padding:.2em;
    line-height:1.5em;
    max-height:8em;
`

const ReadMoreLabel = styled.div`
    padding:.5em;
    text-align: center;
    color:gray;
    font-size:.8rem;
    font-weight:bold;
`