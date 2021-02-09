import React, { useState } from 'react';
import styled from 'styled-components';
import Cropper from 'react-cropper';
import "cropperjs/dist/cropper.css";

import UpdateButtonTemp from './UpdateButtonTemp.jsx';
import { useDispatch } from 'react-redux';

import { updateThumbnailApi, deleteThumbnailApi } from '../lib/api/account/AccountApi';
import { updateData } from '../redux/modules/Account.js';
import ImageFileUploader from '../components/ImageFileUploader.jsx';
import TextFileUploader from '../components/TextFileUploader.jsx';

const ThumbnailModal = ({onClose}) =>{
    const dispatch = useDispatch();
    const formData = new FormData();

    const [imageName, setImageName] = useState(null);
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
            setImageName(files[0].name);
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
        deleteThumbnailApi().then(()=>{
            dispatch(updateData({
            name:"thumbnail",
            value:null
            }));
        });
        onClose();
    }


    return(
        <ContentContainer>
            <Content>
            {image == null?
            <BeforeFileUpload>
                <ImageFileUploader imageSize={"15em"} imageColor={"#c8c8c8"} isMultiple={false} onChange={onChange}/>
                <DescriptionSpan>그림을 눌려 프로필 사진을 설정하세요</DescriptionSpan>
                <ResetButton onClick={handleDeleteThumbnail}>프로필 사진 없애기</ResetButton>
            </BeforeFileUpload>
                :
            <AfterFileUpload>
                <TextFileUploader imageName={imageName} isMultiple={false} onChange={onChange}/>
                <ChangeDescription>이미지를 변경하려면 위 영역 사진 업로드를 클릭하여 프로필 사진을 변경하세요</ChangeDescription>
                <Cropper
                    style={{height:"auto", width: "auto" }}
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
                <ThumbnailDescription>원하는 영역을 드래그한 후 '프로필 사진으로 설정'을 클릭하세요</ThumbnailDescription>
            </AfterFileUpload>
            }       
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
    position:absolute;
    font-weight:bold;
    color:#fff;
    
    border:1px solid #ff8080;
    border-radius:5px;
    background:#ff8080cc;
    padding: .4em;

    bottom:5%;
    right:0;
`

const DescriptionSpan = styled.span`
    position:absolute;
    font-weight: bold;
    color:#c8c8c8;

    bottom:20%;
    left:35%;
    @media only screen and (max-width: 900px){
        left:25%;
    }
    @media only screen and (max-width: 500px){
        left:15%;
    }
`

const BeforeFileUpload = styled.div`
    position:relative;
    height:400px;
    padding-top:5%;
`

const AfterFileUpload = styled.div`
    display:flex;
    flex-direction:column;
    min-height:400px;
`

const ChangeDescription = styled.span`
    margin: 1em 0;
    font-size:0.8rem;
`

const ThumbnailDescription = styled.span`
    margin: 1em auto;
`