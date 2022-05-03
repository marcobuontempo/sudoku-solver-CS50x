const b = "b" //blank tile

const default_board = [ [b, b, b, b, b, b, b, b, b],
                        [b, b, b, b, b, b, b, b, b],
                        [b, b, b, b, b, b, b, b, b],
                        [b, b, b, b, b, b, b, b, b],
                        [b, b, b, b, b, b, b, b, b],
                        [b, b, b, b, b, b, b, b, b],
                        [b, b, b, b, b, b, b, b, b],
                        [b, b, b, b, b, b, b, b, b],
                        [b, b, b, b, b, b, b, b, b] ]

const test_board_b =  [ [1, 2, 3, 4, 5, 6, 7, 8, 9],
                        [7, 8, 9, 1, 2, 3, 4, 5, 6],
                        [4, 5, 6, 7, 8, 9, 1, 2, 3],
                        [3, 1, 2, 8, 4, 5, 9, 6, 7],
                        [6, 9, 7, 3, 1, 2, 8, 4, 5],
                        [8, 4, 5, 6, 9, 7, 3, 1, 2],
                        [2, 3, 1, 5, 7, 4, 6, 9, 8],
                        [9, 6, 8, 2, 3, 1, 5, 7, 4],
                        [5, 7, 4, 9, 6, 8, 2, 3, 1] ]

const test_board =    [ [b, b, 5, b, b, b, b, b, b],
                        [b, b, b, b, b, 4, b, 7, b],
                        [3, 6, b, 1, b, b, 8, b, b],
                        [b, b, 2, 9, b, b, b, b, b],
                        [9, 5, b, b, 7, b, b, 8, b],
                        [b, b, 1, b, b, b, 5, b, b],
                        [2, b, b, b, b, b, b, b, b],
                        [b, b, b, b, 1, b, b, b, 3],
                        [8, 9, b, 3, b, b, 6, b, b] ]

const default_numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

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

function check_valid_number (row, column, board, number_to_check) {
    if(check_row_valid_number(row, column, board, number_to_check) &&
    check_column_valid_number(row, column, board, number_to_check) &&
    check_3x3_valid_number(row, column, board, number_to_check)) {
        return true
    }
    return false
}


function check_solved(board) {

    for(let i=0; i<BOARD_SIZE; i++) {
        const values_required = default_numbers.map(number => number)

        for(let n=0; n<BOARD_SIZE; n++) {
            let value_used = false
            for(let j=0; j<BOARD_SIZE; j++) {
                if(board[i][j] == values_required[n]) {
                    value_used = true
                }
            }
            if(!value_used) {
                return false
            }
        }
    }

    for(let i=0; i<BOARD_SIZE; i++) {
        const values_required = default_numbers.map(number => number)

        for(let n=0; n<BOARD_SIZE; n++) {
            let value_used = false
            for(let j=0; j<BOARD_SIZE; j++) {
                if(board[j][i] == values_required[n]) {
                    value_used = true
                }
            }
            if(!value_used) {
                return false
            }
        }
    }
    
    return true
}


function brute_solve(board) {
    let empty_found = false
    let tile_updated = false

    for(let i=0; i<BOARD_SIZE; i++) {
        for(let j=0; j<BOARD_SIZE; j++) {

            for(let n=0; n<BOARD_SIZE; n++) {

                if(isNaN(board[i][j])) {
                    empty_found = true

                    const number_checking = default_numbers[n]

                    if(check_valid_number(i,j,board,number_checking)) {
                        console.log("updating board [",i," ",j,"] with ", number_checking)
                        board[i][j] = number_checking
                        updated_tile = true
                        if(brute_solve(board) == false) {
                            updated_tile = false
                            continue
                        } else {
                            return true
                        }
                    }
                }



            }
        }
    }

    if(empty_found && !tile_updated) {
        print_board(board)
        return false
    }

    if(!empty_found) {
        if(check_solved(board)) {
            print_board(board)
        }
    }
}


function print_board(board) {
    let print = ["|=======|=======|=======|\n"]

    for(let i=0; i<BOARD_SIZE; i++) {
        if(i%3===0 && i!==0) {
            print.push("|-------|-------|-------|\n")
        }
        const row = []
        for(let j=0; j<BOARD_SIZE; j++) {
            if(j%3===0) {
                row.push("| ")
            }
            row.push(board[i][j])
            row.push(" ")
        }
        row.push("|\n")
        print.push(row.join(""))
    }
    print.push("|=======|=======|=======|")
    print = print.join("")
    console.log(print)
}

brute_solve(test_board)