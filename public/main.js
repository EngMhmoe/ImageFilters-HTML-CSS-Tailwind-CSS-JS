// ==========================================================
// Selectors
// ==========================================================


// Image
let emptyImage = document.getElementById("emptyImage");
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

let originalCanvas = document.createElement("canvas");
let originalContext = originalCanvas.getContext("2d");

let tempCanvas = document.createElement("canvas");
let tempContext = tempCanvas.getContext("2d");




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





/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





// ==========================================================
// Initial State
// ==========================================================

// ==========================================================
// Initial State
// ==========================================================

window.onload = function () {

    // Show the empty image message
    emptyImage.style.display = "flex";

    // Hide Canvas before uploading
    canvas.style.display = "none";


    // Show the image area
    boxImg.style.display = "flex";


    // Disable actions before uploading
    reset.classList.add("disabled");
    download.classList.add("disabled");

};





/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





// ==========================================================
// Image Loaded
// ==========================================================

// img.onload = function () {

//     // Set Canvas size equal to image size

//     canvas.width = img.naturalWidth;
//     canvas.height = img.naturalHeight;


//     // Draw original image

//     context.filter = "none";

//     context.drawImage(
//         img,
//         0,
//         0,
//         canvas.width,
//         canvas.height
//     );


//     // Hide original image

//     img.style.display = "none";


//     // Hide empty image message

//     emptyImage.style.display = "none";


//     // Show Canvas

//     canvas.style.display = "block";

// };

img.onload = function () {

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    originalCanvas.width = img.naturalWidth;
    originalCanvas.height = img.naturalHeight;

    tempCanvas.width = img.naturalWidth; 
    tempCanvas.height = img.naturalHeight;

    originalContext.clearRect(
        0,
        0,
        originalCanvas.width,
        originalCanvas.height
    );

    originalContext.drawImage(
        img,
        0,
        0,
        originalCanvas.width,
        originalCanvas.height
    );

    context.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    context.drawImage(
        originalCanvas,
        0,
        0
    );

    img.style.display = "none";
    emptyImage.style.display = "none";
    canvas.style.display = "block";

};




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





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





/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





// ==========================================================
// Filters
// ==========================================================
let filterFrame = null;

function scheduleApplyFilters() {

    if (filterFrame !== null) {
        return;
    }

    filterFrame = requestAnimationFrame(function () {

        applyFilters();

        filterFrame = null;

    });

}

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

        // schedule Apply Filters

        scheduleApplyFilters();


        // Update values

        updateFilterValues();


        // Update status

        filterStatus.textContent = "Editing";

    });

});





/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





// ==========================================================
// Apply Filters
// ==========================================================

// function applyFilters() {

//     // Set Canvas filters

//     context.filter =
//         "saturate(" + saturate.value + "%) " +
//         "contrast(" + contrast.value + "%) " +
//         "brightness(" + brightness.value + "%) " +
//         "sepia(" + sepia.value + "%) " +
//         "grayscale(" + grayscale.value + ") " +
//         "blur(" + blur.value + "px) " +
//         "hue-rotate(" + hueRotate.value + "deg) " +
//         "invert(" + invert.value + "%) " +
//         "opacity(" + opacity.value + "%) " +
//         "drop-shadow(0 0 " + dropShadow.value + "px rgba(0, 0, 0, 0.8))";


//     // Clear Canvas

//     context.clearRect(
//         0,
//         0,
//         canvas.width,
//         canvas.height
//     );


//     // Draw image with filters

//     context.drawImage(
//         img,
//         0,
//         0,
//         canvas.width,
//         canvas.height
//     );

// }

function applyFilters() {

    context.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    context.drawImage(
        originalCanvas,
        0,
        0
    );

    let imageData = context.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
    );

    imageData = applyColorFilters(imageData);

    imageData = applyBlur(imageData, blur.value);

    applyDropShadow(imageData, dropShadow.value);

    // context.putImageData(
    //     imageData,
    //     0,
    //     0
    // );

}

