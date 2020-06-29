import "./styles.css";

var turn = 1; //keeps track of played turns
let player = "1"; //current player
let mark = "X"; //player 1's mark
let status = "Game on"; //shows the game status, default id game on
const cells = document.getElementsByClassName("cell"); //all cell elements

//variables for the progress bar
var bar_fill = document.getElementById("progress-bar-fill");
var bar_value = document.getElementById("progress-bar-value");
var width = 100;
var value = 10;
bar_fill.style.width = "100%";
bar_value.innerHTML = "10s";
var interval = setInterval(frame, 1000);

//goes through all cells and adds EventListener
for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", function() {
    cellClick(i);
  });
}

//Event listener fot Restart button
document.getElementById("restart").addEventListener("click", restart);

//Function for clicked cell
function cellClick(i) {
  //checks that the cell is empty and game is on
  if (cells[i].innerHTML.trim() === "" && status === "Game on") {
    //current player's mark is written to clicked cell
    cells[i].innerHTML = mark;
    if (mark === "X") {
      cells[i].style.backgroundColor = "rgb(124,252,0)";
    } else if (mark === "O") {
      cells[i].style.backgroundColor = "rgb(250,128,114)";
    }
    //check if there are 5 matching symbols in a row
    for (let j = 0; j < 25; j = j + 5) {
      if (
        cells[j].innerHTML !== "" &&
        cells[j].innerHTML === cells[j + 1].innerHTML &&
        cells[j].innerHTML === cells[j + 2].innerHTML &&
        cells[j].innerHTML === cells[j + 3].innerHTML &&
        cells[j].innerHTML === cells[j + 4].innerHTML
      ) {
        winner(j, j + 1, j + 2, j + 3, j + 4); //trigger winning function if winning requirements are met
      }
    }
    //check if there are 5 matching symbols in a column
    for (let k = 0; k < 5; k = k + 1) {
      if (
        cells[k].innerHTML !== "" &&
        cells[k].innerHTML === cells[k + 5].innerHTML &&
        cells[k].innerHTML === cells[k + 10].innerHTML &&
        cells[k].innerHTML === cells[k + 15].innerHTML &&
        cells[k].innerHTML === cells[k + 20].innerHTML
      ) {
        winner(k, k + 5, k + 10, k + 15, k + 20);
      }
      //check if there are 5 matching symbols accross the table
    }
    if (
      cells[0].innerHTML !== "" &&
      cells[0].innerHTML === cells[6].innerHTML &&
      cells[0].innerHTML === cells[12].innerHTML &&
      cells[0].innerHTML === cells[18].innerHTML &&
      cells[0].innerHTML === cells[24].innerHTML
    ) {
      winner(0, 6, 12, 18, 24);
    } else if (
      cells[4].innerHTML !== "" &&
      cells[4].innerHTML === cells[8].innerHTML &&
      cells[4].innerHTML === cells[12].innerHTML &&
      cells[4].innerHTML === cells[16].innerHTML &&
      cells[4].innerHTML === cells[20].innerHTML
    ) {
      winner(4, 8, 12, 16, 20);
    }
    //player is switched
    [player, mark] = change_player(player);
    //if all the boxes are filled but there has been no win, alert tie
  }
}

function winner(a, b, c, d, e) {
  clearInterval(interval);
  //if game is won
  //highlight winner cells
  turn = 0; //make turn 0 so that the tie message won't be executed
  cells[a].style.backgroundColor = "royalblue";
  cells[b].style.backgroundColor = "royalblue";
  cells[c].style.backgroundColor = "royalblue";
  cells[d].style.backgroundColor = "royalblue";
  cells[e].style.backgroundColor = "royalblue";
  alert("Player " + player + " won!");
  status = "Game over"; //end game
}

//when restart button is pressed
function restart() {
  clearInterval(interval);
  bar_fill.style.width = "100%";
  bar_value.innerHTML = "10s";
  //make cells blank again and reset color
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = "";
    cells[i].style.backgroundColor = "white";
  }
  //change player to player X again and set game status to "game on"
  player = "1";
  mark = "X";
  document.getElementById("player").innerHTML = player;
  status = "Game on";
  turn = 1;
}

function change_player(p) {
  var m;
  turn++;
  if (p === "1") {
    p = "2";
    m = "O";
  } else if (p === "2") {
    p = "1";
    m = "X";
  }
  document.getElementById("player").innerHTML = p;
  if (turn === 26) {
    alert("It's a tie! No winners here.");
  }
  clearInterval(interval);
  width = 100;
  value = 10;
  bar_fill.style.width = "100%";
  bar_value.innerHTML = "10s";
  interval = setInterval(frame, 1000);
  return [p, m];
}

function frame() {
  if (width === 0) {
    [player, mark] = change_player(player);
  } else {
    width = width - 10;
    value--;
    bar_fill.style.width = width + "%";
    bar_value.innerHTML = value + "s";
  }
}
