function toNumber(value) {
    return value == ""
        ? 0
        : parseFloat(value.replace(",", "."));
};

function getValues() {
    return [
        document.querySelector("#ganhos").value,
        toNumber(document.querySelector("#totalKm").value),
        toNumber(document.querySelector("#custoManut").value),
        toNumber(document.querySelector("#mediaCons").value),
        toNumber(document.querySelector("#custoCombus").value),
    ]
};

function calc() {
    const [ganhos, totalKm, custoManut, mediaCons, custoCombus] = getValues();

    const string = ganhos.replaceAll(",", ".");
    const values = string.split(" ");
    const totalBruto = values.reduce((soma, valor) =>
        soma += isNaN(parseFloat(valor)) ? 0 : parseFloat(valor), 0)
        .toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

    document.querySelector("#totalBruto").innerText = "R$ " + totalBruto;
};


document.querySelector("#calcButton")
    .addEventListener("click", calc);