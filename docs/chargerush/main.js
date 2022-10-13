title = "Which Face";

description = `
	Make sure that
	you both don't
	face the same
	way or else
	you lose!

`;

characters = [
  //default face
  `
 yyyy 
yyyyyy
y1yy1y
yyyyyy
y1111y
yyyyyy		
	`,
  //face yeft
  `
 yyyy 
yyyyy 
y1yyy 
11yyy 
yyyyy
	`,
  //face right
  `
 yyyy 
 yyyyy
 yyy1y
 yyyyy
 yyy11
 yyyyy
	`,
  //face down
  `
      
      
 yyyy 
yyyyyy
y1yy1y
	`,
  //face up
  `
y1yy1y
yyyyyy
y1111y
yyyyyy
 yyyy 
      
	`,
];

const G = {
  WIDTH: 100,
  HEIGHT: 150,
};

options = {
  viewSize: { x: G.WIDTH, y: G.HEIGHT },
  isCapturing: true,
  isCapturingGameCanvasOnly: true,
  captureCanvasScale: 2,
  isReplayEnabled: false,
  theme: "dark",
};

//initializing stuffs

let playerFace = 0;
let oppFace = 0;
let losingFace = 0;

let timeBar = 80;
let barSpeed = 0.3;

let oppY = 75;
let oppYChange = 3;

let win = 0;

function update() {
  if (!ticks) {
    oppFace = Math.floor(rnd(1, 4));
  }

  //players side

  switch (playerFace) {
    case 0:
      char("a", 50, 75);
      break;
    case 1:
      char("b", 50, 75);
      break;
    case 2:
      char("c", 50, 75);
      break;
    case 3:
      char("d", 50, 75);
      break;
    case 4:
      char("e", 50, 75);
      break;
  }

  //display AI side

  switch (oppFace) {
    case 0:
      char("a", 50, 105);
      break;
    case 1: //left
      char("b", 50, 105);
      break;
    case 2: //right
      char("c", 50, 105);
      break;
    case 3: //down
      char("d", 50, 105);
      break;
    case 4: //up
      char("e", 50, 105);
      break;
  }

  oppYChange *= -1;

  //if button is pressed, loop around the images
  if (input.isJustPressed) {
    playerFace++;
    if (playerFace > 4) {
      playerFace = 1;
    }
  }

  //time bar
  rect(10, 10, 80, 10);
  color("red");
  rect(11, 11, timeBar, 8);
  color("black");

  timeBar -= barSpeed;

  //checking conditions when time is 0
  if (timeBar <= 0) {
    //reset time
    timeBar = 80;

    //determining win conditions
    switch (oppFace) {
      case 1:
        //facing left B
        switch (playerFace) {
          case 1:
            win = 1;
            losingFace = 1;
            break;
          case 2:
            win = 0;
            break;
          case 3:
            win = 0;
            break;
          case 4:
            win = 0;
            break;
        }

      case 2:
        //facing right C
        switch (playerFace) {
          case 1:
            win = 0;
            break;
          case 2:
            win = 1;
            losingFace = 2;
            break;
          case 3:
            win = 0;
            break;
          case 4:
            win = 0;
            break;
        }

      case 3:
        //facing down
        switch (playerFace) {
          case 1:
            win = 0;
            break;
          case 2:
            win = 0;
            break;
          case 3:
            win = 1;
            losingFace = 3;
            break;
          case 4:
            win = 0;
            break;
        }

      case 4:
        //facing up
        switch (playerFace) {
          case 1:
            win = 0;
            break;
          case 2:
            win = 0;
            break;
          case 3:
            win = 0;
            break;
          case 4:
            win = 1;
            losingFace = 4;
            break;
        }
    }

    if (win == 1) {
      oppFace = losingFace;
      barSpeed = 0.3;
      end("Same Face!");
    } else {
      barSpeed += 0.2;
      addScore(1);
      oppFace = Math.floor(rnd(1, 5));
    }
  }
}
