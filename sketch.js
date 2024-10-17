//6601012610067 พงษ์จันทร์ จันทร์แจ่ม
// ต้องการ multiplayer
// hint
// timmer

let i = 0;

let rows = 4;
let column = 4;

const gridSize = 80;
let _numbers = [];
let offset_y = 0;

let visibility = [];
let old_click_number = -1;
let old_index = -1;

let is_player_a_turn = true;
let isGameOver = false;
let score_player_a = 0;
let score_player_b = 0;


let timmer = 60;
let hint_value = 0


function init()
{
  _numbers = [];
  is_player_a_turn = true;
  isGameOver = false;
  score_player_a = 0;
  score_player_b = 0;
  visibility = [];
  old_click_number = -1;
  old_index = -1;
  timmer = 61;
  generateNumbers(rows * column);

}

function setup() {
  createCanvas(600, 800);
  init();
  frameRate(12);
}

// Shuffle function using Fisher-Yates algorithm
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements at index i and j
  }
  return array;
}


function generateNumbers(number_size) {
  let numbers = [];
  hides = [];
  for (i = 0; i < number_size; i += 2) {
    let num = Math.floor(i / 2) + 1;
    numbers.push(num);
    numbers.push(num);
  }

  _numbers = shuffle(numbers);

  for (i = 0; i < number_size; i++) {
    visibility.push(false);
  }
}

function hint(number)
{

  let match_list = [];

  for(let i =0;i<_numbers.length;i++)
  {
    if(number == _numbers[i])
      match_list.push(i);
  }

  hint_value = match_list[1] - match_list[0];

  console.log(match_list);



}

function drawDot(number, x, y) {
  let row = 0;
  for (let o = 0; o < number; o++) {
    row = Math.floor(o / 3);
    offset_y = Math.floor(Math.random() * 3);
    circle(
      10 + gridSize / 4 + gridSize * x + (o % 3) * 8,
      10 + gridSize / 2 + gridSize * y + Math.floor(o / 3) * 8 + offset_y,

      5
    );
  }
}

function drawPlayer() {
  textSize(18);

  textAlign(LEFT);
  
  if (is_player_a_turn == true) {


    
    text("Count Down (A):"+Math.round(timmer/5),420,20);
    fill(0,0,255);
    
    text("PLAYER_A: " + score_player_a, 420, 40);
    fill(120);
    text("PLAYER_B: " + score_player_b, 420,60);
  } else {
    text("Count Down (B):"+Math.round(timmer/5),420,20);
    fill(120);
    text("PLAYER_A : " + score_player_a, 420, 40);
    fill(0,0,255);
    text("PLAYER_B: " + score_player_b, 420, 60);
  }
}

function drawGrids() {
  let id = 1;
  for (let y = 0; y < column; y++) {
    for (let x = 0; x < rows; x++) {
      // Set stroke and fill for the rectangle
      stroke(0);
      fill(200);
      rect(10 + gridSize * x, 10 + gridSize * y, gridSize, gridSize);

      fill(0);
      textAlign(CENTER, CENTER); // Center the text
      textSize(34);

      if (visibility[id - 1]) {
        // show dot or not
        drawDot(_numbers[id - 1], x, y);
      }

      //text(_numbers[id - 1], 10 + gridSize / 2 + (gridSize * x), 10 + gridSize / 2 + (gridSize * y));
      id++;
    }
  }
}

function restart()
{

}

function restartButton()
{


}

function draw() {
  background(255);

  


  if(isGameOver)
  {

    

    _numbers = [];
    fill(100);
    textAlign(LEFT);
    text("GAME OVER", 100, 60);

    if (score_player_a == score_player_b) {
      text("Draw", 100, 80);
      text("SCORE A:"+score_player_a, 100);
      text("SCORE B:"+ score_player_b, 120);

  } else if (score_player_a > score_player_b) {
      text("WINNER IS A",100,80)
      text("🏆 SCORE A:"+score_player_a, 100,100);
      text("   SCORE B:"+score_player_b, 100,120);
  } else {
      text("WINNER IS B",100,80);
      text("   SCORE A:"+score_player_a, 100,100);
      text("🏆 SCORE B:"+score_player_b, 100,120);
  }

  text("🔁 Click here to restart", 100, 140);







  }
  else
  {

    drawGrids();
    drawPlayer();
    fill(100);
    text("Hint: " + hint_value, 420, 80);
  
    if (timmer <= 0) {
      timmer = 60;
      is_player_a_turn = !is_player_a_turn;
    }
    timmer--;


  }



  




}




function mousePressed() {



  if(isGameOver)
  {

    if(mouseY >= 80 && mouseY >= 120 )
    {
      init();
    }

  }

  else
  {

    let current_index =
    Math.floor((mouseX - 10) / gridSize) +
    4 * Math.floor((mouseY - 10) / gridSize);

  visibility[current_index] = true;

  hint(_numbers[current_index])


  if (_numbers[current_index] == old_click_number  ) {
    visibility[old_index] = true;
    visibility[current_index] = true;
    is_player_a_turn ? score_player_a++ : score_player_b++;

    if(_numbers.length <= 2*(score_player_a+score_player_b))  
      isGameOver = true;


    current_index = -1;

  } 
  else{
    visibility[old_index] = false;
  }


  old_index = current_index;
  old_click_number = _numbers[current_index];

  }





}
