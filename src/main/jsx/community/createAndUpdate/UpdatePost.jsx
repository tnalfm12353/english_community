import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UpdatePostTemp from './PostCreateOrUpdateTemp.jsx';
const UpdatePost = ({post,onClose}) =>{

    const [editPost, setEditPost] = useState(post);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        console.log(editPost);
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, []);

    function handleInputChange(e){
        const { name, value } = e.target;
        setEditPost({name:value})
    }

    function handleFileChange(){

    }

    function handleRemoveFile(){

    }

    function handleUpdatePost(){
        
    }

    return(
        <Overlay  onClick={onClose}>
            <UpdatePostTemp
                        inputform = {<PostInputForm
                            onChange = {handleInputChange}
                            title = {post.title}
                            content = {post.content}
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
                    onCreateOrUpdate = {handleUpdatePost}
                    buttonValue = {"Update Post"}
            />
        </Overlay>
    );

}

export default UpdatePost;

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