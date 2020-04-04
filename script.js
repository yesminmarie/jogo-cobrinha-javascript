let canvas = document.getElementById("snake");
let context = canvas.getContext("2d"); //contexto renderiza o desenho dentro do canvas
let box = 32; //padrão de 32px para cada quadradinho
let snake = [];
snake[0] = {
    x: 8 * box, //posição x
    y: 8 * box //posição y
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

//função que desenha e define a cor do canvas
function criarBG() {
    context.fillStyle = "lightgreen"; //define a cor
    //fillRect trabalha com 4 parâmetros: posições x, y, altura e largura
    context.fillRect(0, 0, 16 * box, 16 * box); //desenha o retângulo
}

function criarCobrinha() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
    //aqui ocontexto está ligado à cobrinha
}

function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

//pega o evento de clique dos botões do teclado e chama o método update
document.addEventListener('keydown', update);

function update(event) {
    //37 seta para esquerda
    //38 seta para cima
    //39 seta para direita
    //40 seta para baixo
    //só muda se a direção anterior não for oposta
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo() {
    //se a posição x da cobra ultrapassar 15*box, sua posição x será 0 (aparecendo do lado esquerdo)
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;

    //se a posição x da cobra for menor que 0, sua posição x será 16*box (aparecendo do lado direito)
    if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;

    //se a posição y da cobra ultrapassar 15*box, sua posição y será 0 (aparecendo em cima)
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;

    //se a posição y da cobra for menor que 0, sua posição y será 16*box (aparecendo embaixo)
    if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            alert('Game Over : (');
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    //posições x e y da cobrinha (ponto de partida)
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //se a cobrinha estiver indo para o lado direito, vai adicionar um quadradinho à direita
    //se estiver indo para o lado esquerdo vai retirar um quadradinho à esquerda
    //se a cobrinha estiver indo para cima, vai retirar um quadradinho acima
    //se estiver indo para baixo vai adicionar um quadradinho abaixo
    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    //se a posição x da cobra for diferente da posição x da comida
    //ou se posição y da cobra for diferente da posição y da comida
    if (snakeX != food.x || snakeY != food.y) {
        //retira o último elemento do array
        snake.pop();
    }
    else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    //cria a nova cabeça da cobrinha
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    //adiciona a cabeça no começo do array
    snake.unshift(newHead)
}
//passa um intervalo de 100 milissegundos para a função iniciarJogo
let jogo = setInterval(iniciarJogo, 100);


