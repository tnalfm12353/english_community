import React from 'react';
import styled from 'styled-components';

const ReportToggle = () =>{

    return(
        <ToggleContainer>
            <ToggleComponent>신고하기<br/> 기능 x</ToggleComponent>
            
        </ToggleContainer>
    )
}

export default ReportToggle;

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
    padding:8px;
    text-align:center;
    color:#ff000050;

    &+&{
        border-top:1px solid #63646630;
    }
`