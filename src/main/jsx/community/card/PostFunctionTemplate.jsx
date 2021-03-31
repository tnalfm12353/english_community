import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp,faCommentDots } from '@fortawesome/free-regular-svg-icons';
const PostFunctionTemplate = ({myThumbs,thumbsUp, updateThumbsUp}) =>{
    return(
        <FunctionContainer>
            <ViewTemplate>
                <IconTextTemplate myThumbs ={myThumbs} onClick={updateThumbsUp}>
                    <Icon icon={faThumbsUp} /> <span>{thumbsUp}</span>
                </IconTextTemplate>
                <IconTextTemplate>
                    <Icon icon={faCommentDots} /> <span>{0}</span>
                </IconTextTemplate>
            </ViewTemplate>
            <FunctionTemplate>

            </FunctionTemplate>
        </FunctionContainer>
    )
}

export default PostFunctionTemplate;

const FunctionContainer = styled.div`
    display:flex;
    flex-direction:column;
    padding:1rem 10px;
`
const ViewTemplate = styled.div`
    display:flex;
    border-bottom:1px solid #ccc;
`
const IconTextTemplate = styled.div`
    display:flex;
    padding:1rem 0;
    span{
        margin-left:.5rem;
        color:${({myThumbs})=> myThumbs? `#ffca01`:`#636466`};
        align-self:center;
    }

    
    &+&{
        margin-left:5rem;
    }
`
const Icon = styled(FontAwesomeIcon)`
    font-size:1.2rem;
    color:${({myThumbs})=> myThumbs? `#ffca01`:`#636466`};
`

const FunctionTemplate = styled.div`
    display:flex;
    
`

