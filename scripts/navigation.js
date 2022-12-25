const contents = Array.from(document.querySelectorAll(".contents"));
const cards = Array.from(document.querySelectorAll(".card"));
const back = document.querySelector("#back");

function hideAllContentSection() {
    for (const element of contents) {
        element.style.display = "none";
    };
};

hideAllContentSection();

function showContentSection(sectionId = "cards" /* "contas-dst" */) {
    document.querySelector("#" + sectionId).style.display = "flex";
};

showContentSection();

function toggleBackButtonDisplay() {
    if (document.querySelector("#cards").style.display == "flex")
        back.style.display = "none";
    else
        back.style.display = "inline-block";
};

toggleBackButtonDisplay();

for (const element of cards) {
    element.addEventListener("click", () => {
        hideAllContentSection();
        showContentSection(element.id + "-dst");
        toggleBackButtonDisplay();
    });
};

back.addEventListener("click", () => {
    hideAllContentSection();
    showContentSection();
    toggleBackButtonDisplay();
});