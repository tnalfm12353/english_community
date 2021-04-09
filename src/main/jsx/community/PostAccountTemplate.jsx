import React from 'react';
import styled from 'styled-components';
import ProfileButton from '../components/ProfileButton.jsx';
import TimeNotice from '../components/TimeNotice.jsx';

const PostAccountTemplate = ({time,account, updateButton}) =>{

    return(
        <Template>
                <ProfileButton bWidth = { "150px" } bHeight = { "30px" } account = {account}/>
                <TimeNotice time={time}/>
                <UpdateButtonTemp>
                    {updateButton}
                </UpdateButtonTemp>
        </Template>
    );
}

export default PostAccountTemplate;

const Template = styled.div`
    display:flex;
    width:100%;
`

const UpdateButtonTemp = styled.div`
    margin-left:auto;
`