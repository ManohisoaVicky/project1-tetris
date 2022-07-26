
# Project 1: Tetris

## Manohisoa Project

---

### How do you play Tetris?

You bring down blocks from the top of the game board. You can move the blocks right and left, and you can rotate them. The goal is to complete as many rows filled with blocks as much as possible. The game ends when a tower of block touches the top of the game board. 

--- 
### My goal and plans.

My goal is to recreate a working Tetris game. 

To start, I pondered on whether it would have been best to use html divs as grids or html canvas for the game board. After much research, I decided to use html canvas. One of the reasons why I chose html canvas has to do with the rotations of the tetrominos. I figured using html canvas would more practical. 

I wrote the basic html and css that I thought would be necessary. Once done, I started building the grid for the game using html's canvas and javascript. Building the grid was straightforward. The challenge came after that. Drawing the different tetromino shapes was tricky. It took me some time to figure out how to draw the tetrominos. Once I was able to draw the tetromino things proceeded a little more smoothly. Adding the falling motion was a lot easier once I had figured out how to draw the tetrominos. However, my code seemed a bit too complicated and long, so I researched for ways to improve it. I found out about requestAnimationFrame() and decided to use it to improve my code. 