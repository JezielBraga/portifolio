const contents = Array.from(document.querySelectorAll(".contents"));

function showContentSection(sectionId = "cards") {
    document.querySelector("#" + sectionId).style.display = "flex";
};

showContentSection();

function hideContentSection(sectionId) {
    document.querySelector("#" + sectionId).style.display = "none";
};

//loop forOf