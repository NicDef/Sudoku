'use strict';

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// var allIndexes = [];
// function remove(fields) {
// 	//remove at least 10 fields, max. 20
// 	for (let i = 1; i <= fields; i++) {
// 		do {
// 			var index = getRandomIntInclusive(1, 81);
// 		} while (allIndexes.indexOf(index) != -1);
// 		allIndexes.push(index);

// 		var id = index;

// 		const input = document.getElementById('sudoku-input-' + id);
// 		input.classList.remove('sudoku-input');
// 		input.readOnly = false;

// 		input.value = null;
// 	}
// }

/* Checking Algorithm */

// Javascript Program to check whether given sudoku
// board is valid or not

// Checks whether there is any duplicate
// in current row or not
function notInRow(arr, row) {
	// Set to store characters seen so far.
	let st = new Set();

	for (let i = 0; i < 9; i++) {
		// If already encountered before,
		// return false
		if (st.has(arr[row][i])) return false;

		// If it is not an empty cell, insert value
		// at the current cell in the set
		if (arr[row][i] != 0) st.add(arr[row][i]);
	}
	return true;
}

// Checks whether there is any duplicate
// in current column or not.
function notInCol(arr, col) {
	let st = new Set();

	for (let i = 0; i < 9; i++) {
		// If already encountered before,
		// return false
		if (st.has(arr[i][col])) return false;

		// If it is not an empty cell,
		// insert value at the current
		// cell in the set
		if (arr[i][col] != 0) st.add(arr[i][col]);
	}
	return true;
}

// Checks whether there is any duplicate
// in current 3x3 box or not.
function notInBox(arr, startRow, startCol) {
	let st = new Set();

	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 3; col++) {
			let curr = arr[row + startRow][col + startCol];

			// If already encountered before, return
			// false
			if (st.has(curr)) return false;

			// If it is not an empty cell,
			// insert value at current cell in set
			if (curr != 0) st.add(curr);
		}
	}
	return true;
}

// Checks whether current row and current column and
// current 3x3 box is valid or not
function isValid(arr, row, col) {
	return notInRow(arr, row) && notInCol(arr, col) && notInBox(arr, row - (row % 3), col - (col % 3));
}

function isValidConfig(arr, n) {
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			// If current row or current column or
			// current 3x3 box is not valid, return
			// false
			if (!isValid(arr, i, j)) return false;
		}
	}
	return true;
}

function nextEmptySpot(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] == 0) {
				return [i, j];
			}
		}
	}
	return [-1, -1];
}

/* Solving Algorithm */

function checkRow(board, row, value) {
	for (var i = 0; i < board[row].length; i++) {
		if (board[row][i] == value) {
			return false;
		}
	}

	return true;
}

function checkColumn(board, column, value) {
	for (var i = 0; i < board.length; i++) {
		if (board[i][column] == value) {
			return false;
		}
	}

	return true;
}

function checkSquare(board, row, column, value) {
	var boxRow = Math.floor(row / 3) * 3;
	var boxCol = Math.floor(column / 3) * 3;

	for (var r = 0; r < 3; r++) {
		for (var c = 0; c < 3; c++) {
			if (board[boxRow + r][boxCol + c] === value) return false;
		}
	}

	return true;
}

function checkValue(board, row, column, value) {
	// If the Row, Column and Square is Valid return true
	if (checkRow(board, row, value) && checkColumn(board, column, value) && checkSquare(board, row, column, value)) {
		return true;
	}

	return false;
}

/* Calling Checking Algorithm */

// Check if Sudoku is solved correct by user
// const container = document.getElementById('container');
// container.addEventListener('input', checkFullBoard);
// function checkFullBoard() {
// 	var board = [];
// 	for (let n = 1; n < 81; n++) {
// 		var val = document.getElementById('sudoku-input-' + n).value;

// 		if (!val == 0) {
// 			document.getElementById('sudoku-input-' + n).tabIndex = -1;
// 			board.push(val);
// 		} else {
// 			board.push(0);
// 		}
// 	}

// 	if (board.includes(0)) {
// 		return;
// 	}
// 	alert('Alle Felder besetzt');

// 	console.log(board);
// 	board = formatGrid(board);

// 	// Call for every field the checking algorithm
// 	let c = 1;
// 	let validVal = 0;
// 	for (let i = 1; i < 9; i++) {
// 		for (let j = 1; j < 9; j++) {
// 			if (checkValue(board, i, j, document.getElementById('sudoku-input-' + c).value)) {
// 				validVal++;
// 			}
// 			c++;
// 		}
// 	}

// 	if (validVal === 81) {
// 		alert('Glückwunsch');
// 	} else {
// 		alert('Falsche Eingabe');
// 	}
// }

//////////////////* Required functions for create.js *////////////////////////////

////* Rotate and formatGrid Functions *////

