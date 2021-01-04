import React from 'react';
import styled from 'styled-components';


const HeaderDropdownTemp = ({hiddenAlarm, hiddenProfile}) =>{

    return(

            <DropdownTemp />
    );
}

export default HeaderDropdownTemp;
const Overlay = styled.div`
    position: fixed;
    width:100vw;
    height:100vh;
    top: 0;
    left: 0;
    z-index:0;
`
const DropdownTemp = styled.div`
    position:absolute;
    z-index:100;
    display:flex;

    top:55px;
    right:10px;
    width:300px;
    height:500px;
    
    border:1px solid red;
`