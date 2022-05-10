/* 
 * NOTES:
 * Rows/Columns are 0 indexed.
 * Boards are represented as multidimensional arrays. board[row][column].
 * EXAMPLE: board[2][4] = cell in 3rd row, 5th column
*/


// Blank (Unknown) Cells
const b = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

// Board width and height
const BOARD_SIZE = 9


// Returns start row# of a 3x3 box
function get_3x3_row (row) {
    return Math.floor(row/3) * 3
}

// Returns start column# of a 3x3 box
function get_3x3_column (column) {
    return Math.floor(column/3) * 3
}

// Check whether number is already in a given row
function check_row_valid_number (row, column, board, number_to_check) {
    for(let i=0; i<BOARD_SIZE; i++) {
        if(i === column) { 
            continue 
        } else if (board[row][i] === number_to_check) { 
            return false
        }
    }
    return true
}

// Check whether number is already in a given column
function check_column_valid_number (row, column, board, number_to_check) {
    for(let i=0; i<BOARD_SIZE; i++) {
        if(i === row) { 
            continue 
        } else if (board[i][column] === number_to_check) { 
            return false
        }
    }
    return true
}

// Check whether number is already in a given 3x3 box
function check_3x3_valid_number (row, column, board, number_to_check) {
    const box_row = get_3x3_row(row)
    const box_column = get_3x3_column(column)

    for(let i=box_row, row_len=box_row+3; i<row_len; i++) {
        for(let j=box_column, col_len=box_column+3; j<col_len; j++) {
            if(i === row && j === column) { 
                continue 
            } else if (board[i][j] === number_to_check) { 
                return false
            }
        }
    }
    return true
}

// Check whether a number is valid (i.e. not in row, column or 3x3)
function check_valid_number (row, column, board, number_to_check) {
    if(check_row_valid_number(row, column, board, number_to_check) &&
    check_column_valid_number(row, column, board, number_to_check) &&
    check_3x3_valid_number(row, column, board, number_to_check)) {
        return true
    }
    return false
}


// Check whether a board is solved. It does not validate the solution, just checks whether all cells have been filled.
function check_solved(board) {
    for(let i=0; i<BOARD_SIZE; i++) {
        for(let j=0; j<BOARD_SIZE; j++) {
            if(isNaN(board[i][j])) { return false }
        }
    }
    return true
}


// Solve board by brute force (.. try a number, backtrack if board is invalid, repeat until solved)
function brute_solve(board) {

    let empty_found = false

    for(let i=0; i<BOARD_SIZE; i++) {
        for(let j=0; j<BOARD_SIZE; j++) {

            if(isNaN(board[i][j])) {

                empty_found = true

                for(let n=0; n<BOARD_SIZE; n++) {
                    const number_checking = b[n]
                    if(check_valid_number(i,j,board,number_checking)) {
                        board[i][j] = number_checking
                        if(brute_solve(board)) {
                            return board
                        } else {
                            board[i][j] = b
                            continue
                        }
                    }
                }
                return false
            }
        }
    }

    if(!empty_found) {
        if(check_solved(board)) {
            return board
        } else {
            return false
        }
    }

}

// Solves board and records the execution time
function solve(board) {
    const start_time = performance.now()    
    
    board = brute_solve(board)
        
    const end_time = performance.now()

    const total_execution = Math.round((end_time - start_time)*100) / 100

    return [board, total_execution]
}


// Import Board from user's input on webpage
function import_board() {
    const board = [ [b, b, b, b, b, b, b, b, b],
                    [b, b, b, b, b, b, b, b, b],
                    [b, b, b, b, b, b, b, b, b],
                    [b, b, b, b, b, b, b, b, b],
                    [b, b, b, b, b, b, b, b, b],
                    [b, b, b, b, b, b, b, b, b],
                    [b, b, b, b, b, b, b, b, b],
                    [b, b, b, b, b, b, b, b, b],
                    [b, b, b, b, b, b, b, b, b] ]


    for(let i=0; i<BOARD_SIZE; i++) {
        for(let j=0; j<BOARD_SIZE; j++) {
            const input = document.querySelector(`[data-row="${i}"][data-column="${j}"]`)
            const value = Number(input.value)

            if(value>=1 && value<=9) {
                if(check_valid_number(i,j,board,value)) {
                    board[i][j] = value
                    input.style.color = "black"
                } else {
                    document.querySelector("#message").innerHTML = "Invalid Input"
                    input.style.color = "red"
                    return false
                }
            } else {
                input.style.color = "blue"
            }
        }
    }

    return board
}

// Display the solution on webpage once solved
function display_solution(solution) {
    try {
        const board = solution[0]
        const total_execution = solution[1]
    
        for(let i=0; i<BOARD_SIZE; i++) {
            for(let j=0; j<BOARD_SIZE; j++) {
                const input = document.querySelector(`[data-row="${i}"][data-column="${j}"]`)
                if(input.value == "") {
                    input.value = board[i][j]
                }
            }
        }
        
        document.querySelector("#message").innerHTML = `Time to solve: <span style="font-style: italic;">${total_execution} ms</span`
    } catch {
        document.querySelector("#message").innerHTML = `Unsolveable puzzle. Please adjust input.`
    }
}

// Event handler for webpage's "Solve!" button
function handle_solve_button() {
    let board = import_board()

    if(board) {
        const solution = solve(board)
        display_solution(solution)
    }
}