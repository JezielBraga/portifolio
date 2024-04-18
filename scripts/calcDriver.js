function getValues() {
    return [
        document.querySelector("#fatur").value,
        document.querySelector("#totalKm").value,
        document.querySelector("#custoManut").value,
        document.querySelector("#mediaCons").value,
        document.querySelector("#custoCombus").value,
    ]
}

function toNumber(value) {
    return parseFloat(value.replace(",", "."));
};

function calc() {
    let [
        fatur,
        totalKm,
        custoManut,
        mediaCons,
        custoCombus
    ] = getValues();

    const custoTotalManut =
        toNumber(totalKm)
        *
        toNumber(custoManut);

    const custoTotalCombus =
        toNumber(totalKm)
        /
        toNumber(mediaCons)
        *
        toNumber(custoCombus);

    toNumber(fatur) - custoTotalManut - custoTotalCombus
        ? document.querySelector("#result").value =
        (toNumber(fatur) - custoTotalManut - custoTotalCombus)
            .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
        : alert("Impossível Calcular!");
};

document.querySelector("#calcButton")
    .addEventListener("click", calc);