const listGanhos = [];

function toNumber(value) {
    return value == ""
        ? 0
        : parseFloat(value.replace(",", "."));
};

function hideInput() {
    document.querySelector("#addInput").style.display = "none";
};

function showInput() {
    document.querySelector("#addInput").style.display = "block"
    document.querySelector("#ganho").focus();
    document.querySelector("#ganho").addEventListener("blur", function () {
        this.value == "" && hideInput();
    });
};

document.querySelector("#listGanhos span").addEventListener("click", showInput);

function updateList() {
    document.querySelector("#listGanhos").replaceChildren();

    listGanhos.length > 0
        ? listGanhos.forEach((value, index) => {
            document.querySelector("#listGanhos").appendChild(createLi(value, index));
        })

        : (() => {
            const span = document.createElement("span");
            span.onclick = showInput;
            span.textContent = "R$ 0,00";
            document.querySelector("#listGanhos").replaceChildren(span);
        })()
};

function createLi(value, index) {
    const li = document.createElement("li")
    li.className = "ganho-li";
    li.onclick = showInput;
    li.textContent = `R$ ${value.toFixed(2).replace(".", ",")}`;

    const buttonLi = document.createElement("button");
    buttonLi.className = "button-li";
    buttonLi.onclick = () => {
        listGanhos.splice(index, 1);
        hideInput();
        updateList();
    };
    buttonLi.textContent = "X";

    li.appendChild(buttonLi);

    return li;
};

function saveValue() {
    let ganho = toNumber(document.querySelector("#ganho").value);
    listGanhos.push(ganho);

    document.querySelector("#ganho").value = "";
    hideInput();
    updateList();
};

document.querySelector("#addButton").onclick = saveValue;























function getValues() {
    return [
        toNumber(document.querySelector("#totalKm").value),
        toNumber(document.querySelector("#custoManut").value),
        toNumber(document.querySelector("#mediaCons").value),
        toNumber(document.querySelector("#custoCombus").value),
    ]
};

function calc() {
    //const [ganhos, totalKm, custoManut, mediaCons, custoCombus] = getValues();

    const total = listGanhos.reduce((soma, valor) =>
        soma += valor, 0);

    document.querySelector("#totalBruto").textContent = "R$ " + total.toFixed(2).replace(".", ",");
};

document.querySelector("#calcButton")
    .addEventListener("click", calc);