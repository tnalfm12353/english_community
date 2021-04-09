import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import {device} from '../lib/style/Device';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown,faFire } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import ForumToggle from '../components/ForumToggle.jsx';
const ForumTypeSticky = () =>{

    const activeStyle = {
        color: '#ffca08'
    }
    
    const toggleContainer = useRef(null);
    const [toggle,setToggle] = useState(false);
    

    function handleSetToggle(){
        if(!toggle){
            setToggle(true);
        }else{
            setToggle(false);
        }
    }

    useEffect(()=>{
        if(toggle){
            window.addEventListener('click',onClickOutsideHandler);
        }

        return (() =>{
            window.removeEventListener('click',onClickOutsideHandler);
        });
    },[toggle])

    function onClickOutsideHandler(e){
        if (!toggleContainer.current.contains(e.target)) {
            handleSetToggle();
        }
    }

    return(
        <Sticky>
            <ForumTypeRadio ref={toggleContainer} onClick={handleSetToggle} toggle={toggle}>
                <span>General</span><FontAwesomeIcon icon={faAngleDown}/>
            </ForumTypeRadio>
            {toggle?
                <ForumToggle/>
                :
                null
            }
            {/* to = {/Community/forumType/post/hot or new} */}
            <ForumButton activeStyle={activeStyle} to={`/Community/general/post/hot`}>
                <FontAwesomeIcon icon={faFire}/><span>Hot</span>
            </ForumButton>
            <ForumButton activeStyle={activeStyle} to={`/Community/general/post/new`}>
                <FontAwesomeIcon icon={faPaperPlane}/><span>New</span>
            </ForumButton>
        </Sticky>
    )
}

export default ForumTypeSticky;


const Sticky =  styled.div`
    margin:auto;
    position:sticky;
    display:flex;
    top:50px;
    width: 70%;
    height:35px;
    
    z-index:5;
    background: rgba(255,255,255,.2);
    backdrop-filter: saturate(180%) blur(4px);
    border-bottom: 1px solid #eee;

    @media ${device.laptop}{
        width: 100%;
    }
`

const ForumTypeRadio = styled.div`
    display:flex;
    width:100px;
    height:100%;
    align-items:center;
    justify-content:center;
    font-size:1.1rem;
    font-weight:500;
    font-family:Kalam;

    border:${({toggle})=> toggle? `2px solid #ffca08`: `none`};
    border-bottom:none;
    background: ${({toggle})=> toggle? `#fff`: `#00000000`};


    color:#ffca08;

    span{
        margin-right:5px;
    }

    @media ${device.laptop}{
        width:80px;
        font-size:1rem;
    }

`
const ForumButton = styled(NavLink)`
    display:flex;
    margin-left:20px;
    width:80px;
    height:100%;
    align-items:center;
    justify-content:center;
    font-size: 1.2rem;
    font-weight: 500;
    font-family:Kalam;
    color:rgba(0,0,0,.5);
    
    span{
        margin-left:5px;
    }

    @media ${device.laptop}{
        width:60px;
        font-size:1rem;
    }


`