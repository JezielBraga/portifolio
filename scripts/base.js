setInterval(() => {
    document.querySelector("#time").textContent = new Date().toLocaleTimeString();
    document.querySelector("#date").textContent = new Date().toLocaleDateString();
});