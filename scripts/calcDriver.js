//POSICAO DO CURSOR
function toEnd(elem) {
    const end = elem.value.length;

    setTimeout(() => {
        elem.setSelectionRange(end, end);
    }, 0);
};

document.querySelectorAll(".money").forEach((input) => {
    input.addEventListener("focus", ({ target }) => toEnd(target));
});

//FORMATACAO
function toBRL(value = 0) {
    if (typeof (value) === "number")
        return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    else {
        let currentValue = value.replace(".", "");

        if (currentValue.length > 5)
            currentValue = `${currentValue.slice(0, -5)}.${currentValue.slice(-5)}`;

        if (currentValue.length > 9)
            currentValue = `${currentValue.slice(0, -9)}.${currentValue.slice(-9)}`;

        return `R$ ${currentValue.slice(0, -2)},${currentValue.slice(-2)}`;
    };
};

//MASCARA E LIMITACAO DE ENTRADA
function mascara(input) {
    let currentValue = input.value;

    currentValue = currentValue.replace(/\D/g, "");

    if (currentValue.length > 9)
        currentValue = currentValue.slice(0, 9);

    if (currentValue.length < 3)
        currentValue = "0" + currentValue;

    if (currentValue.length > 3 && currentValue[0] === "0")
        currentValue = currentValue.slice(1);

    input.value = toBRL(currentValue);
};

document.querySelectorAll(".money").forEach((input) => {
    input.addEventListener("input", () => mascara(input));
});

//LISTA DE GANHOS
const listGanhos = [];

function toNumber(value) {
    value = value.replaceAll(".", "");
    value = value.replace(",", ".");

    if (isNaN(parseFloat(value)))
        value = value.slice(3);

    return parseFloat(value);
};

function hideInput() {
    document.querySelector("#addInput").style.display = "none";
};

function showInput() {
    document.querySelector("#addInput").style.display = "block"
    document.querySelector("#ganho").focus();
    document.querySelector("#ganho").addEventListener("blur", function () {
        this.value === "R$ 0,00" && hideInput();
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
        })();
};

function createLi(value, index) {
    const li = document.createElement("li")
    li.className = "ganho-li";
    li.onclick = showInput;
    li.textContent = toBRL(value);

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

    document.querySelector("#ganho").value = "R$ 0,00";
    hideInput();
    updateList();
};

document.querySelector("#addButton").onclick = saveValue;

//CALCULOS
function getValues() {
    return [
        toNumber(document.querySelector("#km").value),
        toNumber(document.querySelector("#custoManutKm").value),
        toNumber(document.querySelector("#mediaCons").value),
        toNumber(document.querySelector("#custoCombus").value),
        toNumber(document.querySelector("#custoManutDia").value),
    ]
};

function calc() {
    const totalBruto = listGanhos.reduce((soma, valor) =>
        soma += valor, 0);

    const [
        km,
        custoManutKm,
        mediaCons,
        custoCombus,
        custoManutDia,
    ] = getValues();

    document.querySelector("#totalBruto").textContent = toBRL(totalBruto);

    document.querySelector("#totalKm").textContent =
        `${document.querySelector("#km").value}Km`;

    const totalCustoManut = km * custoManutKm + custoManutDia;
    document.querySelector("#totalCustoManut").textContent = toBRL(totalCustoManut);

    const litrosCons = km / mediaCons;
    document.querySelector("#litrosCons").textContent =
        `${litrosCons.toFixed(1).replace(".", ",")}L`;

    const totalCustoCombus = litrosCons * custoCombus;
    document.querySelector("#totalCustoCombus").textContent = toBRL(totalCustoCombus);

    document.querySelector("#totalLiq").textContent =
        toBRL(totalBruto - totalCustoManut - totalCustoCombus);
};

document.querySelector("#calcButton")
    .addEventListener("click", calc);