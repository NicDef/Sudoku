'use strict';

let board = [];
let boardCopy = []; // A copy of the created board
// is required in the SA solving algorithm

function createSudoku() {
	stopTimer();
	console.time('Create');
	function create(grid) {
		var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		var newGrid = [];
		var rowLength = Math.sqrt(grid.length); // Always 9
		newGrid.length = grid.flat().length;

		// Rotate Matrix by 90 degrees
		newGrid = rotateBy90(grid.flat(), rowLength);

		// Copy newGrid into right format
		newGrid = formatGrid(newGrid);

		// Shuffle rows of the rotated Matrix
		newGrid = shuffleRows(newGrid);

		// Rotate matrix to it's original orientation
		for (let i = 0; i < 3; i++) {
			newGrid = rotateBy90(newGrid.flat(), rowLength);
		}

		// Copy newGrid into right format
		newGrid = formatGrid(newGrid);

		// Shuffle the matrix again
		newGrid = shuffleColumns(newGrid);

		// Map any number group to any other number group
		const fisherYatesShuffle = (deck) => {
			for (var i = deck.length - 1; i > 0; i--) {
				const swapIndex = Math.floor(Math.random() * (i + 1));
				const currentCard = deck[i];
				const cardToSwap = deck[swapIndex];
				deck[i] = cardToSwap;
				deck[swapIndex] = currentCard;
			}

			return deck;
		};
		const shuffled = fisherYatesShuffle(numbers);

		const conversion = {};
		// i + 1 because we want 1-9 as keys and arrays start at index 0
		shuffled.forEach((e, i) => (conversion[i + 1] = e));

		// Only gridLength because a sudoku is a square (9*9)
		const assignMappedNumbers = (grid, numObject, gridLength, defaultVal) => {
			let a;
			let mappedNumbersGrid = [];
			for (let i = 0; i < gridLength; i++) {
				mappedNumbersGrid.push([]);
				for (let j = 0; j < gridLength; j++) {
					a = numObject[[grid[i][j]]] || defaultVal;
					mappedNumbersGrid[i].splice(j, 0, a);
				}
			}
			return mappedNumbersGrid;
		};
		board = assignMappedNumbers(newGrid, conversion, 9, 0);

		for (let i = 0; i < board.length; i++) boardCopy[i] = board[i].slice();

		console.log(board);

		createTable(board);
		console.timeEnd('Create');
	}

	// Create Sudoku based on difficulty
	// const difficulty = getDifficulty();
	// // console.log(difficulty);
	// if (!difficulty || difficulty == []) {
	// 	return alert('Etwas ist schiefgelaufen');
	// }
	const index = getRandomIntInclusive(0, easy.length - 1);
	create(easy[index].flat());

	// alert(isValidConfig(board, 9) ? 'YES' : 'NO');
	startTimer();
}
