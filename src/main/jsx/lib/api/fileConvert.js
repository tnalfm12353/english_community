export function convertFile(file){
    console.log("Convert!");
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