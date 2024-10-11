function spin(roleta) {
    let chancePerder, premioMaximo, xpMaximo, resultElement, mode;

    // Função para formatar números com pontuação
    function formatarNumero(num) {
        return num.toLocaleString('pt-BR');
    }

    if (roleta === 'basic') {
        chancePerder = 33;
        premioMaximo = 600000;
        xpMaximo = 3500;
        resultElement = document.getElementById("resultBasic");
        mode = document.getElementById("basicMode").value;
    } else if (roleta === 'medium') {
        chancePerder = 43;
        premioMaximo = 1500000;
        xpMaximo = 7000;
        resultElement = document.getElementById("resultMedium");
        mode = document.getElementById("mediumMode").value;
    } else if (roleta === 'high') {
        chancePerder = 58;
        premioMaximo = 3000000;
        xpMaximo = 15000;
        resultElement = document.getElementById("resultHigh");
        mode = document.getElementById("highMode").value;
    } else if (roleta === 'especial') {
        let customPrize = document.getElementById("customPrize").value || "prêmio não especificado";
        let betValue = document.getElementById("betValue").value.replace(/\D/g, ""); // Remove caracteres não numéricos
    
        // Verifica se betValue está vazio e atribui 3.000.000 se estiver
        betValue = betValue === "" ? 3000000 : parseInt(betValue, 10);
        
        resultElement = document.getElementById("resultEspecial");
        mode = document.getElementById("especialMode").value;
    
        // Cálculo da chance de perder com base no valor apostado
        if (betValue <= 100000000) {
            chancePerder = 10 - ((betValue - 3000000) / 1000000);
        } else {
            chancePerder = 2; // Chance de perder fixa para apostas maiores que 100M
        }
    
        if (mode === 'apostador') {
            chancePerder -= 4;
        }
    
        // Garante que a chance de perder não seja negativa
        chancePerder = Math.max(chancePerder, 0);
    
        let perdeu = Math.random() * 100 < chancePerder;
    
        if (perdeu) {
            resultElement.innerHTML = "Você perdeu tudo!";
        } else {
            resultElement.innerHTML = `Você ganhou: ${customPrize}`;
        }
        return;
    }
    

    if (mode === 'apostador') {
        chancePerder -= 30;
    } else if (mode === 'ganhoCerto') {
        chancePerder = 0;
    }

    let perdeu = Math.random() * 100 < chancePerder;

    if (perdeu) {
        resultElement.innerHTML = "Você perdeu tudo!";
    } else {
        let ganhouBerries = Math.random() < 0.5;
        if (ganhouBerries) {
            let premio = Math.floor(Math.random() * premioMaximo);
            resultElement.innerHTML = `Você ganhou ${formatarNumero(premio)} Berries!`;
        } else {
            let xp = Math.floor(Math.random() * xpMaximo);
            resultElement.innerHTML = `Você ganhou ${formatarNumero(xp)} XP!`;
        }
    }
}

// Função para alternar entre as abas
function openTab(evt, tabName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
