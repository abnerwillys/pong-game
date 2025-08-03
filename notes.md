# Notes – Make Labs Ping-Pong Game

This document contains incremental notes describing my thought process, design decisions, trade-offs, and what I would improve with more time.

---

## ➡️  Step 1–2: Setup

I chose **React + TypeScript + Vite** (besides to be the ask in the challenge instructions) for fast development, strong typing, and modern bundling. `Tailwind CSS` was added early to keep layout and styling consistent with the Make Labs stack. This setup offers strong developer experience and enables clean component structure.

---

## ➡️ Step 3: Game Loop and Ball Movement 

### 🎯 Goal

Create a smooth, frame-consistent ball animation inside a canvas.

### 🔹 Why I Used `requestAnimationFrame`

I implemented a custom game loop using `requestAnimationFrame` to handle the ball movement. This method was chosen over alternatives like `setInterval` or `setTimeout` because:

- It syncs with the browser's **refresh rate** (usually 60fps), providing smoother animations.
- It **automatically pauses** when the user switches tabs, improving performance and battery life.
- It avoids **frame drops and jitter** common with `setInterval`.

### 🔹 Efficient Canvas Drawing
Instead of redrawing on every frame inside `requestAnimationFrame`, I only redraw the canvas when the state updates (`ball`, `paddles`) via `useEffect`. Since state changes are triggered within the game loop, this approach keeps rendering fast while making React state observable and debug-friendly.

### 🔹 Delta Time

I calculate the `delta` (time between frames) to ensure consistent movement across different devices and performance levels. Without `delta`, faster devices would make the ball move faster.

Example:

```ts
x += vx * delta
````

This keeps physics simulation frame-rate independent, a common technique in both 2D and 3D games.

If you're curious about this subject, like I was, you can take a brief look on this article: https://dev.to/dsaghliani/understanding-delta-time-in-games-3olf

### 🔹 Frame Independence
This technique ensures consistent behavior whether the game is running at 30fps or 144fps. Without delta, faster devices would cause the ball and paddles to move faster than intended.

### 🔹 Rendering
Rendering is handled with the native HTML <canvas> using the 2D context. This gives me full pixel-level control while keeping performance high for a simple 2D game like Pong.


### 🔹 Why `<canvas>` Instead of DOM Elements?
Canvas gives me full control over rendering, avoids layout reflows, and better mimics real game environments. It's also more performant and scalable for game features like particles, effects, or possible Three.js animations later.

### 🔹 Reusability
The loop is abstracted into a useGameLoop hook to keep logic modular and testable, and make it easier to apply in other parts of the game (e.g., for paddles or AI movement).

---

## ➡️ Step 4: Paddles and Player Controls

### 🎯 Goal

Render two paddles on the canvas and allow two players to control them simultaneously:

- Player 1 (left paddle): `W` and `S`
- Player 2 (right paddle): `ArrowUp` and `ArrowDown`

### 🔹 Keyboard Handling

I implemented global `keydown` and `keyup` listeners to track which keys are being held down. Instead of reacting to individual events, I maintain an object (`keysPressed.current`) that keeps track of all active keys in real-time.

This approach supports:
- Simultaneous key presses (both players can move at once)
- Smooth and continuous movement while keys are held

Example logic:
```ts
if (keysPressed.current["w"]) leftY -= speed * delta
if (keysPressed.current["ArrowDown"]) rightY += speed * delta
```

While global `keydown`/`keyup` handlers may seem broad, they're extremely lightweight and standard for games. Filtering key states in a ref (`keysPressed.current`) is far more efficient than using `useState` or rerendering on every keystroke.

### 🔹 Integration with Game Loop

The paddle update logic runs inside the same requestAnimationFrame-powered useGameLoop:
- It checks key states each frame
- It applies movement scaled by delta
- It clamps the paddles within the canvas height

This allows paddle motion to remain smooth, frame-rate independent, and integrated with other game mechanics like ball movement.

### 🔹 Why This Approach?
This model mirrors how games typically handle input:
- Track key state, not events
- Separate input polling from animation rendering
- Keep real-time responsiveness

It avoids jerky movement or missed inputs and simplifies new features later (e.g. AI or touch control).

### 🔹 Diagram: Game Loop and Input Integration
<img src="./docs/images/step4_diagram.png" alt="Game loop and paddle input diagram" width="350" />

---

## ➡️ Step 5: Paddle Collision and Dynamic Bounce

### 🎯 Goal

Detect when the ball hits either paddle and bounce it back. Additionally, add variation to the bounce angle based on where the ball strikes the paddle — creating a more dynamic and skill-based experience (making more 
difficult to preview where the ball goes).

### 🔹 Collision Detection Logic

To check if the ball intersects a paddle, I implemented a basic *AABB (Axis-Aligned Bounding Box)* collision check:
```ts
const paddleCollision = (
  ballX, ballY,
  paddleX, paddleY,
  paddleW, paddleH
) => {
  return (
    ballX >= paddleX &&
    ballX <= paddleX + paddleW &&
    ballY >= paddleY &&
    ballY <= paddleY + paddleH
  )
}
```
This is called once per frame for each paddle during the game loop.

#### ↪️  Basic Bounce Behavior

When a collision is detected, the ball's horizontal velocity is inverted:
```ts
vx *= -1
```
To prevent the ball from sticking inside the paddle, I also slightly reposition the ball to just outside the collision boundary.

#### ↪️  Angle Variation with Hit Point

To make the gameplay feel more natural and responsive, I added vertical deflection based on _where_ the ball hits the paddle:
```ts
const hitPoint = (ballY - (paddleY + paddleH / 2)) / (paddleH / 2)
vy += hitPoint * 0.3
```
- If the ball hits the center of the paddle → hitPoint = 0 → straight bounce
- If the ball hits near the top → hitPoint = -1 → upward deflection
- If the ball hits near the bottom → hitPoint = +1 → downward deflection

This behavior gives the player a sense of agency over the ball's direction, turning paddle position into a strategy tool — just like real-life table tennis or air hockey. It’s a simple tweak that adds emergent depth.

### 🔹 Outcome
- Ball now bounces off paddles with dynamic angles
- Makes gameplay feel less robotic and more skill-driven
- Adds replayability and realism while maintaining clean logic

---

## ➡️ Step 6: ??
??

---

## 🧾 Glossary

- **AABB (Axis-Aligned Bounding Box):** A common and efficient collision detection method that compares object edges on the x and y axes.
- **Delta Time:** The time elapsed between frames, used to keep movement consistent across devices.
- **requestAnimationFrame:** A browser API to schedule animations synced to the screen refresh rate, typically 60fps.
