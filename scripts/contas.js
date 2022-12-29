function getValues() {
    return {
        divida: Number(document.querySelector("#divida").value),
        renda1: Number(document.querySelector("#renda-1").value),
        renda2: Number(document.querySelector("#renda-2").value)
    };
};

function formatToCurrency(value) {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
};

function calcularContribuicao() {
    let repeat = true,
        cont1,
        cont2,
        cont1e2,
        ultPerc,
        { divida, renda1, renda2 } = getValues();

    function calcularPercentual(renda, perc) {
        return renda * perc / 100;
    };

    for (let p = 0; repeat; p++) {
        ultPerc = p;
        cont1 = calcularPercentual(renda1, p);
        cont2 = calcularPercentual(renda2, p);
        cont1e2 = (cont1 + cont2).toFixed(2);

        if (cont1e2 > divida) {
            let perc = p;

            for (let p = 1; repeat; p++) {
                ultPerc = perc - p / 100;
                cont1 = calcularPercentual(renda1, perc - p / 100);
                cont2 = calcularPercentual(renda2, perc - p / 100);
                cont1e2 = ((cont1 + cont2).toFixed(2));

                if (cont1e2 <= divida)
                    repeat = false;

                //trava de segurança
                if (p == 100)
                    repeat = false;
            };
        };

        //trava de segurança
        if (p == 100)
            repeat = false;
    };

    console.clear();

    console.log(`A soma das contribuições é R$ ${cont1e2}`);

    console.log(`O percentual aplicado foi de ${ultPerc}%`);

    document.querySelector("#cont-rend-1")
        .textContent = formatToCurrency(cont1);

    document.querySelector("#cont-rend-2")
        .textContent = formatToCurrency(cont2);
};

document.querySelector("#calc")
    .addEventListener("click", calcularContribuicao);