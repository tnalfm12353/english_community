import React from 'react';
import styled from 'styled-components';
import ProfileButton from '../components/ProfileButton.jsx';
import TimeNotice from '../components/TimeNotice.jsx';

const PostAccountTemplate = ({time,account}) =>{

    return(
        <Template>
                <ProfileButton bWidth = { "150px" } bHeight = { "30px" } account = {account}/>
                <TimeNotice time={time}/>
        </Template>
    );
}

export default PostAccountTemplate;

const Template = styled.div`
    display:flex;
`

const TitleTemplate = styled.div`
    display:flex;
    margin:.5rem;
`