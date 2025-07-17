function toNumber(value) {
    return parseFloat(value.replace(",", "."));
};

function getValues() {
    return [
        toNumber(document.querySelector("#fatur").value),
        toNumber(document.querySelector("#totalKm").value),
        toNumber(document.querySelector("#custoManut").value),
        toNumber(document.querySelector("#mediaCons").value),
        toNumber(document.querySelector("#custoCombus").value),
    ]
}

document.querySelector("#fatur").addEventListener("focus", function () {
    this.select();
});

document.querySelector("#fatur").addEventListener("blur", function () {
    const string = this.value.replaceAll(",", ".");
    const values = string.split(" ");
    const total = values.reduce((soma, valor) =>
        soma += isNaN(parseFloat(valor)) ? 0 : parseFloat(valor), 0)
        .toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    this.value = total;
});

function calc() {
    const [fatur, totalKm, custoManut, mediaCons, custoCombus] = getValues();

    const custoTotalManut =
        totalKm * custoManut;

    const custoTotalCombus =
        totalKm / mediaCons * custoCombus;

    fatur - custoTotalManut - custoTotalCombus
        ? document.querySelector("#result").value =
        (fatur - custoTotalManut - custoTotalCombus)
            .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
        : alert("Impossível Calcular!");
};

document.querySelector("#calcButton")
    .addEventListener("click", calc);