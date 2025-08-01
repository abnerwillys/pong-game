# Notes – Make Labs Ping-Pong Game

This document contains incremental notes describing my thought process, design decisions, trade-offs, and what I would improve with more time.

---

## ➡️  Step 1–2: Setup

I chose **React + TypeScript + Vite** (besides to be the ask in the challenge instructions) for fast development, strong typing, and modern bundling. Tailwind CSS was added early to keep layout and styling consistent with the Make Labs stack. This setup offers strong developer experience and enables clean component structure.

---

## ➡️ Step 3: Game Loop and Ball Movement 

### 🎯 Goal

Create a smooth, frame-consistent ball animation inside a canvas.

### 🔁 Why I Used `requestAnimationFrame`

I implemented a custom game loop using `requestAnimationFrame` to handle the ball movement. This method was chosen over alternatives like `setInterval` or `setTimeout` because:

- It syncs with the browser's **refresh rate** (usually 60fps), providing smoother animations.
- It **automatically pauses** when the user switches tabs, improving performance and battery life.
- It avoids **frame drops and jitter** common with `setInterval`.

### ⏱ Delta Time

I calculate the `delta` (time between frames) to ensure consistent movement across different devices and performance levels. Without `delta`, faster devices would make the ball move faster.

Example:

```ts
x += vx * delta
````

This keeps physics simulation frame-rate independent, a common technique in both 2D and 3D games.

If you're curious about this subject, like I was, you can take a brief look on this article: https://dev.to/dsaghliani/understanding-delta-time-in-games-3olf

### 🎨 Rendering
Rendering is handled with the native HTML <canvas> using the 2D context. This gives me full pixel-level control while keeping performance high for a simple 2D game like Pong.

### ♻️ Reusability
The loop is abstracted into a useGameLoop hook to keep logic modular and testable, and make it easier to apply in other parts of the game (e.g., for paddles or AI movement).

---

## ➡️ Step 4: ??