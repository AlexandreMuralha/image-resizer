// CANVAS
canvas1 = document.getElementById('resized-canvas')
ctx = canvas1.getContext('2d');

var img = new Image()
const photoFile = document.getElementById('photo-file');
let fileName = document.getElementById('file-name');


// SLIDER 1 VARS
let sliderSize = document.getElementById("slider-size");
let sliderValueLabel = document.getElementById('slider-value-label');
//let outputLabel = document.getElementById('output-label');


// QUALITY SLIDER VARS
let sliderQuality = document.getElementById("slider-quality");
let sliderQualityLabel = document.getElementById('slider-quality-label');


// READ FILE
document.getElementById('select-image').onclick = function () {
  photoFile.click()
}

window.addEventListener('DOMContentLoaded', () => {
  photoFile.addEventListener('change', () => {
    var file = photoFile.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      img.src = reader.result;
    };
    reader.readAsDataURL(file)
    fileName.innerHTML = file.name
    //returns the file name to use in the download path:
    return file_name_for_download = file.name
  });

})

img.onload = () => {
  let width = Math.floor(img.naturalWidth )
  let height = Math.floor(img.naturalHeight )
  canvas1.width = width;
  canvas1.height = height;
  //ctx.filter = "grayscale(100%)";
  ctx.drawImage(img, 0, 0 , width, height);
  sliderValueLabel.innerHTML = sliderSize.value + "% of original size - " + Math.floor(img.naturalWidth * (sliderSize.value/100)) + " x " + Math.floor(img.naturalHeight * (sliderSize.value/100)) + " px"  
};


// SHOW SLIDER VALUES ON CHANGE
sliderSize.onchange = function () {
  sliderValueLabel.innerHTML = sliderSize.value + "% of original size - " + Math.floor(img.naturalWidth * (sliderSize.value/100)) + " x " + Math.floor(img.naturalHeight * (sliderSize.value/100)) + " px"
  //outputLabel.innerHTML = sliderSize.value + "% of original size - " + Math.floor(img.naturalWidth * (sliderSize.value/100)) + " x " + Math.floor(img.naturalHeight * (sliderSize.value/100)) + " px"
}
sliderQuality.onchange = function () {
  sliderQualityLabel.innerHTML = "Quality: " + sliderQuality.value
}


// DOWNLOAD BUTTON
const downloadButton = document.getElementById('download-button');

downloadButton.onclick = function () { 
  let width = Math.floor(img.naturalWidth * (sliderSize.value/100))
  let height = Math.floor(img.naturalHeight * (sliderSize.value/100))
  canvas1.width = width;
  canvas1.height = height;
  //ctx.filter = "grayscale(100%)";

  ctx.drawImage(img, 0, 0 , width, height);
  const a = document.createElement('a');
  a.download = file_name_for_download.substring(0, file_name_for_download.length - 4) + '_resized.jpg';
  a.href = canvas1.toDataURL('image/jpeg', sliderQuality.value/10);
  a.click();
  console.log(file_name_for_download)
}