import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
const ProfileToggle = ({id}) =>{


    return(
        <ToggleContainer>
            <ToggleComponent><Link to={"/Profile/" + id}>프로필</Link></ToggleComponent>
        </ToggleContainer>
    )
}

export default ProfileToggle;

const ToggleContainer = styled.div`
    position:absolute;
    width:100%;
    left:0;
    top:29px;
    background: #fff;
    border:2px solid #63646660;
    border-top:none;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index:1;
`

const ToggleComponent = styled.div`
    padding:10px;
    text-align:center;
    color:#636466;
`