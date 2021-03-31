import React from 'react';
import styled from 'styled-components';
import {device} from '../lib/style/Device';


const CommunityBasicTemplate = ({content}) =>{

    return(
        <Container>
            {content}
        </Container>
    )

}

export default CommunityBasicTemplate;

const Container = styled.div`
    display:flex;
    flex-direction:column;
    width:70%;
    margin: 30px auto;

    background: #fff;
    border: 1px solid #ccc;
    border-color: rgba(0,0,0,.2);
    box-shadow: 0px 4px 10px rgba(0,0,0,.2);
    color:#000;
    border-radius: 8px;

    @media ${device.laptop}{
        width: 100%;
    }

    &+&{
        margin:60px auto;
    }
`