import React from 'react';
import styled from 'styled-components';

const UpdateButtonTemp = ({buttonValue,valid, updateData,onClose}) =>{

    return(
        <UpdateOrCancelDiv>
                <UpdateOrCancelButton valid={valid} onClick={updateData} disabled={!valid}>{buttonValue}</UpdateOrCancelButton>
                <UpdateOrCancelButton cancel={true} onClick={onClose}>취소</UpdateOrCancelButton>
        </UpdateOrCancelDiv>
    )
}

export default UpdateButtonTemp;

const UpdateOrCancelDiv = styled.div`
    display:flex;
    padding:1rem;
`

const UpdateOrCancelButton = styled.button`
    margin-left:10px;
    font-weight:bold;
    min-width:80px;
    color:${({cancel})=>cancel?"#444":"#fff"};

    border:1px solid ${({cancel})=>cancel?"#ccc":"#fcc600"};
    border-radius:5px;
    background:${({cancel})=>cancel?"":"#ffca00cc"};
    padding: .4em;

    opacity:${({cancel,valid}) => cancel? 1:valid?1:.4};
`