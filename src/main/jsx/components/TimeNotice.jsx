import React, { useEffect, useState } from 'react';
import { Switch } from 'react-router';
import styled from 'styled-components';
import Tooltip from './Tooltip.jsx';

const TimeNotice = ({time}) =>{

    const [date, setDate] = useState();
    const [createdDate, setCreatedDate] = useState();

    useEffect(()=>{
        if(time != undefined){
            const {year, monthValue, dayOfMonth, hour, minute, dayOfWeek} = time;
            const dayOfWeekKR = translateToKR(dayOfWeek);
            setCreatedDate(year+"년 "+monthValue+"월 "+dayOfMonth+"일 " +dayOfWeekKR+"요일 "+ " 🕓 " + hour+" : "+minute);
            const now = new Date();
            const created = new Date(year, monthValue-1, dayOfMonth, hour, minute);
            msToTime(now.getTime() - created.getTime());
        }else{
            setDate("3 분 전 (test)");
            setCreatedDate(2021+"년 "+3+"월 "+12+"일 " +"테스트"+"요일 "+ " 🕓 " + 3+" : "+33);
        }
    })

    function msToTime(duration) {
        const seconds = parseInt((duration/1000)%60);
        const minutes = parseInt((duration/(1000*60))%60);
        const hours = parseInt((duration/(1000*60*60))%24);
        const days = parseInt((duration/(1000*60*60*24))%30);
        const months = parseInt((duration/(1000*60*60*24*30))%4);
        const years = parseInt((duration/(1000*60*60*24*365))); // 10의 -n승으로 치환되서 앞의 값이 정수로 인식되는 에러가 있음.
        
        if(years != 0 && duration > 31600){
            setDate(years +"년 전");
        }else if(months != 0 && duration > 3000){
            setDate(months + "개월 전");
        }else if(days != 0){
            setDate(days + "일 전");
        }else if(hours != 0){
            setDate(hours + "시간 전");
        }else if(minutes != 0){
            setDate(minutes + "분 전");
        }else {
            setDate(seconds + "초 전");
        }
    }

    function translateToKR(dayOfWeek){
        switch(dayOfWeek){
            case "MONDAY": return "월";
            case "TUESDAY": return "화";
            case "WEDNESDAY": return "수";
            case "THURSDAY": return "목";
            case "FRIDAY": return "금";
            case "SATURDAY": return "토";
            case "SUNDAY": return "일";
        }
    }

    return(
        <TimeTemplate>
            <Time>{date}</Time>
            <TooltipTemplate>
                <Tooltip
                    content = {createdDate}
                    fontSize = {'.8rem'}
                />
            </TooltipTemplate>
        </TimeTemplate>
    )

}

export default TimeNotice;

const TimeTemplate = styled.div`
    align-self:center;
    margin: .5em;

`
const Time = styled.div`
    color:#77787b;
    font-size: .8rem;
`
const TooltipTemplate = styled.div`
    position:absolute;
    content-visibility: hidden;
    opacity:0;
    transition: all .5s;

    ${TimeTemplate}:hover &{
        content-visibility: visible;
        opacity:1;
    }
`