function applyColorFilters(imageData) {

    let data = imageData.data;

    let saturation = Number(saturate.value) / 100;
    let contrastValue = Number(contrast.value) / 100;
    let brightnessValue = Number(brightness.value) / 100;
    let sepiaValue = Number(sepia.value) / 100;
    let grayscaleValue = Number(grayscale.value);
    let hue = Number(hueRotate.value) * Math.PI / 180;
    let invertValue = Number(invert.value) / 100;
    let opacityValue = Number(opacity.value) / 100;

    let cos = Math.cos(hue);
    let sin = Math.sin(hue);

    for (let i = 0; i < data.length; i += 4) {

        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];

        let gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;

        r = gray + (r - gray) * saturation;
        g = gray + (g - gray) * saturation;
        b = gray + (b - gray) * saturation;

        r = (r - 128) * contrastValue + 128;
        g = (g - 128) * contrastValue + 128;
        b = (b - 128) * contrastValue + 128;

        r *= brightnessValue;
        g *= brightnessValue;
        b *= brightnessValue;

        let sepiaR = r * 0.393 + g * 0.769 + b * 0.189;
        let sepiaG = r * 0.349 + g * 0.686 + b * 0.168;
        let sepiaB = r * 0.272 + g * 0.534 + b * 0.131;

        r += (sepiaR - r) * sepiaValue;
        g += (sepiaG - g) * sepiaValue;
        b += (sepiaB - b) * sepiaValue;

        gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;

        r += (gray - r) * grayscaleValue;
        g += (gray - g) * grayscaleValue;
        b += (gray - b) * grayscaleValue;

        let hueR =
            (0.213 + cos * 0.787 - sin * 0.213) * r +
            (0.715 - cos * 0.715 - sin * 0.715) * g +
            (0.072 - cos * 0.072 + sin * 0.928) * b;

        let hueG =
            (0.213 - cos * 0.213 + sin * 0.143) * r +
            (0.715 + cos * 0.285 + sin * 0.140) * g +
            (0.072 - cos * 0.072 - sin * 0.283) * b;

        let hueB =
            (0.213 - cos * 0.213 - sin * 0.787) * r +
            (0.715 - cos * 0.715 + sin * 0.715) * g +
            (0.072 + cos * 0.928 + sin * 0.072) * b;

        r = hueR + (255 - 2 * hueR) * invertValue;
        g = hueG + (255 - 2 * hueG) * invertValue;
        b = hueB + (255 - 2 * hueB) * invertValue;

        data[i] = Math.max(0, Math.min(255, r));
        data[i + 1] = Math.max(0, Math.min(255, g));
        data[i + 2] = Math.max(0, Math.min(255, b));
        data[i + 3] *= opacityValue;

    }

    return imageData;

}   

function applyBlur(imageData, radius) {

    radius = Math.round(Number(radius));

    if (radius <= 0) {
        return imageData;
    }

    let width = imageData.width;
    let height = imageData.height;
    let source = imageData.data;

    let horizontal = new Float32Array(source.length);
    let output = new Uint8ClampedArray(source.length);

    let size = radius * 2 + 1;

    for (let y = 0; y < height; y++) {

        let sums = [0, 0, 0, 0];

        for (let k = -radius; k <= radius; k++) {

            let x = Math.max(0, Math.min(width - 1, k));
            let index = (y * width + x) * 4;

            for (let c = 0; c < 4; c++) {
                sums[c] += source[index + c];
            }

        }

        for (let x = 0; x < width; x++) {

            let index = (y * width + x) * 4;

            for (let c = 0; c < 4; c++) {
                horizontal[index + c] = sums[c] / size;
            }

            let removeX = Math.max(0, x - radius);
            let addX = Math.min(width - 1, x + radius + 1);

            let removeIndex = (y * width + removeX) * 4;
            let addIndex = (y * width + addX) * 4;

            for (let c = 0; c < 4; c++) {
                sums[c] += horizontal[0] * 0;
                sums[c] -= source[removeIndex + c];
                sums[c] += source[addIndex + c];
            }

        }

    }

    for (let x = 0; x < width; x++) {

        let sums = [0, 0, 0, 0];

        for (let k = -radius; k <= radius; k++) {

            let y = Math.max(0, Math.min(height - 1, k));
            let index = (y * width + x) * 4;

            for (let c = 0; c < 4; c++) {
                sums[c] += horizontal[index + c];
            }

        }

        for (let y = 0; y < height; y++) {

            let index = (y * width + x) * 4;

            for (let c = 0; c < 4; c++) {
                output[index + c] = sums[c] / size;
            }

            let removeY = Math.max(0, y - radius);
            let addY = Math.min(height - 1, y + radius + 1);

            let removeIndex = (removeY * width + x) * 4;
            let addIndex = (addY * width + x) * 4;

            for (let c = 0; c < 4; c++) {
                sums[c] -= horizontal[removeIndex + c];
                sums[c] += horizontal[addIndex + c];
            }

        }

    }

    imageData.data.set(output);

    return imageData;

}

function applyDropShadow(imageData, radius) {

    radius = Number(radius);

    if (radius <= 0) {

    context.putImageData(
        imageData,
        0,
        0
    );

    return;

    }

    tempCanvas.width = imageData.width;
    tempCanvas.height = imageData.height;

    tempContext.clearRect(
        0,
        0,
        tempCanvas.width,
        tempCanvas.height
    );

    tempContext.putImageData(
        imageData,
        0,
        0
    );

    context.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    context.shadowColor = "rgba(0, 0, 0, 0.8)";
    context.shadowBlur = radius;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;

    context.drawImage(
        tempCanvas,
        0,
        0
    );

    context.shadowColor = "transparent";
    context.shadowBlur = 0;

    context.drawImage(
        tempCanvas,
        0,
        0
    );

}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





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





/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





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





/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





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





/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





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





/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





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