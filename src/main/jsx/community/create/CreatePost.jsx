import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as createPostActions from '../../redux/modules/CreatePost';
import styled from 'styled-components';

import { resizeFile } from '../../lib/api/fileConvert';
import CreatePostTemp from './CreatePostTemp.jsx';
import PostInputForm from './PostInputForm.jsx';
import PostEtcButton from './PostEtcButton.jsx';
import ImgPreviewTemp from './ImgPreviewTemp.jsx';
const CreatePost = ({onClose}) =>{
    const dispatch = useDispatch();
    
    const postInfo = useSelector(state => state.CreatePost.getIn(['post','inputValues'])).toJS();
    const files = useSelector(state => state.CreatePost.getIn(['post','files']));

    useEffect(()=>{
        //create post component를 생성하면 글이나 그림이 스크롤 생길 시 커뮤니티페이지의 스크롤을 방지하기 위해
        document.body.style.overflow = 'hidden';

        return(()=>{
            document.body.style.overflow = 'unset';
        });
    },[]);

    function handleInputChange(e){
        const { name , value } = e.target;
        dispatch(createPostActions.changeInput({
            name,
            value
        }));
    }
   
    function handleFileChange(e){

        let handleFiles;
        if (e.dataTransfer) {
            handleFiles = e.dataTransfer.files;
        } else if (e.target) {
            handleFiles = e.target.files;
        }
        const prevfiles = files.toJS();

        let id = 0;
        if(prevfiles.length !== 0 ){
            id = prevfiles[prevfiles.length-1].id;
        }

      
        for(let i=0;i<e.target.files.length;i++){
            const reader = new FileReader();
            reader.onload = () => {
                const mimeString = reader.result.split(',')[0].split(':')[1].split(';')[0];
                const image = new Image();
                image.src = reader.result;
                image.onload = () =>{
                    const file = resizeFile(image,mimeString);
                    id++;
                    dispatch(createPostActions.changeFile({
                        id,
                        file,
                    })); 
                }
            };            
            reader.readAsDataURL(handleFiles[i]);
        }
    }

    function handleRemoveFile(id){
        dispatch(createPostActions.removeFile({
            id
        }));
    }

    function handleCreatePost() {
        // title content 안쓰면 패스안되게 if문 버튼 색깔 추가랑 안눌려지게. 
        dispatch(createPostActions.createPost());
    }

    return(
        <Overlay  onClick={onClose}>
            <CreatePostTemp
                        inputform = {<PostInputForm
                            onChange = {handleInputChange}
                            title = {postInfo.title}
                            content = {postInfo.content}
                        />}
                        
                        etcbutton ={<PostEtcButton
                            onChange = {handleFileChange}
                        />}

                        etctem = {<ImgPreviewTemp
                            fileList ={ files }
                            onRemove = {handleRemoveFile}
                        />}

                    onClose = {onClose}
                    // nextStep={nextStep}
                    onCreate = {handleCreatePost}
            />
        </Overlay>
    );
}

export default CreatePost;

const Overlay = styled.div`
    position: fixed;
    width:100vw;
    height:100vh;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,.16);
    
    z-index:4;

    @media only screen and (max-width:767px){
        top:60px;
    }
`