// Both functions are called in the same order as can be seen here.
//
// The Rotate function requires an flaten array with a length of 81 as parameter and
// also returns a flaten array
function rotateBy90(grid, rowLength) {
	var newGrid = [];
	for (var i = 0; i < grid.length; i++) {
		var x = i % rowLength;
		var y = Math.floor(i / rowLength);
		var newX = rowLength - y - 1;
		var newY = x;
		var newPosition = newY * rowLength + newX;
		newGrid[newPosition] = grid[i];
	}
	return newGrid;
}

// The FormatGrid functions brings the array to it's default format
function formatGrid(grid) {
	var newGridCopy = [];
	const chunkSize = 9;
	for (let i = 0; i < grid.length; i += chunkSize) {
		const chunk = grid.slice(i, i + chunkSize).flat(9);
		newGridCopy.push(chunk);
	}
	return newGridCopy;
}

////* Shuffle Functions *////

function shuffle(a) {
	var j, x, i;
	for (i = a.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		x = a[i];
		a[i] = a[j];
		a[j] = x;
	}
	return a;
}

// Both functions swap the 3 lines in each Sudoku Square. This changes the Sudoku but it remains valid
const shuffleRows = (array) => {
	return [shuffle(array.slice(0, 3)), shuffle(array.slice(3, 6)), shuffle(array.slice(6))].flat();
};

const shuffleColumns = (array) => {
	return [shuffle(array.slice(0, 3)), shuffle(array.slice(3, 6)), shuffle(array.slice(6))].flat();
};

////* Create Table Function *////

let c = 0; // Count of empty fields
// Displays an Square array in form of an Sudoku Grid
function createTable(tableData) {
	let i = 0; // Input Field Index
	c = 0;

	var table = document.createElement('table');
	table.setAttribute('id', 'sudoku-table');
	var tableBody = document.createElement('tbody');

	tableData.forEach(function (rowData) {
		var row = document.createElement('tr');

		rowData.forEach(function (InputData) {
			i++;

			var input = document.createElement('input');
			if (InputData != 0) {
				input.setAttribute('value', InputData);
				input.setAttribute('class', 'sudoku-input');
				input.tabIndex = -1;
				input.readOnly = true;
			} else {
				c++; // If there isn't a number in the current field count up by one
			}
			input.autocomplete = 'off';
			input.setAttribute('type', 'text');
			input.maxLength = '1';
			input.oninput = "this.value=this.value.replace(/[^0-9]/g,'');";
			input.setAttribute('id', 'sudoku-input-' + i);

			row.appendChild(input);
		});

		tableBody.appendChild(row);
	});

	//Remove table if present
	const myTable = document.getElementById('sudoku-table');
	const container = document.getElementById('container');
	if (document.getElementById('container').contains(myTable)) {
		container.removeChild(container.lastChild);
	}

	table.appendChild(tableBody);
	document.getElementById('container').appendChild(table);

	console.log('Das Sudoku hat ' + c + ' Leerstellen');
}

////* Difficulty *////

// Set the difficulty which the user has chosen
// // and show him
// function setDifficulty() {
// 	var value = document.getElementById('select').value;
// 	var elem = document.getElementById('difficulty');

// 	switch (value) {
// 		case 'easy':
// 			elem.innerHTML = 'difficulty: Easy';
// 			break;
// 		case 'normal':
// 			elem.innerHTML = 'difficulty: Normal';
// 			// return normal;
// 			break;
// 		case 'hard':
// 			elem.innerHTML = 'difficulty: Hard';
// 			// return hard;
// 			break;
// 		case 'insane':
// 			elem.innerHTML = 'difficulty: Insane';
// 			// return insane;
// 			break;
// 		default:
// 			elem.innerHTML = '---';
// 			return false;
// 	}
// }

// Get the current difficulty
// function getDifficulty() {
// 	var value = document.getElementById('select').value;

// 	switch (value) {
// 		case 'easy':
// 			return easy;
// 		case 'normal':
// 			// return normal;
// 			break;
// 		case 'hard':
// 			// return hard;
// 			break;
// 		case 'insane':
// 			return insane;
// 			break;
// 		default:
// 			return false;
// 	}
// }

////* Stopwatch *////

// starts an infinite timer
var t;
function startTimer() {
	const container = document.getElementById('time');
	var sec = 0;
	var min = 0;
	var hrs = 0;

	function tick() {
		sec++;
		if (sec >= 60) {
			sec = 0;
			min++;
			if (min >= 60) {
				min = 0;
				hrs++;
			}
		}
	}

	function add() {
		tick();
		container.innerHTML = (hrs > 9 ? hrs : '0' + hrs) + ':' + (min > 9 ? min : '0' + min) + ':' + (sec > 9 ? sec : '0' + sec);
		timer();
	}

	function timer() {
		t = setTimeout(add, 1000);
	}
	timer();
}

function stopTimer() {
	clearInterval(t);
}

// program to get a random item from an array

function getRandomItem(arr) {
	// get random index value
	const randomIndex = Math.floor(Math.random() * arr.length);

	// get random item
	const item = arr[randomIndex];

	return item;
}

// Reset Button
document.getElementById('reset').addEventListener('click', () => {
	createTable(board);
});
