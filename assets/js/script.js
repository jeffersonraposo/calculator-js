const MAX_LENGTH = 12;

function insert(num) {
    //var numero = document.querySelector('.result').innerHTML;
    var display = document.querySelector('.result');
    if (display.innerHTML.length < MAX_LENGTH) {
        if (num === ',') {
            display.innerHTML += '.';
        } else {
            display.innerHTML += num;
        }
    }
}

function clean() {
    document.querySelector('.result').innerHTML = "";
}

function back() {
    var resultado = document.querySelector('.result').innerHTML;
    document.querySelector('.result').innerHTML = resultado.substring(0, resultado.length -1);
}

function calcular() {
    var resultado = document.querySelector('.result').innerHTML;
    if (resultado) {
        try {
            resultado = processarPorcentagens(resultado);
            document.querySelector('.result').innerHTML = eval(resultado);
        } catch (e) {
            document.querySelector('.result').innerHTML = "Erro";
        }
    } else {
        document.querySelector('.result').innerHTML = "Nada...";
    }
}

function processarPorcentagens(input) {
    // Expressão regular para encontrar números seguidos de porcentagem
    const regex = /(\d+(\.\d+)?)(%)/g;

    // Substituição de porcentagens
    return input.replace(regex, (match, numero) => {
        // Verifica o número antes da porcentagem
        let numeroAnterior = parseFloat(numero);
        return `(${numeroAnterior} * 0.01)`;
    }).replace(/(\d+(\.\d+)?)([\+\-\*\/])(\(\d+(\.\d+)? \* 0\.01\))/g, (match, num, decimal, operator, percent) => {
        return `(${num}${operator}(${num} * 0.01 * ${parseFloat(match.match(/\d+/g)[1])}))`;
    });
}



document.addEventListener('keydown', function(event) {
    var key = event.key;
    if (!isNaN(key) || ['+', '-', '*', '/', '%'].includes(key)) {
        insert(key);
    } else if (key === 'Enter') {
        calcular ();
    } else if (key === 'Backspace') {
        back();
    } else if (key === 'Delete'){
        clean();
    } else if (key === ',' || key === '.') {
        insert(',');
    } 
    
});