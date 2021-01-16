import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AccountToggleProfile from './AccountToggleProfile.jsx';

const AccountHeaderToggleContainer = ({hiddenAlarm, hiddenProfile, onClose}) =>{

    const [pointRightpx,setPointRightpx] = useState(null);

    useEffect(()=>{
        if(!hiddenAlarm){
            setPointRightpx("60px");
        }else if(!hiddenProfile){
            setPointRightpx("15px");
        }
    });

    function getUsedComponent (){
        if(!hiddenAlarm){
            return(
                <div>hihi</div>
            );
        }else if(!hiddenProfile){
            return(
                <AccountToggleProfile 
                    onClose = {onClose}
                    />
            );
        }
    }

    return(
        <div>
            <Pointer pointRightpx = {pointRightpx}/>
            <ToggleTemplate> 
                {getUsedComponent()}
            </ToggleTemplate>
        </div>
    );
}

export default AccountHeaderToggleContainer;

const Pointer = styled.div`
    z-index:99;
    position: absolute;

    top:50px;
    right:${({ pointRightpx })=>pointRightpx};
    width:30px;
    height:30px;
    transform: rotateZ(45deg);

    background: #fff;
    // border: 1px solid #ccc;
    // border-color: rgba(0,0,0,.2);
    box-shadow: 0px 2px 12px rgba(0,0,0,.2);
    color:#000;

`

const ToggleTemplate = styled.div`
    position:absolute;
    z-index:100;
    display:flex;

    top:55px;
    right:10px;
    width:300px;
    height:auto;
    
    background: #fff;
    border: 1px solid #ccc;
    border-top: none;
    border-color: rgba(0,0,0,.2);
    box-shadow: 0px 4px 10px rgba(0,0,0,.2);
    color:#000;
    border-radius: 8px;

`