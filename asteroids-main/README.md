# This repo will contain the HTML implementation of the Atari game Asteroids

This game will be written by Dakota Turk and Harrison Walker

## Goals

The goal of the game is pretty straight forward, the player is a small triangular space ship that flies around space avoiding fast and slow moving asteroids. In order to evade the asteroids, the player can shoot them down with their built on cannon, navigate out of their path of destruction or jump into hyper space and attempt a dodge in doing so.

The main objective of this game is to survive. There is no score limit, nor level limit. Upon clearing the level, a new set of asteroids will spawn where one more than what started on the previous level will spawn with a max up to 10. The only way for the player to win, is to simply never lose. They are stuck in a never ending cycle of asteroids constantly trying to destroy them. That is, until their score limit hits the javascript max value which would likely break the entire game.

## Controls

The controls of the game will likely be very simple. A brief example:

W - Move Forward ![Forward Gif](Gifs/W.gif)
A - Turn Left ![Turn Left Gif](Gifs/A.gif)
S - Hyperspace Jump ![Hyperspace Gif](Gifs/S.gif)
D - Turn Right ![Turn right Gif](Gifs/D.gif)
Space - Shoot ![Shoot Gif](Gifs/Space.gif)

## Implementation

The implementation of this game is broken up into a few files: asteroid.js, bullet.js and player.js are all javascript files containing the asteroid, bullet and player classes. These are all used in the game.js to play the game which is implemented in the asteroids.html file. The menu.js script is used to manage the main menu scene which is implemented in the menu.html file.

The player can start the experience by first cloning this repo: <https://github.com/dturk0610/asteroids.git> Then navigate to the menu.html file found in [Asteroids/menu.html](/Asteroids/menu.html). Opening this file in your browser should show the main menu:

![menu img](/Images/StartMenu.png)

All testing has happened on the Microsoft Edge, Safari and Google Chrome. Chrome and Edge seem to perform the best, however. This testing was not done extensively by any manner, but the browser choosen will likely make an impact on performance.

When clicking within the Start box the title and box will highlight white to let the player know that they are infact about to enter the game. However, if the player would like to continue admiring the main menu, while holding their click down they can move away from the start box and left go of their click, making the title and box turn purple again. This type of interaction can later be seen when clicking on the game over box. This game over will be shown upon the player losing all of their lives:

![Gameover img](/Images/Gameover.png)

### Asteroids

Each asteroid has a center, a velocity, a magnitude, a size and an array containing the vertices. The center, velocity and vertices are all randomly generated. The momentum is calculated using the area of the asteroid and the velocity of the asteroid, however this is not used yet. Finally the size value represents which stage the asteroid is in. 3 being the largest and initialized value, 2 being the mid sized asteroid and 1 being the last level before complete destruction of the asteroid.

To create a brand new asteroid, first a random position on the screen is picked to be the center. Next, 12 points evenly rotated around the center are generated at random radius from the center. Finally, a random velocity vector is also generated. After, each asteroid within a radius is pushed slightly away from the player so that they do not immediatley crash into the player and kill them. When an asteroid is broken, two asteroids are generated at the same position as the parent asteroid but with a smaller radius and different velocity vector (about 45 degrees off the original direction with a slight noise value so that the next level direction velocity vectors don't perfectly match).

### Player

The player is a triangular shaped space ship

![ship img](/Images/Ship.png)

The controls to move the player around are consistent with as stated above. W to move forward, A and D to turn left or right respectively and S to jump into hyper space. The player spawns in the center of the screen and is required to dodge incomming asteroids as they fly through space. They can use the space key to shoot them down. There is no cap on bullets, however, there is a cool down for their cannon. There is a time period between each bullet that the player can't shoot, during this small time period, the player will need to do evasive maneuvers in order to survive the incomming asteroids.

#### Lives

The player has 3 lives. You loose one when you collide with an asteroid. The lives are shown at the top right of the screen using 3 player models.

![lives img](/Images/Lives.png)

### Score

Score is shown in the top right of the web page. All numerics and phonetic characters seen throughout the entire game cann all be found in the characters.js file as a list of vertex per character. The score for the player increases as time progresses, awarding them for the length of time they have survived. The score also increases every time the player successfully shoots an asteroid. Surviving increases the player's score by one, and shooting an asteroid will increase the player's score by 10 for every asteroid hit.

![score img](/Images/Score.png)

### Collisions

The collisions in this game, while minimal, still deserve a section dedicated to them to explain. There are thre major typs of collisions. Player on asteroid, bullet on asteroid and all on edge of the screen.

#### Edge collisions

The player on edge collisions and bullet on edge collisions both work identically. When the center of the object gets past the edge of the screen some math is done to determine the object is actually moving toward that side of the screen. Once this is done, the center is updated accordingly. If the center is going off to the right, the center is then moved to the left side of the screen. If the center is above the screen and is moving up, then the center is moved to the bottom of the screen. This behavior is copied for all sides of the screen.

The asteroid on edge collisions work differently. If the asteroid is determined to be going off the screen, a copy of the asteroid is made on all sides of the screen necessary to make a seamless movement for the asteroid on is path of destruction for the player. After the asteroid has moved completely off the screen, it is finally destroyed. To account for problems relating to insecure destruction of asteroids, each asteroid is labeled with an id. Every time the asteroid is copied, the id is copied over as well. When the player shoots an asteroid, all asteroids with the same id are moved to the deletion list to account for these "edge asteroids"

#### Bullet on Asteroid Collision

Implemented early on in the design process, we added a feature to test if a point was within a convex polygon. This "isInside" was based on the work found [here](https://www.geeksforgeeks.org/how-to-check-if-a-given-point-lies-inside-a-polygon/). After implementing this, we can loop through all current bullets in the frame and test to see if a point on the bullet isInside the asteroid. This is done by finding the point on the bullet that is on the line that separating the asteroids center and the bullets center. Using this point, given the speed of the bullets and the time between frames, if the point is within the shape at this moment, we can assume it to have collided with the asteroid. Below is a breif visualization of this:

![bullet asteroid collision bef](/Images/BeforeCollision.gif)
No collision

![bullet asteroid collision](/Images/Collision.gif)
Collision detected

![bullet asteroid collision aft](/Images/AfterCollision.gif)
After Collision

#### Player on Asteroid Collision

This collision method is more complicated than the previous two. More details can be found [here](https://stackoverflow.com/questions/753140/how-do-i-determine-if-two-convex-polygons-intersect). This is done by first calculating the plane separating the player and the asteroid. After that, all points around the player and asteroid are converted to the seperating axis, and the distance axis. If there is an overlap in these values, then we can assume the player and asteroid are colliding. This does create instances where an interection may not actually be happening, but this is a rare occurence to happen. Below is a visual of a sample before and after collision:

No overlap on the separating axis:

![before player asteroid collision](/Images/PlayerAsteroidBeforeCollision.gif)

Overlap on separating axis

![after player asteroid collision](/Images/PlayerAsteroidCollision.gif)

### Sound

- Shooting:

<https://user-images.githubusercontent.com/50917856/157999802-10226408-f982-4d8c-b654-e8804d35f545.mp4>

- Player death:

<https://user-images.githubusercontent.com/50917856/157999813-7baeeffb-1563-4055-9e4c-11c2863e20c6.mp4>

- Asteroid explode:

<https://user-images.githubusercontent.com/50917856/157999819-19c34326-1f8d-49ff-9ac0-26172e32891e.mp4>

We do not claim to own this game or any of its intellectual property (if any) we simply are making this game for our Computer Graphics course.
