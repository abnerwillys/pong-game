# 🎖️ Interview Tips (key points to comment):

### 🌀 requestAnimationFrame
> I used `requestAnimationFrame` to create the core game loop, which runs in sync with the browser’s refresh rate. This ensures smooth animations and better performance compared to `setInterval`, and it also automatically pauses in background tabs, which is great for efficiency.

> I wrapped it in a custom `useGameLoop` hook that calculates `delta` time per frame, which lets me keep all movement logic (ball, paddles, etc.) frame-rate independent. That way, the game plays consistently across different devices and performance levels.

---

### 🎹 Simultaneous Multi-Key Input (2-Player Controls)
> I used global `keydown` and `keyup` listeners because they're reliable regardless of component focus — which is essential in a game where the user shouldn't have to "click to focus" before controlling paddles.

> Input state is tracked via a simple object (`keysPressedRef`) so I can detect multiple keys being held at the same time — for example, both players moving their paddles simultaneously.

> This approach mirrors how traditional games handle input and ensures fluid, real-time responsiveness with very minimal performance cost.

--- 

### 🏓 Step 5 – Paddle Collision with Dynamic Bounce
> For paddle collision, I used a basic axis-aligned bounding box (AABB) check to detect if the ball overlaps a paddle. Once a collision is detected, I reverse the horizontal velocity to simulate a bounce and reposition the ball slightly to prevent it from sticking.

> I also added a small vertical deflection based on where the ball hits the paddle. This uses a normalized hit point — `-1` at the top, `0` in the center, and `+1` at the bottom — and applies that to the vertical velocity. This makes the bounce angle feel more dynamic and gives the player better control, similar to real Pong or air hockey.

> It’s a small change in code, but it significantly improves the gameplay and makes the game more skill-based without adding complexity.

> Also, I decided to keep this logic inside the animation loop so it stays frame-rate independent


---
### 🔁 Multi-Ball (Future Feature)
> I planned the architecture to support multi-ball gameplay in harder difficulties. The idea was to abstract the ball logic to support an array of balls instead of just one — where each ball maintains its own position, velocity, and collision updates per frame.

> This opens up a lot of gameplay potential without rewriting the engine — for example, spawning multiple balls during “Hard” mode. It's a great way to increase challenge while reusing existing logic and keeping the codebase modular.

> I intentionally designed the useBall hook and the canvas renderer in a way that could be easily extended for this, but left it as a stretch goal due to time constraints.

--- 
### 📊 Difficulty System with Local Persistence
> I implemented a difficulty selector that adjusts paddle size and ball speed based on the selected level — Easy, Medium, or Hard. The settings persist in localStorage, so the player’s preference is saved between sessions.

> This kind of state persistence mimics what real games do and helps demonstrate product polish and attention to UX — even in simple games.

> The difficulty toggle is accessible via both UI and keyboard shortcut (cycling with a single key), giving flexibility for casual and power users.