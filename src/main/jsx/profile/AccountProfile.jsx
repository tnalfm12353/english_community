import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import {Link} from 'react-router-dom';
import ProfileImage from '../components/ProfileImage.jsx';
import {getAccountProfile} from '../lib/api/account/AccountApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarcode, faBullhorn , faQuestion , faBook ,faCog ,faPencilAlt ,faGraduationCap, faChalkboardTeacher} from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { useSelector } from 'react-redux';
const AccountProfile = ({id}) =>{

    const [uId,setUId] = useState(null);
    const [thumbnail,setThumbnail] = useState(null);
    const [nickname ,setNickname] = useState(null);
    const [major , setMajor] = useState(null);
    const [position,setPosition] = useState(null);
    const [bio,setBio] =useState(null);

    const [owner,setOwner] = useState(false);
    // const accountId = useSelector(state=> state.Account.getIn(['account','id']));
    const account = useSelector(state=> state.Account.get('account'));

    function setData(){
        setUId(account.id);
        setNickname(account.nickname);
        setThumbnail(account.thumbnail);
        setBio(account.bio);
        setMajor(account.major);
        setPosition(account.position);
        setOwner(true);
    }
    useEffect(()=>{
        if(account.id == id){
            setData();
        }else{
            getAccountProfile(id).then(responsedata =>{
                setUId(responsedata.data.id);
                setThumbnail(responsedata.data.thumbnail);
                setNickname(responsedata.data.nickname);
                // setBio(responsedata.data.bio);
                setBio("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu quam tortor. Nulla venenatis libero eget lectus varius rutrum. Ut euismod tristique facilisis. Curabitur lobortis mattis egestas. Fusce gravida, magna vel sollicitudin pellentesque, nisi mi ullamcorper eros, a mattis lectus dui quis quam. In ut sodales urna, ultrices maximus sem. Nullam tempor dolor vitae consequat volutpat. Curabitur eu orci in eros facilisis facilisis ac in quam. Fusce sodales mattis nunc quis vulputate.");
                // setMajor(responsedata.data.major);
                setMajor("영어학부");
                setPosition(responsedata.data.position);
                setOwner(false);
            });
        }   
    },[id]);

    useEffect(()=>{setData();},[account]);

    function positionIcon(){
        switch(position){
            case "STUDENT" : return <Icon icon={faPencilAlt} top={"0"}/>
                break;
            case "GRADUATION": return <Icon icon={faGraduationCap} top={"0"}/>
                break;
            case "PROFESSOR" : return <Icon icon={faChalkboardTeacher} top={"0"}/>
                break;
            default : return <Icon icon={faQuestion} top={"0"}/>
                break;
        }
    }

    return(
        <AccountProfileContainer>
            { owner?<Link to={`/Profile/${uId}/settings/account`}><SettingIcon icon={faCog}/></Link>:null }
            <TextGroup><Icon icon={faBarcode} top={"2px"} /><TextDiv fontsize = {"1.3rem"}><p>{uId}</p></TextDiv></TextGroup>
            <AccountImage>
                <ProfileImage 
                    thumbnail = {thumbnail}
                    nickname = {thumbnail == null? nickname: null}/>
            </AccountImage>
            <TextGroup><Icon icon={faUser} top={"8px"}/><TextDiv fontsize = {"2rem"}><p>{nickname}</p></TextDiv></TextGroup>
            {major != null?<TextGroup><Icon icon={faBook} top={"8px"}/><TextDiv  fontsize = {"2rem"}><p>{major}</p></TextDiv></TextGroup>:null}
            {position != null?<TextGroup>{ positionIcon() }<TextDiv fontsize = {"1rem"}><p>{position}</p></TextDiv></TextGroup>:null}
            {bio != null?<TextGroup><Icon icon={faBullhorn} top={"2px"}/><TextDiv fontsize = {"1rem"}><p>{bio}</p></TextDiv></TextGroup>:null}
            {/* 이름, 학번 추가와 공개할 것인지 비공개 할것인지 추가로 해야댐. */}
        </AccountProfileContainer>
    );
}

export default AccountProfile;

const settingRotate = keyframes`
    0%{transform: rotate( 0deg );}
    25%{transform: rotate( 90deg );}
    50%{transform: rotate( 180deg );}
    75%{transform: rotate( 270deg );}
    100%{transform: rotate( 360deg );}
`
const SettingIcon = styled(FontAwesomeIcon)`
    position:relative;
    font-size:1.4rem;
    left:90%;
    
    animation-name: ${settingRotate};
    animation-duration: 10s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
`

const AccountProfileContainer = styled.div`
    width:70%;
    height:auto;
    margin:auto;
    display:flex;
    flex-direction:column;
`
const AccountImage = styled.div`
    max-width:300px;
    width: 100%;
    height: auto;
    
    border: 1px solid #ccc;
    border-color: rgba(0,0,0,.2);
    border-radius:10px;
    box-shadow: 0px 2px 12px rgba(0,0,0,.2);
`
const TextGroup = styled.div`
    display:flex;
    padding:.5em;
    width: 100%;
`
const Icon = styled(FontAwesomeIcon)`
    position:relative;
    top:${({top}) => top};
    font-size:1.2rem;
    color:#636466;
`
const TextDiv = styled.div`
    margin-left:1rem;
    font-size:${({fontsize}) => fontsize};
`