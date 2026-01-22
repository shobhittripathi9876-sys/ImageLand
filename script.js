const images = [
  "images/img1.jpg",
  "images/img2.jpg",
  "images/img3.jpg",
  "images/img4.jpg",
  "images/img5.jpg"
];

const gallery = document.getElementById("gallery");
const searchInput = document.getElementById("searchInput");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentIndex = 0;

// Load gallery images
function loadGallery(imgArray) {
  gallery.innerHTML = "";
  imgArray.forEach((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    img.addEventListener("click", () => openLightbox(i));
    img.addEventListener("mousemove", (e) => {
      const rect = img.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      img.style.transform = `rotateX(${-(y-75)/20}deg) rotateY(${(x-100)/20}deg) scale(1.05)`;
    });
    img.addEventListener("mouseleave", () => {
      img.style.transform = "scale(1) rotateX(0deg) rotateY(0deg)";
    });
    gallery.appendChild(img);
  });
}
loadGallery(images);

// Search filter
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = images.filter(src => src.toLowerCase().includes(query));
  loadGallery(filtered);
});

// Lightbox functions
function openLightbox(i){
  currentIndex = i;
  lightbox.classList.add("show");
  lightboxImg.src = images[currentIndex];
}
function closeLightbox(){ lightbox.classList.remove("show"); }
function nextImage(){ currentIndex = (currentIndex+1) % images.length; lightboxImg.src = images[currentIndex]; }
function prevImage(){ currentIndex = (currentIndex-1 + images.length) % images.length; lightboxImg.src = images[currentIndex]; }

closeBtn.addEventListener("click", closeLightbox);
nextBtn.addEventListener("click", nextImage);
prevBtn.addEventListener("click", prevImage);

// Typing effect in hero
const typedText = document.getElementById("typed-text");
let fullText = "Find stunning images for your projects";
let i = 0;
function typeWriter(){
  if(i<fullText.length){
    typedText.innerHTML += fullText.charAt(i);
    i++;
    setTimeout(typeWriter,50);
  }
}
typedText.innerHTML = "";
typeWriter();