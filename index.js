
var img = new Image()
canvas1 = document.getElementById('resized')
ctx = canvas1.getContext('2d');


const photoFile = document.getElementById('photo-file');

// SLIDER 1 VARS
let slider1 = document.getElementById("slider1");
let slider_value_label = document.getElementById('slider_value_label');

// QUALITY SLIDER VARS
let slider_quality = document.getElementById("slider_quality");
let slider_quality_label = document.getElementById('slider_quality_label');

document.getElementById('select-image').onclick = function () {
  photoFile.click()
}

window.addEventListener('DOMContentLoaded', () => {
  photoFile.addEventListener('change', () => {
    const file = photoFile.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      img.src = reader.result;
    };
    reader.readAsDataURL(file)
    reader
  });
  
})

img.onload = () => {
  let width = Math.floor(img.naturalWidth * 0.5)
  let height = Math.floor(img.naturalHeight * 0.5)
  canvas1.width = width;
  canvas1.height = height;
  //ctx.filter = "grayscale(100%)";
  ctx.drawImage(img, 0, 0 , width, height);
};

// SHOW SLIDER VALUES ON CHANGE
slider1.onchange = function () {
  slider_value_label.innerHTML = slider1.value + "% of original size -" + Math.floor(img.naturalWidth * (slider1.value/100)) + "x" + Math.floor(img.naturalHeight * (slider1.value/100))
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
  a.download = 'resized.jpg';
  a.href = canvas1.toDataURL('image/jpeg', slider_quality.value/10);
  a.click();
  console.log(slider1.value)
}




