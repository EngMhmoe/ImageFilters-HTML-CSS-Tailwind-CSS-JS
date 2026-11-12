// ==========================================================
// DOM Elements
// ==========================================================

// Image Elements
window.emptyImage = document.getElementById("emptyImage");
window.boxImg = document.getElementById("box-img");
window.img = document.getElementById("img");
window.uploadInput = document.getElementById("ubLoad");


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 


// Filter Elements
window.saturate = document.getElementById("saturate");
window.contrast = document.getElementById("contrast");
window.brightness = document.getElementById("brightness");
window.sepia = document.getElementById("sepia");
window.grayscale = document.getElementById("grayscale");
window.blur = document.getElementById("blur");
window.hueRotate = document.getElementById("hue-rotate");
window.invert = document.getElementById("invert");
window.opacity = document.getElementById("opacity");
window.dropShadow = document.getElementById("drop-shadow");


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 


// Action Elements
window.download = document.getElementById("download");
window.reset = document.getElementById("rest");


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 


// Canvas Elements
window.canvas = document.getElementById("canvas");
window.context = canvas.getContext("2d");

window.originalCanvas = document.createElement("canvas");
window.originalContext = originalCanvas.getContext("2d");


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 


// Status Element
window.filterStatus = document.getElementById("filterStatus");


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 


// Filter Value Elements
window.filterValues = [
    document.getElementById("saturateValue"),
    document.getElementById("contrastValue"),
    document.getElementById("brightnessValue"),
    document.getElementById("sepiaValue"),
    document.getElementById("grayscaleValue"),
    document.getElementById("blurValue"),
    document.getElementById("hueRotateValue"),
    document.getElementById("invertValue"),
    document.getElementById("opacityValue"),
    document.getElementById("dropShadowValue")
];