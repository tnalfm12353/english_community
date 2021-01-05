import React, { useState, useEffect, useRef } from 'react';
import MobileNaviButton from '../headerComponents/MobileNaviButton.jsx';
import MobileNaviPanel from '../headerComponents/MobileNaviPanel.jsx';

const MobileNavi = () =>{
    const [trigger, setTrigger] = useState(false);
    const mobileNaviRef = useRef(null);
    
    useEffect(()=>{
        if(trigger){
           window.addEventListener('click',onClickOutsideHandler);
        }
    },[trigger])
    
    function onClickOutsideHandler(e){
        if (!mobileNaviRef.current.contains(e.target)) {
            setTrigger(false);
        }
    }

    return(
        <div ref={mobileNaviRef}>
            <MobileNaviButton 
                trigger = {trigger}
                setTrigger = {setTrigger}
            />
            <MobileNaviPanel
                trigger = {trigger}
                setTrigger = {setTrigger}
            />
        </div>

    );
}

export default MobileNavi;

