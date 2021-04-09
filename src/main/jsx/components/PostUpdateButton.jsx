import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import EllipsisButton from './EllipsisButton.jsx';

const PostUpdateButton = ({account, ownerToggleContent, guestToggleContent}) =>{
    const myAccount = useSelector(state => state.Account.get('account'));
    const authenticated = useSelector(state => state.Account.get('authenticated'));
    const [toggle, setToggle] =useState(false);

    function selectToggleContent(){
        if(authenticated && account.id === myAccount.id){
            return ownerToggleContent
        }
        return guestToggleContent
    }


    return(
        <UpdateContainer>
            <EllipsisButton toggle={toggle} setToggle ={setToggle}/>
            {toggle?
                selectToggleContent()
                :
                null
            }
        </UpdateContainer>
    );
}

export default PostUpdateButton;

const UpdateContainer = styled.div`
    position:relative;
`