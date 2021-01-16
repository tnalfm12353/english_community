import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const AccountSettings = () => {

    const account = useSelector(state => state.Account.get('account'));

    const [password, setPassword] = useState(null);

    return(
        <AccountSettingsContainer>
            
            
        </AccountSettingsContainer>
    );
}

export default AccountSettings;

const AccountSettingsContainer = styled.div`
    display:flex;
    flex-direaction:column;
`