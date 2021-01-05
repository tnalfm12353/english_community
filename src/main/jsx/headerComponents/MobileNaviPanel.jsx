import React from 'react';
import styled from 'styled-components';
import Navi from './Navi.jsx';
import {device} from '../lib/style/Device';
const MobileNaviPanel = ({trigger,setTrigger}) =>{

    return(
        <Panel trigger = {trigger}>
            <button onClick = {()=>setTrigger(!trigger)}>
                <Navi/>
            </button>
        </Panel>
    );
}

export default MobileNaviPanel;

const Panel = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: rgba(0,0,0,.45);
    height: 100vh;
    text-align: left;
    padding: 2rem;
    position: absolute;
    z-index:-1;
    top: 0;
    left: 0;
    transition: transform 0.3s ease-in-out;

    @media ${device.mobileL} {
      width: 100%;
    }

    transform: ${({ trigger }) => trigger ? 'translateX(0)' : 'translateX(-100%)'};
`