import { Rgb } from "../types/Color";

export const base64ToArrayBuffer = (base64 : string) => {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

export const arrayBufferToDataUri = (buffer : any) => {
  var binary = '';
  var bytes = new Uint8Array(buffer.data);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
  }
  return `data:image/png;base64,${window.btoa(binary)}`;
}

export const dataURItoBlob = (dataURI : string | undefined) => {
    if(dataURI){
        var byteString = window.atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        var blob = new Blob([ab], {type: mimeString});
        return blob;
    }
  }

  export const blobToDataURL = (blob : Blob | undefined, callback : (value : any) => void) => {
    var a = new FileReader();
    a.onload = (e) => callback(e.target?.result);
    a.readAsDataURL(blob || new Blob());
}

export const hexToRgb = (hexColor: string): Rgb | null => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
    return result ? {
      red: parseInt(result[1], 16),
      green: parseInt(result[2], 16),
      blue: parseInt(result[3], 16)
    } as Rgb: null;
  }