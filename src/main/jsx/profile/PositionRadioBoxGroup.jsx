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
    justify-content:space-between;
    width:85%;
    padding:1rem;
    margin:0 1rem;
    border:1px solid #ccc;
`

const PositionLabel = styled.label`
    color:${({myPosition,positionName})=>myPosition === positionName ? '#ffca08':'#636466'};
`

const PositionRadio = styled.input`
    visibility:hidden;
`