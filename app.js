'use strict';

//Молод Юлия

//ИИ атакует наименьшей по значимости картой, защищается наибольшей. В идеале нужно при каждом ходе запоминать выбывшие карты противника
//и максимальный урон, который он может принести, защищаясь картой, равной или приближенной по значимости максимально возможному урону.
//Максимально возможный урон - разница между наибольшей оставшейся не руках картой соперника и наименьшей своей.

console.log('------------------');
console.log('   Start Game');
console.log('------------------');

var PlayerCards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
var AICards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
var PlayerFane = 0;
var AIFane = 0;
var card;
//var last_playerCard = [];
var Queue = [0, 1];
var start = Queue[(Math.random() * Queue.length) | 0]; //переменная для определения очередности ходов

console.log('Player cards: ', PlayerCards);
console.log('AI cards: ', AICards);
console.log('Player Fane: ', PlayerFane);
console.log('AI Fane: ', AIFane);

for (let i = 0; i < 12; ++i) {

    console.log('------------------');
    console.log('     Round', i + 1);
    console.log('------------------');

    if (start % 2 === 1) { //проверяем, кому выпало ходить первым

        console.log('__Player attack__');
    } else {

        console.log('____AI attack____');
    }

    var a = Player();//условно переворачиваем карты
    var b = AI(i, start);//передаем карту игрока с текущего хода - ИИ запоминает ее для выбора карты на следующий ход  last_playerCard[i-1]

    //last_playerCard.push(a);

    if (start === 1) { //присваиваем штрафные очки в зависимости от очередности хода

        if (a - b > 0) {

            AIFane = AIFane + (a - b);
        }
    } else {

        if (b - a > 0) {

            PlayerFane = PlayerFane + (b - a);
        }
    }

    console.log('Player Fane: ', PlayerFane);
    console.log('AI Fane: ', AIFane);

    console.log('------------------');
    console.log('PlayerCards: ',PlayerCards);
    console.log('AICards: ', AICards);

    start = (start + 1) % 2;   //передаем ход сопернику
     
}

Winner(PlayerFane, AIFane);

function Player() {

    var card = PlayerCards[(Math.random() * PlayerCards.length) | 0];
    console.log('Player card: ', card);

    for (let j = 0; j < 12; j++) {
        while (j < PlayerCards.length) {
            if (PlayerCards[j] === card) {
                PlayerCards.splice(j, 1);
            } else {
                ++j;
            }
        }
    }
    return card;
}

function AI(i, start) {

    if (start % 2 === 0) {
        card = AICards.shift();
    } else {
        card = AICards.pop();
    }
    return card;
}

function Winner(PlayerFane, AIFane) {

    if (PlayerFane < AIFane) {

        console.log('------------------');
        console.log('    Game over');
        console.log('------------------');
        console.log('   Player win!');
    }
    else 
        if (PlayerFane > AIFane) {

            console.log('------------------');
            console.log('    Game over');
            console.log('------------------');
            console.log('     AI win!');
        }
    if (PlayerFane === AIFane) {

        console.log('------------------');
        console.log('    Game over');
        console.log('------------------');
        console.log('     Dead heat!');
    }
}

