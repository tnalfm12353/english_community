import React, { useState } from 'react';
import styled from 'styled-components';
import Cropper from 'react-cropper';
import "cropperjs/dist/cropper.css";

import UpdateButtonTemp from './UpdateButtonTemp.jsx';
import { useDispatch } from 'react-redux';

import { updateThumbnailApi } from '../lib/api/account/AccountApi';
import { updateData } from '../redux/modules/Account.js';

const ThumbnailModal = ({onClose}) =>{
    const dispatch = useDispatch();
    const formData = new FormData();

    const [image, setImage] = useState(null);
    const [cropper, setCropper] = useState(null);
    

    const onChange = (e) =>{
        e.preventDefault();

        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        console.log(files[0]);
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
    };

    const getCropDataThenUpdate = () => {
        if (typeof cropper !== "undefined") {
            cropper.getCroppedCanvas({width:400, height:400}).toBlob((blob)=>{
                formData.append('thumbnail',blob);
                updateThumbnailApi(formData).then((result)=>{
                    dispatch(updateData({
                        name:"thumbnail",
                        value:result.response.data
                    }));
                });
                onClose();
            });
        }
    };

    const handleDeleteThumbnail = () =>{

        //이전에 프로필이 존재한다면 지움 없으면 그냥 리턴.
        // deleteThumbnailApi()
        onClose();
    }


    return(
        <ContentContainer>
            <Content>
                {image == null?<ResetButton onClick={handleDeleteThumbnail}>프로필 사진 없애기</ResetButton> : null}
                <input type="file" accept="image/*" onChange={onChange} />
                <br/>
                <Cropper
                    style={{ minHeight: "400px",height:"100%", width: "100%" }}
                    aspectRatio={4/3}
                    
                    src={image}
                    viewMode={3}
                    guides={true}
                    minCropBoxHeight={100}
                    minCropBoxWidth={100}
                    background={false}
                    responsive={true}
                    autoCropArea={1}
                    checkOrientation={false}
                    onInitialized={(instance) => {
                        setCropper(instance);
                    }}
                />
            </Content>
            <UpdateButtonTemp
                buttonValue = {"프로필 사진으로 설정"}
                valid = {true}
                updateData = {getCropDataThenUpdate}
                onClose={onClose}
            >
            </UpdateButtonTemp>
        </ContentContainer>
    );
}

export default ThumbnailModal;

const ContentContainer = styled.div`
    display:flex;
    flex-direction:column;
`

const Content = styled.div`
    padding:1rem;
    border-bottom:1px solid #ccc;
`

const ResetButton = styled.button`
    font-weight:bold;
    color:#fff;

    border:1px solid #ff8080;
    border-radius:5px;
    background:#ff8080cc;
    padding: .4em;
`