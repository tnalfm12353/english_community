import React,{useState,useEffect,useRef} from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';

import HeaderDropdownTemp from './AccountHeaderToggleContainer.jsx';
import ProfileImage from '../components/ProfileImage.jsx';


const AccountHeaderButtons = () =>{

    const [hiddenProfile,setHiddenProfile] = useState(true);
    const [hiddenAlarm,setHiddenAlarm] = useState(true);
    const [hiddenTemp,setHiddenTemp] = useState(true);
    const toggleContainer = useRef(null);

    

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
                    <FontAwesomeIcon icon={faBell} size="2x" color="#636466"/>
                    :
                    <FontAwesomeIcon icon={faBell} size="2x" color="#ffca08"/>
                }
            </DropdownButton>
            <DropdownButton onClick={() => handleSetProfile()}>
                 <ProfileImage/>
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

export default AccountHeaderButtons;

const AccountHeaderProfileDiv = styled.div`
    display:flex;
    width:auto;
    height: 100%;
    align-items:center;
`
const DropdownButton = styled.button`
    width: 50px;
    height: 40px;
`