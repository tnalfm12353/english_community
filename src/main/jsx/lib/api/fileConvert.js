export function resizeFile(image, mimeString){
    let canvas = document.createElement("canvas");
    let width = image.width;
    let height = image.height;

    const maxScale = 1280;

    if(width > height){
        if(width > maxScale){
            height *= maxScale / width; // ex 1280/ 2560  = 1/2 * height
            width = maxScale;
        }
    }else{
        if(height > maxScale){
            width *= maxScale / height;
            height = maxScale;
        }
    }

    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d").drawImage(image, 0, 0, width, height);
    return canvas.toDataURL(mimeString);
}

export function dataURLtoBlob(file){
    // convert base64 to raw binary data held in a string
    let byteString;
    if (file.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(file.split(',')[1]);
    else
        byteString = unescape(file.split(',')[1]);

    // separate out the mime component
    let mimeString = file.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    let ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}