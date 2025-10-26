🧩 Trailblazer Match — Advanced Memory Matching Game
🎮 Project Overview
** Trailblazer Match** is an advanced Memory Matching Game built using HTML, CSS, and JavaScript.
Inspired by the thrill of adventure tourism, the game challenges players to match pairs of icons to complete an “expedition.” Each match brings players closer to victory, blending interactive gameplay with a visually engaging adventure theme.

This project showcases intermediate to advanced front-end development skills, with a focus on responsive design, dynamic UI generation, and efficient state management.

🚀 Core Purpose
The primary goal of this project is to demonstrate the integration of core web technologies into a seamless, interactive user experience by focusing on:

Dynamic UI Generation: Creating and rendering game elements (cards and grid layout) based on user input.
State Management: Handling complex logic for card flipping, matching, scoring, and timing.
Responsive Design: Ensuring the game looks and performs well across all devices and screen sizes.
🧭 Key Features & Functionality
1. Multi-Screen Flow & Personalization
The game is structured into three main screens for an intuitive, guided experience:

Start Screen: Collects the player’s name and presents game instructions with difficulty selection.
Game Screen: Displays the dynamic card grid, live move counter, and timer.
Results Screen: Shows performance stats and a personalized cheer message upon completion.
2. Dynamic Difficulty
Players can choose from five difficulty levels, each generating a unique board layout:

Modes: 3x4, 4x4, 4x5, 5x6, and 6x6
The JavaScript dynamically calculates the required number of pairs and selects adventure icons from a master set.
The CSS Grid adapts automatically using grid-template-columns, ensuring a balanced layout for every mode.
3. Card Mechanics & Animation
Each card has a front and back layer for flipping effects.
Smooth 3D animations are implemented using CSS:
transform: rotateY(180deg);
backface-visibility: hidden;
