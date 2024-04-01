let canvaW = 400;
let canvaH = 400;

//controles da cobra
let xCobra = 50;
let yCobra = 40;
let wCobra = 10;
let hCobra = 10;
let partes = 1;

let rabo = [];

//velocidade de movimentação
let velocidadeCobra = 5;
let direcao = "right";

//comida
comidaXPosition = randomIntFromInterval(12, canvaW - 11);
comidaYPosition = randomIntFromInterval(12, canvaH - 11);

let colidiu = false;
let comeu = false;

//paredes laterais
let wParedeEsquerda = 10;
let hParedeEsquerda = 400;
let posicaoXParedeEsquerda = 0;
let posicaoYParedeEsquerda = 0;
let posicaoXParedeDireita = 390;
let posicaoYParedeDireita = 0;

//Paredes verticais
let wPardeCimaBaixo = 390;
let hParedeCimaBaixo = 10;
let posicaoXParedeCima = 0;
let posicaoYParedeCima = 0;
let posicaoXParedeBaixo = 0;
let posicaoYParedeBaixo = 390;

function setup() {
  createCanvas(canvaW, canvaH);
  frameRate(20);
}

function draw() {
  background(255);
  desenhaCobra();
  desenhaParedes();
  controleMovimento();
  ColisaoParedes();
  comer();
}

function desenhaCobra() {
  // Desenha a cabeça da cobra
  fill(85, 178, 87); // Define a cor da cabeça da cobra
  ellipse(xCobra, yCobra, wCobra, hCobra);
  //rect(xCobra, yCobra, wCobra, hCobra);

  // Atualiza a posição do rabo da cobra
  for (let i = partes - 1; i > 0; i--) {
    rabo[i] = rabo[i - 1];
  }
  rabo[0] = [xCobra, yCobra];

  // Desenha o rabo da cobra
  for (let i = 0; i < partes; i++) {
    fill(85, 178, 87); // Define a cor do rabo da cobra
    ellipse(rabo[i][0], rabo[i][1], wCobra, hCobra);
   // rect(rabo[i][0], rabo[i][1], wCobra, hCobra);
  }
}


function desenhaParedes(){
  rect(posicaoXParedeEsquerda, posicaoYParedeEsquerda,wParedeEsquerda, hParedeEsquerda);
  rect(posicaoXParedeDireita,posicaoYParedeDireita,wParedeEsquerda, hParedeEsquerda);
  rect(posicaoXParedeCima, posicaoYParedeCima, wPardeCimaBaixo, hParedeCimaBaixo);
  rect(posicaoXParedeBaixo, posicaoYParedeBaixo, wPardeCimaBaixo, hParedeCimaBaixo);
}

function controleCobra(){
  //Add os comandos de movimentação da cobrinha
  if(keyIsDown(LEFT_ARROW)){
    return "left";
  }
  if(keyIsDown(RIGHT_ARROW)){
    return "right";
  }
  if(keyIsDown(UP_ARROW)){
    return("up");
  }
  if(keyIsDown(DOWN_ARROW)){
    return("down");
  }
}

function controleMovimento(){
  if(controleCobra())
  direcao = controleCobra();

if(direcao == "right"){
  xCobra += velocidadeCobra;
}
if(direcao == "up"){
  yCobra -= velocidadeCobra;
}
if(direcao == "left"){
  xCobra -= velocidadeCobra;
}
if(direcao == "down"){
  yCobra += velocidadeCobra;
}
}

function colisaoComSiMesma() {
  for (let i = 0; i < rabo.length; i++) {
    if (dist(xCobra, yCobra, rabo[i][0], rabo[i][1]) < 1) {
      return true; // A cabeça colidiu com alguma parte do rabo
    }
  }
  return false; // Não houve colisão
}

function ColisaoParedes(){
  var colisaoDireita = collideRectRect(xCobra, yCobra, wCobra, hCobra, posicaoXParedeDireita, posicaoYParedeDireita, wParedeEsquerda, hParedeEsquerda);
  var colisaoEsquerda = collideRectRect(xCobra, yCobra, wCobra, hCobra, posicaoXParedeEsquerda, posicaoYParedeEsquerda, wParedeEsquerda, hParedeEsquerda);
  var colisaoCima = collideRectRect(xCobra, yCobra, wCobra, hCobra, posicaoXParedeCima, posicaoYParedeCima, wPardeCimaBaixo, hParedeCimaBaixo);
  var colisaoBaixo = collideRectRect(xCobra, yCobra, wCobra, hCobra, posicaoXParedeBaixo, posicaoYParedeBaixo, wPardeCimaBaixo, hParedeCimaBaixo);
  var colisaoCobra = collideRectRect(xCobra, yCobra, wCobra, hCobra, rabo[0][0], rabo[0][1], wCobra, hCobra);

  if(colisaoCima ||  colisaoBaixo || colisaoDireita || colisaoEsquerda || colisaoComSiMesma()){
    resetarJogo();
  }
}

function resetarJogo() {
  // Reinicialize todas as variáveis necessárias para recomeçar o jogo
  xCobra = 50;
  yCobra = 40;
  partes = 1;
  rabo = [];
  direcao = "right";
}


function colisaoComida(){
  var colisaoComida = collideRectRect(comidaXPosition, comidaYPosition, 10, 10, xCobra, yCobra, wCobra, hCobra);
  return colisaoComida;
}

let comidaImg;
function preload() {
  comidaImg = loadImage('../Icons/favicon.ico', () => console.log('Imagem carregada com sucesso.')); // Carrega a imagem da maçã
}

function comer(){
  if(colisaoComida()){
    // Define os limites para a área onde a comida pode aparecer, excluindo a área de colisão das paredes
    let comidaAreaMinX = posicaoXParedeEsquerda + wParedeEsquerda; // Limite esquerdo
    let comidaAreaMaxX = posicaoXParedeDireita - 11; // Limite direito (subtraindo a largura da comida)
    let comidaAreaMinY = posicaoYParedeCima + hParedeCimaBaixo; // Limite superior
    let comidaAreaMaxY = posicaoYParedeBaixo - 11; // Limite inferior (subtraindo a altura da comida)
    
    // Gera coordenadas aleatórias dentro da área delimitada
    comidaXPosition = randomIntFromInterval(comidaAreaMinX, comidaAreaMaxX);
    comidaYPosition = randomIntFromInterval(comidaAreaMinY, comidaAreaMaxY);
    
    // Adicionando o ponto na cobra e aumentando o tamanho do corpo dela
    partes++;
    rabo.push([xCobra,yCobra]);
  }
   image(comidaImg, comidaXPosition, comidaYPosition, 15, 15);
}

//funções auxiliares
function randomIntFromInterval(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
}