const images = [
    "image1.jpg",  
    "image2.jpg",
    "image3.jpg",
    "image4.jpg"
];

let currentIndex = 0;

const imgElement = document.getElementById("carousel-image");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");

function updateImage() {
    imgElement.src = images[currentIndex];
}

nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
});

prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
});


updateImage(); 
