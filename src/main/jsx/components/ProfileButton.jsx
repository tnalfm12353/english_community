import React,{ useState,useEffect,useRef } from 'react';
import styled from 'styled-components';
import ProfileImage from './ProfileImage.jsx';
import ProfileToggle from './ProfileToggle.jsx';
const ProfileButton = ({bWidth,bHeight,account}) =>{

    const toggleContainer = useRef(null);
    const [toggle, setToggle] = useState(false);
    const [thumbnail,setThumbnail] = useState();
    const [nickname, setNickname] = useState();
    const [id, setId] = useState();

    useEffect(()=>{
        if(account != undefined){
            setNickname(account.nickname);
            setThumbnail(account.thumbnail);
            setId(account.id);
        }
    },[account])

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
        <ProfileButtonTemplate ref={toggleContainer} bWidth={bWidth} bHeight = {bHeight} onClick={handleSetToggle} toggle={toggle}>
            <ProfileButtonImage><ProfileImage thumbnail={thumbnail} nickname = {nickname}/></ProfileButtonImage>
            <ProfileButtonNickname>{nickname}</ProfileButtonNickname>
            {
            toggle?
                <ProfileToggle id = {id} />
                :null
            }
        </ProfileButtonTemplate>
    )
}

export default ProfileButton;

const ProfileButtonTemplate = styled.div`
    display:flex;
    position:relative;
    min-width: 100px;
    max-width: ${({bWidth})=> bWidth};
    height: ${({bHeight})=> bHeight};
    align-items:center;

    padding:.2rem .5rem;
    &: hover{
        background: #63646660;
    }
    box-shadow: 0px 4px 10px rgba(0,0,0,.1);
    border:${({toggle})=> toggle? `none`: `1px solid rgb(0 0 0 /35%)`};
    border-radius:${({toggle})=> toggle? `0px`: `8px`};
    background: ${({toggle})=> toggle? `#63646660`: `#00000000`};
`

const ProfileButtonImage = styled.div`
    float:left;
    width:28px;
    height:28px;
    border-radius: 100%;
`
const ProfileButtonNickname = styled.div`
    margin-left:10px;
    font-size:.8rem;
    font-weight:bold;

    white-space: nowrap;
`