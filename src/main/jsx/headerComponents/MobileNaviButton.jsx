import React from 'react';
import styled from 'styled-components';

const MobileNaviButton = ({trigger,setTrigger}) =>{

    return(
        <NaviButton trigger = {trigger} onClick={()=>setTrigger(!trigger)}>
            <div/>
            <div/>
            <div/>
        </NaviButton>
    );
}

export default MobileNaviButton;

const NaviButton = styled.button`
    position: absolute;
    top: 10px;
    left: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 2rem;
    height: 2rem;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 10;

    &:focus {
      outline: none;
    }

    div {
        width: 2rem;
        height: 0.25rem;
        background: rgba(99,100,102,1);
        border-radius: 10px;
        transition: all 0.3s linear;
        position: relative;
        transform-origin: 1px;
        
        :first-child {
          transform: ${({ trigger }) => trigger ? 'rotate(45deg)' : 'rotate(0)'};
          background:${({ trigger }) => trigger ? '#ffca08':'rgba(99,100,102,1)'};
        }
    
        :nth-child(2) {
          opacity: ${({ trigger }) => trigger ? '0' : '1'};
          transform: ${({ trigger }) => trigger ? 'translateX(20px)' : 'translateX(0)'};
        }
    
        :nth-child(3) {
          transform: ${({ trigger }) => trigger ? 'rotate(-45deg)' : 'rotate(0)'};
          background:${({ trigger }) => trigger ? '#ffca08':'rgba(99,100,102,1)'};
        }
    }
`