document.addEventListener('DOMContentLoaded', () => { 
const grid = document.querySelector(".grid")    
const scoreDisplay = document.getElementById("score")
const width = 45 //45 x 45 = 2025
let score = 0

//layout of grid and what is in the squares
const layout = [
    0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,
    0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,
    0,	0,	3,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	3,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	0,	0,	0,	1,	1,	1,	1,	1,	3,	0,	0,	0,	0,
    0,	0,	1,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	0,	0,	1,	0,	0,	0,	0,	1,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	1,	0,	0,	0,	1,	0,	0,	0,	0,	1,	0,	0,	0,	0,
    0,	0,	1,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	0,	0,	1,	0,	0,	0,	0,	1,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	1,	1,	1,	1,	1,	0,	0,	0,	0,	1,	1,	1,	0,	0,
    0,	0,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	0,	0,	0,	0,	1,	0,	0,	0,	0,	1,	1,	1,	1,	1,	1,	1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	0,	0,
    0,	0,	0,	0,	1,	0,	0,	0,	0,	1,	0,	1,	0,	0,	0,	0,	1,	1,	1,	1,	1,	1,	1,	1,	0,	0,	0,	1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	0,	0,
    0,	0,	0,	0,	1,	0,	0,	0,	0,	1,	0,	1,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	0,	1,	0,	0,	0,	1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	1,	1,	0,	1,	0,	0,
    0,	0,	0,	0,	1,	0,	0,	0,	0,	1,	0,	1,	0,	0,	0,	0,	1,	1,	1,	0,	0,	3,	1,	1,	0,	0,	0,	1,	0,	0,	0,	0,	1,	1,	1,	1,	3,	0,	1,	0,	1,	0,	1,	0,	0,
    0,	1,	1,	1,	1,	1,	1,	0,	0,	1,	0,	1,	0,	0,	0,	0,	0,	0,	1,	0,	0,	1,	0,	0,	0,	0,	0,	1,	0,	0,	0,	0,	1,	0,	1,	0,	1,	0,	1,	0,	1,	1,	1,	0,	0,
    0,	1,	0,	0,	0,	0,	1,	0,	0,	1,	0,	1,	1,	1,	1,	3,	0,	0,	1,	0,	0,	1,	0,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	0,	1,	0,	1,	0,	1,	1,	1,	0,	0,	0,	0,
    0,	1,	0,	0,	0,	0,	1,	0,	0,	1,	0,	0,	0,	0,	0,	1,	0,	0,	1,	0,	0,	1,	0,	1,	0,	0,	0,	0,	0,	0,	1,	0,	0,	0,	1,	0,	1,	0,	0,	1,	0,	0,	0,	0,	0,
    0,	1,	1,	1,	1,	1,	1,	1,	1,	1,	0,	0,	0,	0,	0,	1,	1,	1,	1,	0,	0,	1,	1,	1,	0,	0,	0,	0,	0,	0,	1,	0,	1,	1,	1,	0,	1,	0,	0,	1,	0,	0,	0,	0,	0,
    0,	0,	1,	0,	0,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	0,	1,	0,	1,	0,	1,	0,	1,	1,	1,	1,	1,	1,	0,	0,	0,
    0,	0,	1,	0,	0,	0,	0,	0,	0,	1,	0,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	0,	1,	0,	1,	0,	0,	0,	0,	1,	0,	0,	0,
    0,	0,	1,	1,	1,	1,	1,	0,	0,	1,	0,	1,	0,	0,	0,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	0,	0,	1,	0,	0,	1,	0,	3,	1,	1,	0,	1,	0,	0,	0,	0,	1,	0,	0,	0,
    0,	0,	0,	0,	0,	0,	1,	0,	0,	3,	1,	1,	0,	0,	0,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	0,	0,	1,	0,	0,	1,	0,	0,	0,	1,	0,	1,	0,	0,	0,	0,	1,	0,	0,	0,
    0,	0,	0,	0,	0,	0,	1,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	0,	0,	1,	0,	0,	1,	1,	1,	0,	1,	0,	1,	0,	1,	1,	1,	1,	0,	0,	0,
    0,	0,	1,	1,	1,	1,	1,	0,	0,	0,	1,	1,	1,	1,	0,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	1,	1,	1,	3,	0,	0,	0,	1,	0,	1,	0,	1,	0,	1,	0,	0,	1,	0,	0,	0,
    0,	0,	1,	0,	0,	0,	1,	0,	0,	0,	1,	0,	0,	1,	0,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	1,	0,	0,	1,	0,	0,	0,	1,	1,	1,	1,	1,	0,	1,	0,	0,	1,	0,	0,	0,
    0,	0,	1,	0,	0,	0,	1,	0,	0,	0,	1,	0,	0,	1,	0,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	1,	0,	0,	1,	0,	0,	0,	0,	1,	0,	0,	1,	0,	1,	0,	0,	1,	0,	0,	0,
    0,	0,	1,	0,	0,	0,	1,	0,	0,	0,	1,	0,	0,	1,	0,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	1,	0,	0,	1,	0,	0,	1,	1,	1,	1,	1,	1,	1,	1,	0,	0,	1,	0,	0,	0,
    4,	1,	1,	0,	0,	0,	1,	1,	1,	1,	1,	0,	0,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	0,	0,	1,	1,	1,	1,	0,	0,	1,	0,	0,	0,	0,	0,	0,	1,	1,	1,	1,
    0,	0,	1,	0,	0,	0,	1,	0,	0,	0,	1,	0,	0,	1,	0,	0,	0,	0,	2,	2,	2,	0,	0,	0,	0,	1,	0,	0,	1,	0,	0,	1,	1,	1,	1,	0,	1,	1,	1,	0,	0,	1,	0,	0,	0,
    0,	0,	1,	0,	0,	0,	1,	0,	0,	0,	1,	0,	0,	1,	0,	0,	0,	0,	2,	2,	2,	0,	0,	0,	0,	1,	0,	0,	1,	0,	0,	0,	0,	1,	0,	0,	1,	0,	1,	1,	1,	1,	0,	0,	0,
    0,	0,	1,	1,	1,	1,	1,	0,	0,	0,	1,	1,	1,	1,	0,	0,	2,	2,	2,	2,	2,	2,	2,	0,	0,	1,	1,	1,	1,	0,	0,	0,	1,	1,	1,	1,	1,	0,	0,	0,	0,	1,	0,	0,	0,
    0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	0,	0,	0,	1,	0,	0,	2,	2,	2,	2,	2,	2,	2,	0,	0,	1,	0,	0,	0,	0,	0,	0,	1,	0,	0,	1,	0,	0,	0,	0,	0,	1,	0,	0,	0,
    0,	0,	0,	0,	1,	0,	0,	1,	1,	1,	1,	1,	0,	1,	0,	0,	2,	2,	2,	2,	2,	2,	2,	0,	0,	1,	0,	0,	0,	0,	1,	1,	1,	0,	0,	1,	0,	0,	0,	1,	1,	1,	1,	0,	0,
    0,	0,	0,	0,	1,	0,	0,	1,	0,	0,	0,	1,	0,	1,  0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	0,	0,	0,	0,	1,	0,	0,	0,	0,	3,	0,	0,	0,	1,	0,	0,	1,	0,	0,
    0,	1,	1,	1,	3,	1,	1,	1,	0,	0,	0,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	0,	0,	0,	0,	1,	0,	0,  0,	0,	1,	1,	1,	1,	1,	0,	0,	1,	0,	0,
    0,	1,	0,	0,	0,	1,	0,	0,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	0,	1,	0,	0,	1,	0,	0,	0,	0,	0,	0,	0,	1,	1,	1,	1,	0,	0,	1,	0,	0,	1,	0,	0,	1,	0,	0,
    0,	1,	0,	0,	0,	1,	1,	1,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	0,	1,	0,	0,	1,	0,	0,	0,	0,	0,	0,	0,	1,	0,	0,	1,	0,	0,	1,	0,	0,	1,	0,	0,	1,	0,	0,
    0,	1,	0,	0,	0,	0,	0,	1,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	0,	1,	0,	0,	1,	0,	0,	0,	0,	0,	0,	0,	1,	0,	0,	1,	0,	0,	1,	0,	0,	1,	1,	1,	1,	0,	0,
    0,	3,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	3,	0,	0,	1,	1,	1,	1,	1,	0,	0,	0,	1,	1,	0,	1,	1,	1,	1,	1,	0,	0,	0,	0,	1,	0,	0,
    0,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	0,	0,	0,	0,	1,	0,	1,	0,	0,	0,	1,	1,	0,	0,	0,	1,	0,	0,
    0,	0,	0,	0,	0,	1,	0,	0,	0,	0,	1,	1,	1,	1,	1,	1,	1,	3,	0,	0,	0,	0,	0,	3,	1,	1,	1,	1,	1,	1,	0,	1,	1,	1,	1,	1,	0,	0,	1,	1,	1,	1,	1,	0,	0,
    0,	0,	0,	0,	1,	1,	1,	1,	3,	1,	1,	0,	0,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	1,	0,	0,	1,	0,	0,	1,	0,	0,	1,	0,	0,	0,	1,	0,	0,
    0,	0,	0,	0,	1,	0,	0,	0,	1,	0,	1,	0,	0,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	1,	0,	0,	1,	0,	0,	1,	0,	1,	1,	1,	0,	0,	1,	0,	0,
    0,	0,	0,	0,	1,	0,	0,	0,	1,	0,	1,	1,	1,	1,	1,	1,	1,	1,	0,	0,	0,	0,	0,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	0,	0,	1,	0,	1,  0,	1,	0,	0,	1,	0,	0,
    0,	0,	0,	0,	1,	0,	0,	0,	1,	0,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	0,	0,	1,	0,	0,	1,	1,	1,	0,	1,	0,	0,	1,	0,	0,
    0,	0,	0,	0,	1,	0,	0,	0,	1,	0,	0,	0,	0,	0,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	0,	0,	0,	0,	0,	0,	1,	0,	0,	1,	0,	0,	0,	1,	0,	0,	1,	0,	0,
    0,	0,	0,	0,	3,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	1,	1,	1,	1,	1,	1,	3,	1,	1,	1,	0,	0,	0,	1,	1,	1,	3,	0,	0,
    0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	3,	1,	1,	1,	1,	1,	3,	1,	1,	1,	1,	1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,
    0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,
    0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0
    ]
const squares = []
// legend
// 0 - for wall
// 1 - for route
// 2 - ghost-lair 
// 3 - power-pellet
// 4 - empty


// draw the grid and render it
function createBoard() {
    for (let i=0; i < layout.length; i++) {
        const square = document.createElement('div')
        grid.appendChild(square)
        squares.push(square)

        //add layout to the board
        if(layout[i] === 0) {
            squares[i].classList.add('wall')
        } else if (layout[i] === 1) {
            squares[i].classList.add('pac-dot')
        } else if (layout[i] === 2) {
            squares[i].classList.add('ghost-lair')
        } else if (layout[i] === 3) {
            squares[i].classList.add('power-pellet')
        }
    }
}
createBoard()

//starting position of pac-man
let pacmanCurrenIndex = 990

squares[pacmanCurrenIndex].classList.add('pac-man')

//move pac-man
function movePacman(e) {
    squares[pacmanCurrenIndex].classList.remove('pac-man')

   switch(e.keyCode) {
       case 37:
           if(pacmanCurrenIndex % width !== 0 && !squares[pacmanCurrenIndex -1].classList.contains('wall') && !squares[pacmanCurrenIndex -1].classList.contains('ghost-lair')) pacmanCurrenIndex -=1

          //check if pacman is in the left exit
          if(pacmanCurrenIndex -1 === 989) {
              pacmanCurrenIndex = 1034
          }
           break
       case 38:
            if(pacmanCurrenIndex - width >= 0 && !squares[pacmanCurrenIndex -width].classList.contains('wall') && !squares[pacmanCurrenIndex -width].classList.contains('ghost-lair')) pacmanCurrenIndex -=width
           break
       case 39:
           if(pacmanCurrenIndex % width < width -1 && !squares[pacmanCurrenIndex +1].classList.contains('wall') && !squares[pacmanCurrenIndex +1].classList.contains('ghost-lair'))  pacmanCurrenIndex +=1

           //check if pacman is in the right exit
          if(pacmanCurrenIndex +1 === 1035) {
            pacmanCurrenIndex = 990
        }
           break
       case 40:
           if(pacmanCurrenIndex + width < width * width && !squares[pacmanCurrenIndex +width].classList.contains('wall') && !squares[pacmanCurrenIndex +width].classList.contains('ghost-lair')) pacmanCurrenIndex +=width
           break
   }

   squares[pacmanCurrenIndex].classList.add('pac-man')

   pacDotEaten()
   powerPelletEaten()
   checkForGameOver()
   checkForWin()

}

document.addEventListener('keyup', movePacman)

// what happens when Pac-man eats a pac-dot
function pacDotEaten() {
 if(squares[pacmanCurrenIndex].classList.contains('pac-dot')) {
   score++
   scoreDisplay.innerHTML = score
   squares[pacmanCurrenIndex].classList.remove('pac-dot')
 }
}

//what happens when you eat a power-pellet
function powerPelletEaten() {
    if(squares[pacmanCurrenIndex].classList.contains('power-pellet')) {
        score +=10
        ghosts.forEach(ghost => ghost.isScared = true)
        setTimeout(unScareGhosts, 10000)
        squares[pacmanCurrenIndex].classList.remove('power-pellet')
    }
}

//make the ghosts stop appearing as aquarmarine
function unScareGhosts() {
  ghosts.forEach(ghost => ghost.isScared = false)
}

//create our ghost template
class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.timerId = NaN
        this.isScared = false
    }
}

