function bruteForce(board) {
	let cell = nextEmptySpot(board);
	let row = cell[0];
	let col = cell[1];

	// Base case: if no empty cell
	if (row == -1) {
		return true;
	}

	for (let n = 1; n <= 9; n++) {
		//check if valid
		if (checkValue(board, row, col, n)) {
			board[row][col] = n;

			if (bruteForce(board)) {
				return true;
			}

			board[row][col] = 0;
		}
	}

	return false;
}

document.getElementById('solve').addEventListener('click', () => {
	if (typeof board !== 'undefined' && board.length > 0) {
		var time0 = performance.now();
		if (bruteForce(board)) {
			var time1 = performance.now();
			alert('It took the computer ' + Math.round((time1 - time0 + Number.EPSILON) * 100) / 100 + ' sec to solve this sudoku');
			if (isValidConfig(board)) {
				stopTimer();
				return createTable(board);
			} else {
				alert('Something went wrong!');
				return;
			}
		} else {
			alert('Ein Fehler ist aufgetreten. Es handelt sich wahrscheinlich um ein ungültiges Sudoku!');
		}
	}
});
