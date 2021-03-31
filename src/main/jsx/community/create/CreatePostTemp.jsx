import React,{useState} from 'react';
import styled,{keyframes} from'styled-components';

const CreatePostTem =({onClose,inputform,etctem,etcbutton,nextStep,onCreate}) => {
    const [randomTitle] = useState(()=>{
        let initialState="";
        const random = Math.floor(Math.random()*5 + 1);
        
        switch(random){
            case 1: initialState = "How Do U Feeling Today?";
                break;
            case 2: initialState = "Are U Happy Now?";
                break;
            case 3: initialState = "Envy and wrath shorten the life";
                break;
            case 4: initialState = "temp2";
                break;
            case 5: initialState = "temp3";
                break;
        }
        return initialState
    });

    return(
        <CreateMain onClick={(e)=>e.stopPropagation()}>
            <Header>{randomTitle}</Header><CloseButton onClick={()=>onClose()}>&times;</CloseButton>
            <Line/>
            <ScrollBox>
                <InputWrapper>
                    {inputform}
                </InputWrapper>
                <EtcWrapper>
                    {etctem}
                </EtcWrapper>
            </ScrollBox>
            <EtcButton>
                {etcbutton}
            </EtcButton>
            <PostButton onClick={()=>{onCreate()}}>Create Post</PostButton>
        </CreateMain>
    );
}


export default CreatePostTem;

const FadeOut = keyframes`
    from{
        opacity:1;
    }
    to{
        opacity:0;
    }
`
const CreateMain = styled.main`
    display:flex;
    flex-direction: column;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -45%);
    width: 50vw;
    height:auto;
    border-radius: 10px;
    background-color: white;
    box-shadow: 0 3px 6px r gba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);

     @media only screen and (max-width: 767px){
        position:absolute;
        max-height:100%;
        top:40%;
        width:100%;
    }
`
const Line = styled.div`
    border:1px solid #eee;
    width:100%;
`

const Header = styled.div`
    flex-direction: row;
    width:100%;
    padding: .8em 0;
    display:inline-block;
    font-family: 'Kalam', cursive;
    font-size: 1.5rem;
    font-weight: bold;
    color:#fff;
    background:#ffca08;
    border-radius: 8px 8px 0 0;
    text-align:center;
`
const CloseButton = styled.div`
    display:inline;
    position:absolute;
    top:2%;
    left:93%;
    color: #e64980;
    font-size:2rem;
    font-weight:bold;

    @media only screen and (max-width: 767px){
        top:3%;
        left:91%;
        font-size:1.5rem;
    }
`
const ScrollBox = styled.div`
    max-height:65vh;
    overflow-y: auto;
`

const InputWrapper = styled.section`
    width:100%;
    height:auto;

`

const EtcWrapper = styled.section`
    margin-top:.5em;
    width:99%;
    height:auto;
    margin:auto;
`
const EtcButton = styled.div`
    margin-top:.5em;
    width:100%;
    height:7vh;
`

const PostButton = styled.div`
    margin:.5em auto;
    padding:5px;
    width: 95%;

    color:#fff;
    font-family: 'Kalam', cursive;
    font-size: 1.5rem;
    text-align: center;
    
    border:1px solid #fcc600;
    border-radius:5px;
    background:#ffca00cc;
    box-shadow: 0 1.5px 3px rgba(0,0,0,0.16), 0 1.5px 3px rgba(0,0,0,0.23);
`