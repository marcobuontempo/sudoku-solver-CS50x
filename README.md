# SUDOKU SOLVER - CS50x Final Project
#### Video Demo: [Youtube](https://youtu.be/ajh5slneSkw)
#### Live Demo: [Hosted Webpage](https://marcobuontempo.github.io/sudoku-solver-CS50x/)
<br>

## Description:
A sudoku puzzle solver - input any known numbers into the grid cells, and if the input is valid, it will generate a working solution!

### Built with:
* HTML
* CSS
* JavaScript (Vanilla)

### Main components:

`index.html` is where the front-end display is structured. The page consists of a 9x9 table, representing each cell of a sudoku puzzle. This is where the user can type known numbers into cells, and where the final solution will be displayed.

`styles.css` contains basic styling and ensures the sudoku table is represented properly.

`index.js` contains the entire logic of the sudoku solver. It consists of the solving algorithm, as well as some DOM manipulation to get inputs and display data.  

*Created as part of [CS50x Harvard Online Course](https://cs50.harvard.edu/x/)'s requirements.*
<br><br>

## Solving Algorithm:  
````
brute_solve(board)  //returns a solved board
````
The method to solve each puzzle is a brute force approach, using a "back-tracking" algorithm. Basically, each possible number is tested until a solution is found. Due to it only being a 9x9 grid (81 numbers to solve), this can usually be achieved within milliseconds.

1. The first valid number in the first blank cell will be placed.
2. Repeat step 1. If at any point, the puzzle is unsolveable (i.e. can't place any valid numbers), then the last number placed will be removed and replaced with the next valid number instead (hence, "back-tracking"). It will continuously back-track until a valid number is found, and therefore until the valid solution is found.
<br><br>

### Average Solve Times:
````
solve(board)    //returns a solved board, as well as the time required to find the solution
````
*(based on [sudoku.com](https://sudoku.com/) puzzle difficulty - using 2.6 GHz Dual-Core Intel Core i5)*
* Easy - 2ms
* Medium - 15ms
* Hard - 20ms
* Expert - 200ms
* Evil - 800ms
<br><br>

## Additional Notes:
The original intention was to use solving algorithms that would use logical deduction to solve the board (i.e. the same methods how a human would solve it). However, this method was unable to solve the most difficult puzzles. Greater complexity and methods could possibly have been added - although this was disregarded in the end due to the scope of this project.

A brute force approach was adopted instead, as this was able to solve every single puzzle (as long as the input is valid), in exchange for slower performance.

After running the brute force approach, most puzzles can be solved within milliseconds. Although the rarer and most difficult puzzles can take 1000+ ms to complete.

A hybrid approach was considered, combining both logical deduction methods with brute force, but for the extent of performance gains, it was decided not to be worth it. Considering the already relatively fast solve times, there was no need to completely optimise performance for this project's use case.

The program is also to validate and handle incorrect inputs. For example, if there are duplicate values in a row, column or 3x3, the puzzle will reject solving and warn the user with an on-screen prompt. Additionally, if an impossible/unsolveable puzzle is input, `display_solution(solution)` will catch the error and similarly present a meaningful prompt to the user.

There is no intention to further develop this project. It's sole intention was to create a functional application, and this brief has been achieved. 
<br><br>

## Author:
* Marco Buontempo (2022)
<br><br>

## License:
This project is licensed under the [MIT License](LICENSE).