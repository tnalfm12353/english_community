import React from 'react';
import styled from 'styled-components';

const PositionRadioBoxGroup = ({positions,name,onChange, myPosition}) =>{
    return(
        <PositionGroup>
            {positions.map((positions, i)=>{
                return <PositionLabel myPosition = {myPosition} positionName ={positions} key={i}>{positions}<PositionRadio type="radio" value={positions} name={name} onChange={(e)=>{onChange(e)}}></PositionRadio></PositionLabel>
            })}
        </PositionGroup>
    )
}

export default PositionRadioBoxGroup;

const PositionGroup = styled.div`
    display:flex;
    flex-flow:wrap;
    justify-content:space-between;
    width:85%;
    padding:1rem;
    margin:0 1rem;
`

const PositionLabel = styled.label`
    padding: .4em;
    min-width:80px;
    text-align:center;
    color:${({myPosition,positionName})=>myPosition === positionName ? '#ffca08':'#636466'};
    font-weight:bold;
    border:${({myPosition,positionName})=>myPosition === positionName ? '1px solid #fcc600':null};
    border-radius:5px;
    margin:0 ${({myPosition,positionName})=>myPosition === positionName ? '1rem':null};
    transition: all 1s;
`
const PositionRadio = styled.input`
    display:none;
`