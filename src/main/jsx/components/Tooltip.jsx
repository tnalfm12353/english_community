import React from 'react';
import styled from 'styled-components';

const Tooltip = ({content, fontSize}) =>{

    return(
        <TooltipTemplate fontSize = {fontSize}>{content}</TooltipTemplate>
    )
}

export default Tooltip;

const TooltipTemplate = styled.div`
    font-size: ${({fontSize}) => fontSize};
    color:#fff;
    padding:.5em;
    background-color: rgba(0,0,0,.65);
    border-radius:8px;
`