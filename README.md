# Personal Portfolio - Version 1.2 Release Notes
- This update focuses on enhancing the user experience with more dynamic, interactive, and visually appealing elements. Key improvements include the implementation of 3D effects, engaging animations, and consistency fixes across the site.

# User Manual: New Features & Enhancements
## 1. 3D Interactive Buttons

What it is: Navigation links, "View Project" buttons, and social media icons now feature a 3D style.

# How it works:
Default State: Buttons have a subtle shadow underneath, giving them a slightly raised, physical appearance (box-shadow: 0 4px 0 ...).
On Hover: When you hover over a button, it lifts upwards (transform: translateY(-2px)) and its shadow grows larger, enhancing the 3D effect.
On Click: When you click a button, it depresses (transform: translateY(2px)), and the shadow disappears, mimicking the action of a real-world button being pressed.
# 2. "Shake" Animation on Hover
What it is: Most interactive elements, including navigation buttons, skill items, project cards, and links, will now perform a subtle "shake" animation upon hover.
How it works: This is a CSS keyframe animation (@keyframes shake) that adds a playful and engaging feel, drawing the user's attention to the element they are interacting with.

# 3. Glowing Section Titles
What it is: The main section titles ("Skills", "Projects", "Contact") now have a vibrant, animated glow effect.
How it works: A text-shadow animation (@keyframes title-glow) creates a pulsating glow, making the section headers stand out and adding to the modern aesthetic.

# 4. Enhanced 3D Card & Item Hovers
Project Cards: On hover, project cards now lift up and tilt slightly in 3D space (transform: translateY(-10px) rotateY(-5deg)), creating a more immersive browsing experience.
Skill Items: On hover, skill items now lift, scale up, and tilt on their X-axis (transform: translateY(-8px) scale(1.05) rotateX(10deg)), giving them a dynamic, "popping" effect.

# Bug Fixes & Consistency Improvements

# 1. Corrected "About Me" Title Style

Issue: The "About Me" section title was incorrectly inheriting the glowing effect meant for other section titles, which made it look out of place.
Fix: The glow animation and bright text-shadow have been removed specifically for the "About Me" h2 element. It now has a simple, clean text shadow to ensure readability without the distracting glow.

# 2. Standardized "View Project" Button Hover
Issue: The "View Project" buttons were not correctly displaying the 3D "lift" effect on hover, making them inconsistent with other 3D buttons on the site.
Fix: The hover state for these buttons (.project-card a:hover) has been updated to include the correct box-shadow change, ensuring they lift and animate just like the navigation buttons.

## This version (v1.2) successfully unifies the interactive elements and adds a layer of polish and engagement to your portfolio.
