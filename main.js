let arrayToString = function(array) {
  let string = ''
  for (let i=0; i<array.length; i++){
    string += array[i] 
  }
  return string
}

let isArrayIncludes = function(array, elem) {
  for (let i=0; i<array.length; i++) {
    if (array[i] === elem) {
      return true
    }
  }
  return false
}

let isChampion = (array) => {
  let winningConditions = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
		[1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
]
  let champion = false
  for (const condition of winningConditions) {
	  let counter = 0;

		for (const elem of condition) {
    	if (isArrayIncludes(array, elem)) {
      	counter ++;
      }
    }
    
    if (counter === 3) {
    	champion = true
      break
    }
  }
  return champion
}

you = []
computer = []

let computerTurn = Math.random() <= 0.5
let squares = document.getElementsByClassName('kotak')
let gameOver = false

let decideWinner = function() {
	if (!gameOver) {
    if (isChampion(you)) {
      gameOver = true
      alert("ANDA MENANG!")
    } else if (isChampion(computer)) {
      gameOver = true
      alert("GG EZ BOUS, COMPUTER MENANG")
    } else if ((you.length + computer.length) === 9) {
      gameOver = true
      alert("TIDAK ADA PEMENANG HAHA")
    }
  }
}

let onClickSquare = function (event) {
	if (gameOver || computerTurn) {
  	return
  }
	if (!event.target.getAttribute('class').includes('y') && !event.target.getAttribute('class').includes('x')) {
		let number = Number(event.target.getAttribute('id'))
		you.push(number)
    event.target.setAttribute('class', 'kotak y')
    event.target.innerHTML = 'X'
    computerTurn = true
		setTimeout(computerClickSquare, 1000)
    setTimeout(decideWinner, 500)
	}
}

let computerClickSquare = function() {
	if (gameOver || !computerTurn) {
  	return
  }
	while (computerTurn) {
    number = Math.floor(Math.random() * 9) + 1 
    if (!isArrayIncludes(computer, number) && !isArrayIncludes(you, number)) {
      document.getElementById(number.toString()).setAttribute('class', 'kotak x')
      document.getElementById(number.toString()).innerHTML = 'O'
      computer.push(number)
      computerTurn = false
      decideWinner()
    }  
  }
}

for (const square of squares) {
	square.onclick = onClickSquare
}

if (computerTurn) {
	computerClickSquare()
}

function resetGame() {
  location.reload();
}
