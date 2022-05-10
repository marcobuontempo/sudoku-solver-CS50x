# SUDOKU SOLVER - CS50x Final Project
#### Video Demo: <URL HERE>
<br>

## Description:
A sudoku solver. Input any known numbers into the grid cells, and if the input is valid, it will generate a working solution! Created as part of [CS50x Harvard Online Course](https://cs50.harvard.edu/x/)  
1. `index.html` is where the front-end display is structured. The page consists of a 9x9 table, representing each cell of a sudoku puzzle. This is where the user can type known numbers into cells, and where the final solution will be displayed.
2. `styles.css` contains basic styling and ensures the sudoku table is represented properly.
3. `index.js` contains the entire logic of the sudoku solver. It consists of the solving algorithm, as well as some DOM manipulation to get inputs and display data.
<br><br>

***Solving Algorithm:***  
````
brute_solve(board)
````
The method to solve each puzzle is a brute force approach, using a "back-tracking" algorithm. 
1. The first valid number in the first blank cell will be placed.
2. Repeat step 1. If at any point, the puzzle is unsolveable (i.e. can't place any valid numbers), then the last number placed will be removed and replaced with the next valid number instead (hence, "back-tracking"). It will continuously back-track until a valid number is found, and therefore until the valid solution is found.
<br><br>

***Average Solve Times (based on [sudoku.com](https://sudoku.com/) puzzle difficulty - using 2.6 GHz Dual-Core Intel Core i5):***
* Easy - 2ms
* Medium - 15ms
* Hard - 20ms
* Expert - 200ms
* Evil - 800ms
<br><br>

***Other Notes:***
- The original intention was to use solving algorithms that would use logical deduction to solve the board (i.e. how a human would solve it). However, this method was unable to solve the most difficult puzzles. Greater complexity could possibly have been added but for the scope of the project, would have overcomplicated it.
- A brute force approach was adopted instead, as this was able to solve every puzzle (as long as the input is valid), in exchange for slower performance.
- After running the brute force approach, most puzzles can be solved in under 100ms. Although the rarer and most difficult puzzles can take 1000+ ms to complete.
- A hybrid approach was considered, combining both logical deduction and brute force, but for the scope of the project the extent of performance gains, it was decided not worth it. Considering the already relatively fast solve times, there was no need to completely optimise performance for this project's use case.