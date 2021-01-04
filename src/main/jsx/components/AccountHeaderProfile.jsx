import React,{useState,useEffect,useRef} from 'react';
import {useSelector} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import HeaderDropdownTemp from './HeaderDropdownTemp.jsx';

import Jdenticon from 'react-jdenticon';
import styled from 'styled-components';

const AccountHeaderProfile = () =>{

    const [hiddenProfile,setHiddenProfile] = useState(true);
    const [hiddenAlarm,setHiddenAlarm] = useState(true);
    const [hiddenTemp,setHiddenTemp] = useState(true);
    const toggleContainer = useRef(null);

    const account = useSelector(state => state.Account.get('account'));

    function handleSetAlarm (){
        if(!hiddenProfile){
            setHiddenProfile(true);
        }

        if(hiddenAlarm){
            setHiddenAlarm(false);
        }else{
            setHiddenAlarm(true);
        }
    }

    function handleSetProfile (){
        if(!hiddenAlarm){
            setHiddenAlarm(true);
        }

        if(hiddenProfile){
            setHiddenProfile(false);
        }else{
            setHiddenProfile(true);
        }
    }

    function handleClose(){
        setHiddenAlarm(true);
        setHiddenProfile(true);
        setHiddenTemp(true);
    }
    
    useEffect(()=>{

        if(!hiddenAlarm || !hiddenProfile){
            setHiddenTemp(false);
        }else{
            setHiddenTemp(true);
        }

    })

    useEffect(()=>{
        if(!hiddenTemp){
           window.addEventListener('click',onClickOutsideHandler);
        }
    },[hiddenTemp])
    
    function onClickOutsideHandler(e){
        if (!toggleContainer.current.contains(e.target)) {
            handleClose();
        }
    }

    return(
        <AccountHeaderProfileDiv ref={toggleContainer}>
            <DropdownButton onClick={() => handleSetAlarm()}>
                {
                    hiddenAlarm?
                    <FontAwesomeIcon icon={faBell} size="lg" color="#636466"/>
                    :
                    <FontAwesomeIcon icon={faBell} size="lg" color="#ffca08"/>
                }
            </DropdownButton>
            <DropdownButton onClick={() => handleSetProfile()}>
                <Jdenticon size="2rem" value = {account.nickname} />
            </DropdownButton>
            {
                hiddenTemp? null:
                <HeaderDropdownTemp
                    hiddenAlarm = {hiddenAlarm}
                    hiddenProfile = {hiddenProfile}
                />
            }
        </AccountHeaderProfileDiv>
    );
}

export default AccountHeaderProfile;

const AccountHeaderProfileDiv = styled.div`
    display:flex;
    width:auto;
    height: 100%;
    align-items:center;
`
const DropdownButton = styled.button`
    margin: 0 .5em;
    font-size: larger;
`