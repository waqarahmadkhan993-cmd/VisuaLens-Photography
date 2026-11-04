
const filterButtons = document.querySelectorAll(".filter-btn");
const photoCards = document.querySelectorAll(".photo-card");
const noResults = document.getElementById("noResults");
const galleryGrid = document.getElementById("galleryGrid");

// Category filter
filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const category = button.dataset.filter;
        let count = 0;

        filterButtons.forEach(function(item) {
            item.classList.toggle("active", item === button);
        });

        photoCards.forEach(function(card) {
            const show =
                category === "all" ||
                card.dataset.category === category;

            card.hidden = !show;

            if (show) {
                count++;
            }
        });

        noResults.hidden = count > 0;
        galleryGrid.style.display = count > 0 ? "block" : "none";
    });
});

// Mobile navigation
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", function() {
    nav.classList.toggle("open");

    menuBtn.textContent =
        nav.classList.contains("open") ? "×" : "☰";
});

// Close mobile menu after clicking a link
nav.querySelectorAll("a").forEach(function(link) {
    link.addEventListener("click", function() {
        nav.classList.remove("open");
        menuBtn.textContent = "☰";
    });
});

// Image lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const caption = document.getElementById("lightboxCaption");
const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;

function openImage(index) {
    currentIndex = index;

    const card = photoCards[currentIndex];
    const img = card.querySelector("img");
    const title = card.querySelector("h3").textContent;

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    caption.textContent = title;

    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeImage() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
}

function changeImage(direction) {
    currentIndex =
        (currentIndex + direction + photoCards.length) %
        photoCards.length;

    openImage(currentIndex);
}

photoCards.forEach(function(card, index) {
    card.addEventListener("click", function() {
        openImage(index);
    });
});

closeBtn.addEventListener("click", closeImage);

prevBtn.addEventListener("click", function() {
    changeImage(-1);
});

nextBtn.addEventListener("click", function() {
    changeImage(1);
});

lightbox.addEventListener("click", function(event) {
    if (event.target === lightbox) {
        closeImage();
    }
});

document.addEventListener("keydown", function(event) {
    if (!lightbox.classList.contains("open")) return;

    if (event.key === "Escape") closeImage();
    if (event.key === "ArrowLeft") changeImage(-1);
    if (event.key === "ArrowRight") changeImage(1);
});
