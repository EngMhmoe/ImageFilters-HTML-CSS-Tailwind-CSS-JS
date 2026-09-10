// ==========================================================
// Selectors
// ==========================================================


// Image

let boxImg = document.getElementById("box-img");
let img = document.getElementById("img");


// Upload

let uploadInput = document.getElementById("ubLoad");


// Filters

let saturate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayscale = document.getElementById("grayscale");
let blur = document.getElementById("blur");
let hueRotate = document.getElementById("hue-rotate");
let invert = document.getElementById("invert");
let opacity = document.getElementById("opacity");
let dropShadow = document.getElementById("drop-shadow");


// Actions

let download = document.getElementById("download");
let reset = document.getElementById("rest");


// Canvas

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");


// Status

let filterStatus = document.getElementById("filterStatus");


// Filter Values

let saturateValue = document.getElementById("saturateValue");
let contrastValue = document.getElementById("contrastValue");
let brightnessValue = document.getElementById("brightnessValue");
let sepiaValue = document.getElementById("sepiaValue");
let grayscaleValue = document.getElementById("grayscaleValue");
let blurValue = document.getElementById("blurValue");
let hueRotateValue = document.getElementById("hueRotateValue");
let invertValue = document.getElementById("invertValue");
let opacityValue = document.getElementById("opacityValue");
let dropShadowValue = document.getElementById("dropShadowValue");


// ==========================================================
// Initial State
// ==========================================================

window.onload = function () {

    // Show the initial image

    boxImg.style.display = "flex";


    // Disable actions before uploading

    reset.classList.remove("disabled");
    download.classList.remove("disabled");

};


// ==========================================================
// Image Loaded
// ==========================================================

img.onload = function () {

    // Set Canvas size equal to image size

    canvas.width = img.width;
    canvas.height = img.height;


    // Draw original image

    context.filter = "none";

    context.drawImage(
        img,
        0,
        0,
        canvas.width,
        canvas.height
    );


    // Hide original image

    img.style.display = "none";

};


// ==========================================================
// Upload Image
// ==========================================================

uploadInput.onchange = function () {

    // Make sure the user selected an image

    if (uploadInput.files.length === 0) {
        return;
    }


    // Get selected file

    let file = uploadInput.files[0];


    // Create FileReader

    let reader = new FileReader();


    // Read image file

    reader.readAsDataURL(file);


    // When image is ready

    reader.onload = function () {

        // Set image source

        img.src = reader.result;

    };


    // Show image area

    boxImg.style.display = "flex";


    // Enable actions

    reset.classList.remove("disabled");
    download.classList.remove("disabled");


    // Reset filters

    resetFilters();

};


// ==========================================================
// Filters
// ==========================================================

let filters = [
    saturate,
    contrast,
    brightness,
    sepia,
    grayscale,
    blur,
    hueRotate,
    invert,
    opacity,
    dropShadow
];


filters.forEach(function (filter) {

    filter.addEventListener("input", function () {

        // Apply filters

        applyFilters();


        // Update values

        updateFilterValues();


        // Update status

        filterStatus.textContent = "Editing";

    });

});


// ==========================================================
// Apply Filters
// ==========================================================

function applyFilters() {

    // Set Canvas filters

    context.filter =
        "saturate(" + saturate.value + "%) " +
        "contrast(" + contrast.value + "%) " +
        "brightness(" + brightness.value + "%) " +
        "sepia(" + sepia.value + "%) " +
        "grayscale(" + grayscale.value + ") " +
        "blur(" + blur.value + "px) " +
        "hue-rotate(" + hueRotate.value + "deg) " +
        "invert(" + invert.value + "%) " +
        "opacity(" + opacity.value + "%) " +
        "drop-shadow(0 0 " + dropShadow.value + "px rgba(0, 0, 0, 0.8))";


    // Clear Canvas

    context.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // Draw image with filters

    context.drawImage(
        img,
        0,
        0,
        canvas.width,
        canvas.height
    );

}


// ==========================================================
// Update Filter Values
// ==========================================================

function updateFilterValues() {

    saturateValue.textContent =
        saturate.value + "%";


    contrastValue.textContent =
        contrast.value + "%";


    brightnessValue.textContent =
        brightness.value + "%";


    sepiaValue.textContent =
        sepia.value + "%";


    grayscaleValue.textContent =
        Math.round(grayscale.value * 100) + "%";


    blurValue.textContent =
        blur.value + "px";


    hueRotateValue.textContent =
        hueRotate.value + "°";


    invertValue.textContent =
        invert.value + "%";


    opacityValue.textContent =
        opacity.value + "%";


    dropShadowValue.textContent =
        dropShadow.value + "px";

}


// ==========================================================
// Default Filter Values
// ==========================================================

function defaultFilterValues() {

    saturate.value = "100";

    contrast.value = "100";

    brightness.value = "100";

    sepia.value = "0";

    grayscale.value = "0";

    blur.value = "0";

    hueRotate.value = "0";

    invert.value = "0";

    opacity.value = "100";

    dropShadow.value = "0";

}


// ==========================================================
// Reset Filters
// ==========================================================

function resetFilters() {

    // Set default values

    defaultFilterValues();


    // Remove Canvas filters

    context.filter = "none";


    // Draw original image again

    if (img.complete && img.src) {

        context.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        context.drawImage(
            img,
            0,
            0,
            canvas.width,
            canvas.height
        );

    }


    // Update values on screen

    updateFilterValues();


    // Update status

    filterStatus.textContent = "Original";

}


// ==========================================================
// Reset Button
// ==========================================================

reset.onclick = function () {

    // Stop if button is disabled

    if (reset.classList.contains("disabled")) {
        return;
    }


    // Reset all filters

    resetFilters();

};


// ==========================================================
// Download Image
// ==========================================================

download.onclick = function () {

    // Stop if button is disabled

    if (download.classList.contains("disabled")) {
        return;
    }


    // Convert Canvas to image

    download.href = canvas.toDataURL("image/png");

};