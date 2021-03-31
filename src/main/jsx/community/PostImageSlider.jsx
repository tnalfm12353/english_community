import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { getImageApi } from '../lib/api/post/postApi';

const PostImageSlider = ({imagePaths}) =>{
    const [images, setImages] = useState([]);
    const [isExist, setIsExist] = useState(false);

    useEffect(()=>{
        if(imagePaths.length !== 0){
            imagePaths.map(({imagePath,id})=>{
                getImageApi(imagePath).then(result =>{
                const blob = new Blob([result],{type:"image/png"});
                convertBlobToImage(id,blob);
                });
            });
            
            setIsExist(true);
        }
    },[imagePaths])

    function convertBlobToImage(id,blob){
        const reader = new FileReader();
        reader.onload = () => {
            setImages(images =>[ // updater
                ...images,
                {
                    id: id,
                    original : reader.result
                }
            ]);
        };
        reader.readAsDataURL(blob);
    }

    return(
        isExist?
        <ImageSliderContainer>
            <ImageGallery items ={images} 
                showThumbnails={false}
                showBullets={true}
                showPlayButton={false}
            />
        </ImageSliderContainer>
        : null
    );
}

export default PostImageSlider;

const ImageSliderContainer = styled.div`
    width:100%;
    height:auto;

    margin:1rem 0;
`