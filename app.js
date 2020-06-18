//Desenvolvido por: Andressa Sias

function sorteiaInteiroIntervalo(minimo, maximo){
    min = Math.ceil(minimo);
    max = Math.floor(maximo);
    numero = Math.floor(Math.random() * (max - min)) + min;
    return numero
}

function geraCromossomo (){
    
    //gerando randômicamente o X
    x = sorteiaInteiroIntervalo(0,8)
    //gerando randômicamente o Y
    y = sorteiaInteiroIntervalo(0,8)

    //transfornando em binario
    var aleloX = x.toString(2);
    var aleloY = y.toString(2);

    //adicionando zeros à esquerda
    switch (aleloX.length){
        case 1:
            aleloX = "00".concat(aleloX);
            break;
        case 2:
            aleloX = "0".concat(aleloX);
            break;
        default:
            break;
    }
    switch (aleloY.length){
        case 1:
            aleloY = "00".concat(aleloY);
            break;
        case 2:
            aleloY = "0".concat(aleloY);
            break;
        default:
            break;
    }
    //concatenando binário
    var cromossomo = aleloX.concat(aleloY); 
    return [x,y,cromossomo];
}

function exibePopulacao(populacao){
    populacao.forEach(function (item, indice, array) {
        console.log(item, indice);
    });
}

function objetivo(x,y){
    expoX = x-2;
    expoX = Math.pow(expoX, 2)
    expoY = y-3 
    expoY = Math.pow(expoY, 2)
    funcao = 2-expoX-expoY

    return funcao
}

function ordenarPopulacao(populacao){
    populacao.sort(function(b, a) {
        return a[3] - b[3];
      })
}

function roletaViciada(populacaoCorte){
    populacaoNova = []
    contador = 4
    contadorPopulacao = 0
    for(i = 0; i < 4; i++){
        for(j = 0; j < contador; j++){

            sorteado = sorteiaInteiroIntervalo(0,4)

            alelo1 = populacaoCorte[i][2].substring(0, 4);

            alelo2 = populacaoCorte[sorteado][2].substring(4,6)

            cromossomo = alelo1.concat(alelo2); 
            populacaoNova[contadorPopulacao] = cromossomo
            contadorPopulacao ++
        }
        contador --;
    }

    return populacaoNova
}

function mutacao(populacao){

    for(i=0; i<5; i++){
        //sorteando cromossomo de 0 a 10
        cromossomo = sorteiaInteiroIntervalo(0,10)
        //sorteando gene de 0 a 6
        gene = sorteiaInteiroIntervalo(0,6)

        valorGene = populacao[cromossomo][gene]
        arrayCromossomo = populacao[cromossomo].split("");

        if(valorGene == 1){
            arrayCromossomo[gene] = "0";
        }else{
            arrayCromossomo[gene] = "1";
        }
        strCromossomo = arrayCromossomo.toString()
        strCromossomo = strCromossomo.replace(/,/g , '');
        populacao[cromossomo] = strCromossomo;
    }

    return populacao   
}

function decodificarCromossomo(populacao){
   arrayAlelo1 = []
   arrayAlelo2 = []
   arrAux = []

   for(i = 0; i < 10 ; i ++){

        for(j = 0; j < 3 ; j ++){
            arrayAlelo1[j] = populacao[i][j];
            arrayAlelo2[j] = populacao[i][j+3];
        }

        alelo1 = arrayAlelo1.toString()
        alelo1 = alelo1.replace(/,/g , '');

        alelo2 = arrayAlelo2.toString()
        alelo2 = alelo2.replace(/,/g , '');

        var decimalAlelo1 = parseInt(alelo1.toString(), 2);
        var decimalAlelo2 = parseInt(alelo2.toString(), 2);

        arrAux.push([decimalAlelo1, decimalAlelo2, populacao[i]])
   }
  
    return arrAux
}

// Início do código

var populacao = [];
var populacaoCorte = [];

//gerando população inicial
for (i = 0; i < 10; i++){
    populacao.push(geraCromossomo()); 
}
console.log("+ População inicial de cromossomos + ")
exibePopulacao(populacao);

//avaliando e adicionando os resultados da funcao objetivo na populacao
for( i = 0; i < 10; i++){
    populacao[i][3] = objetivo(populacao[i][0],populacao[i][1])
}
console.log("+ População após inserção do resultado da função objetivo + ")
exibePopulacao(populacao);

/** A partir daqui é a Evolução */

ordenarPopulacao(populacao);
console.log("+ População depois de ordenada + ")
exibePopulacao(populacao);

var melhorResultado = populacao[0][3]
console.log("Melhor número obtido: "+ melhorResultado)

if(melhorResultado == 2){
    console.log("Já alcançamos o ponto máximo!")
}

geracao = 1

while (melhorResultado<2){
    console.log("--------------------Iniciando a geracao " + geracao +" --------------------")
    // realizando ponto de corte da população
    for(i = 0; i<4; i++){
        populacaoCorte[i] = populacao[i];
    }
    console.log("+ População após cortada + ")
    exibePopulacao(populacaoCorte);

    //roleta viciada
    var populacaoNova = roletaViciada(populacaoCorte);
    console.log("+ Nova população gerada pela roleta viciada + ")
    exibePopulacao(populacaoNova);

    //rodando mutação
    populacaoNova = mutacao(populacaoNova)
    console.log("+ População nova depois da Mutação + ")
    exibePopulacao(populacaoNova);

    //decodificando cromossomo mutante para decimal
    populacaoNova = decodificarCromossomo(populacaoNova)
    console.log("+ População nova com inserção dos números decimais + ")
    exibePopulacao(populacaoNova);

    //função objetivo para os novos valores
    for( i = 0; i < 10; i++){
        populacaoNova[i][3] = objetivo(populacaoNova[i][0],populacaoNova[i][1])
    }
    ordenarPopulacao(populacaoNova);
    console.log("+ População nova após inserção do resultado da função objetivo e ordenada+ ")
    exibePopulacao(populacaoNova);

    melhorResultado = populacaoNova[0][3]
    console.log("Melhor número obtido: "+ melhorResultado)

    if(melhorResultado == 2){
        console.log("Já alcançamos o ponto máximo na "+ geracao+ "ª geração!")
    }else{
        console.log("Ainda não alcançamos o ponto máximo")
    }

    geracao ++;
}