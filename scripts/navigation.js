const contents = Array.from(document.querySelectorAll(".content"));
const cards = Array.from(document.querySelectorAll(".card"));
const homeButton = document.querySelector("#homeButton");

function hideAllContentSection() {
    contents.forEach(content => content.style.display = "none");
};

function showContentSection(sectionId = "homeLnk") {
    document.getElementById(sectionId.slice(0, -3)).style.display = "flex";
};

function toggleHomeButtonDisplay() {
    document.getElementById("home").style.display == "flex"
        ? homeButton.style.display = "none"
        : homeButton.style.display = "inline-block";
};

hideAllContentSection();
showContentSection();
toggleHomeButtonDisplay();

cards.forEach(card => {
    card.addEventListener("click", () => {
        hideAllContentSection();
        showContentSection(card.id);
        toggleHomeButtonDisplay();
    });
});

homeButton.addEventListener("click", () => {
    hideAllContentSection();
    showContentSection();
    toggleHomeButtonDisplay();
});