const ghosts = [
    new Ghost('blinky', 1142, 250),
    new Ghost('pinky', 1144, 400),
    new Ghost('inky', 1146, 300),
    new Ghost('clyde', 1192, 500)
]

//draw my ghost onto the grid
ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost')
})

//move All the ghosts randomly
ghosts.forEach(ghost => moveGhost(ghost))

//write the funtion to move the ghosts
function moveGhost(ghost) {
const directions = [-1, +1, width, -width]
let direction = directions[Math.floor(Math.random() * directions.length)]

ghost.timerId = setInterval(function() {
//if the next square your ghost is going to go in does NOT contain a wall and a ghost, you can go there
if(!squares[ghost.currentIndex + direction].classList.contains('wall') && !squares[ghost.currentIndex + direction].classList.contains('ghost')) {
    //you can go here

    //remove all ghost related classes
    squares[ghost.currentIndex].classList.remove(ghost.className)
    squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
    //change the currentIndex to the new safe square
    ghost.currentIndex += direction
    //redraw the ghot in the new safe space
    squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')

    //else find a new direction to try
} else direction = directions[Math.floor(Math.random() * directions.length)]

//if the ghost is currently scared
if(ghost.isScared) {
    squares[ghost.currentIndex].classList.add('scared-ghost')
}

//if the ghost is scared and pacman runs into it
if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
    squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
    ghost.currentIndex = ghost.startIndex
    score +=100
    squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
}

}, ghost.speed)
}

//check for a game over
function checkForGameOver() {
    if (squares[pacmanCurrenIndex].classList.contains('ghost') && !squares[pacmanCurrenIndex].classList.contains('scared-ghost')) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keyup', movePacman)
        //setTimeout(function(){alert('Game Over')
       //}, 500)
       scoreDisplay.innerHTML = 'Game Over'
 }
}

//check for a win
function checkForWin() {
 if (score === 274) {
     ghosts.forEach(ghost => clearInterval(ghost.timerId))
     document.removeEventListener('keyup', movePacman)
     scoreDisplay.innerHTML = 'You Won!'
 }
}
})