var img = new Image()

// CANVAS
canvas1 = document.getElementById('resized')
ctx = canvas1.getContext('2d');


const photoFile = document.getElementById('photo-file');
let file_name = document.getElementById('file_name');

// SLIDER 1 VARS
let slider1 = document.getElementById("slider1");
let slider_value_label = document.getElementById('slider_value_label');
let output_label = document.getElementById('output_label');


// QUALITY SLIDER VARS
let slider_quality = document.getElementById("slider_quality");
let slider_quality_label = document.getElementById('slider_quality_label');

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
    
    file_name.innerHTML = file.name
    //returns the file name to use in the download button
    return file_name_for_download = file.name
  });

})

img.onload = () => {
  let width = Math.floor(img.naturalWidth * 0.5)
  let height = Math.floor(img.naturalHeight * 0.5)
  canvas1.width = width;
  canvas1.height = height;
  //ctx.filter = "grayscale(100%)";
  ctx.drawImage(img, 0, 0 , width, height);
  
  slider_value_label.innerHTML = slider1.value + "% of original size - " + Math.floor(img.naturalWidth * (slider1.value/100)) + " x " + Math.floor(img.naturalHeight * (slider1.value/100)) + " px"
  
};

// SHOW SLIDER VALUES ON CHANGE
slider1.onchange = function () {
  slider_value_label.innerHTML = slider1.value + "% of original size - " + Math.floor(img.naturalWidth * (slider1.value/100)) + " x " + Math.floor(img.naturalHeight * (slider1.value/100)) + " px"
  //output_label.innerHTML = slider1.value + "% of original size - " + Math.floor(img.naturalWidth * (slider1.value/100)) + " x " + Math.floor(img.naturalHeight * (slider1.value/100)) + " px"
}

slider_quality.onchange = function () {
  slider_quality_label.innerHTML = "Quality: " + slider_quality.value
}



// DOWNLOAD BUTTON

const download_button = document.getElementById('download_button');

download_button.onclick = function () { 
  let width = Math.floor(img.naturalWidth * (slider1.value/100))
  let height = Math.floor(img.naturalHeight * (slider1.value/100))
  canvas1.width = width;
  canvas1.height = height;
  //ctx.filter = "grayscale(100%)";

  ctx.drawImage(img, 0, 0 , width, height);
  const a = document.createElement('a');
  a.download = file_name_for_download.substring(0, file_name_for_download.length - 4) + '_resized.jpg';
  a.href = canvas1.toDataURL('image/jpeg', slider_quality.value/10);
  a.click();
  console.log(file_name_for_download)
}




