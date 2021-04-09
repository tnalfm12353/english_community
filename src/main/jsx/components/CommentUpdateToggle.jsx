import React from 'react';
import styled from 'styled-components';

const CommentUpdateToggle = ({deleteComment, commentId}) =>{

    return(
        <ToggleContainer>
            <ToggleComponent onClick={()=>{deleteComment(commentId)}}>삭제</ToggleComponent>
        </ToggleContainer>
    )
}

export default CommentUpdateToggle;

const ToggleContainer = styled.div`
    position:absolute;
    width:80px;
    right:0;
    top:29px;
    background: #fff;
    border:1px solid #63646630;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index:1;
`

const ToggleComponent = styled.div`
    padding:10px;
    text-align:center;
    color:#636466;

    &+&{
        border-top:1px solid #63646630;
    }
`