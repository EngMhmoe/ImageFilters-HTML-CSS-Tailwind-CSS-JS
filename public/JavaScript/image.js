// ==========================================================
// Initial State
// ==========================================================
window.initializeImageState = function () {

    // Show the empty image message
    emptyImage.style.display = "flex";

    // +++++++++++++++++++++++++++++++++++++++
    // +++++++++++++++++++++++++++++++++++++++

    // Hide Canvas before uploading
    canvas.style.display = "none";

    // +++++++++++++++++++++++++++++++++++++++
    // +++++++++++++++++++++++++++++++++++++++

    // Show the image area
    boxImg.style.display = "flex";

    // +++++++++++++++++++++++++++++++++++++++
    // +++++++++++++++++++++++++++++++++++++++

    // Disable actions before uploading
    reset.classList.add("disabled");
    download.classList.add("disabled");

};



// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 



// ==========================================================
// Image Loaded
// ==========================================================
img.onload = function () {

    // Set Canvas size equal to image size
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    // +++++++++++++++++++++++++++++++++++++++
    // +++++++++++++++++++++++++++++++++++++++

    // Set original Canvas size
    originalCanvas.width = img.naturalWidth;
    originalCanvas.height = img.naturalHeight;

    // +++++++++++++++++++++++++++++++++++++++
    // +++++++++++++++++++++++++++++++++++++++

    // Draw original image
    originalContext.drawImage(img, 0, 0);

    // +++++++++++++++++++++++++++++++++++++++
    // +++++++++++++++++++++++++++++++++++++++

    // Reset Canvas filters
    context.filter = "none";

    // +++++++++++++++++++++++++++++++++++++++
    // +++++++++++++++++++++++++++++++++++++++

    context.clearRect(0, 0, canvas.width, canvas.height);

    // +++++++++++++++++++++++++++++++++++++++
    // +++++++++++++++++++++++++++++++++++++++

    // Draw original image on Canvas
    context.drawImage(originalCanvas, 0, 0);

    // +++++++++++++++++++++++++++++++++++++++
    // +++++++++++++++++++++++++++++++++++++++

    // Update image interface
    img.style.display = "none";
    emptyImage.style.display = "none";
    canvas.style.display = "block";

    // +++++++++++++++++++++++++++++++++++++++
    // +++++++++++++++++++++++++++++++++++++++

    // Reset all filters
    resetFilters();

};



// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 



// ==========================================================
// Upload Image
// ==========================================================
uploadInput.onchange = function () {

    // Make sure the user selected an image
    if (uploadInput.files.length === 0) {
        return;
    }

    // +++++++++++++++++++++++++++++++++++++++
    // +++++++++++++++++++++++++++++++++++++++

    // Get selected file
    let file = uploadInput.files[0];

    // +++++++++++++++++++++++++++++++++++++++
    // +++++++++++++++++++++++++++++++++++++++

    // Validate image type
    if (!file.type.startsWith("image/")) {
        return;
    }

    // +++++++++++++++++++++++++++++++++++++++
    // +++++++++++++++++++++++++++++++++++++++

    // Create FileReader
    let reader = new FileReader();

    // +++++++++++++++++++++++++++++++++++++++
    // +++++++++++++++++++++++++++++++++++++++

    // Read image file
    reader.onload = function () {
        img.src = reader.result;
    };

    reader.readAsDataURL(file);

    // +++++++++++++++++++++++++++++++++++++++
    // +++++++++++++++++++++++++++++++++++++++

    // Show image area
    boxImg.style.display = "flex";

    // +++++++++++++++++++++++++++++++++++++++
    // +++++++++++++++++++++++++++++++++++++++

    // Enable actions
    reset.classList.remove("disabled");
    download.classList.remove("disabled");

};