//POSICAO DO CURSOR
function toEnd(input) {
    const end = input.value.length;

    setTimeout(() => {
        input.setSelectionRange(end, end);
    }, 0);
};

document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("focus", ({ target }) => toEnd(target));
});

//FORMATACAO
function toBRL(number = 0) {
    return number.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

//MASCARA E AJUSTE DE ENTRADA
function mascara(input) {
    let currentValue = input.value;

    currentValue = currentValue.replace(/\D/g, "");

    if (input.className === "money") {
        if (currentValue.length > 9)
            currentValue = currentValue.slice(0, 9);

        if (currentValue.length > 3 && currentValue[0] === "0")
            currentValue = currentValue.slice(1);

        if (currentValue.length < 3)
            currentValue = "0" + currentValue;

        let number = currentValue.length < 3
            ? parseFloat(currentValue)
            : parseFloat(`${currentValue.slice(0, -2)}.${currentValue.slice(-2)}`)

        input.value = toBRL(number);
    };

    if (input.className === "float") {
        if (currentValue.length > 8)
            currentValue = currentValue.slice(0, 8);

        if (currentValue.length > 2 && currentValue[0] === "0")
            currentValue = currentValue.slice(1);

        if (currentValue.length < 2)
            currentValue = "0" + currentValue;

        currentValue = `${currentValue.slice(0, -1)}.${currentValue.slice(-1)}`;

        input.value = parseFloat(currentValue)
            .toLocaleString("pt-br", { minimumFractionDigits: "1" });
    };
};

document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", () => mascara(input));
});

//LISTA DE GANHOS
const listGanhos = [];

function toNumber(string) {
    let toNumber = string
        .replaceAll(".", "")
        .replace(",", ".");

    if (isNaN(parseFloat(toNumber)))
        toNumber = toNumber.slice(3);

    return parseFloat(toNumber);
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
    ];
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

    document.querySelector("#totalBruto").textContent =
        toBRL(totalBruto);

    document.querySelector("#totalKm").textContent =
        `${document.querySelector("#km").value}Km`;

    const totalCustoManut = km * custoManutKm + custoManutDia;
    document.querySelector("#totalCustoManut").textContent =
        toBRL(totalCustoManut);

    const litrosCons = km / mediaCons;
    document.querySelector("#litrosCons").textContent =
        `${litrosCons.toFixed(1).replace(".", ",")}L`;

    const totalCustoCombus = litrosCons * custoCombus;
    document.querySelector("#totalCustoCombus").textContent =
        toBRL(totalCustoCombus);

    document.querySelector("#totalLiq").textContent =
        toBRL(totalBruto - totalCustoManut - totalCustoCombus);
};

document.querySelector("#calcButton")
    .addEventListener("click", calc);