import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const EllipsisButton = ({toggle,setToggle}) =>{
    const toggleContainer = useRef();
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
            setToggle(!toggle);
        }
    }

    return(
        <ButtonTemplate ref={toggleContainer} toggle={toggle} onClick={()=>{setToggle(!toggle)}}>
            <FontAwesomeIcon icon={faEllipsisV}/>
        </ButtonTemplate>
    );
}

export default EllipsisButton;

const ButtonTemplate = styled.div`
    padding:6px 15px;
    border-radius:4px;
    border:${({toggle})=>toggle?`1px solid #63646630`:`none`};
    background:${({toggle})=>toggle?`#63646620`:`rgba(0,0,0,0)`};
`