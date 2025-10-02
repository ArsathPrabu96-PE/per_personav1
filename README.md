My apologies. It looks like I've overlooked another detail. You're right, the "View Project" buttons on your project cards aren't behaving like the other 3D buttons on the page when you hover over them.

The issue is that the hover style for the project card links (`.project-card a:hover`) is missing the `box-shadow` update. It lifts the button with `transform`, but it doesn't adjust the shadow to create the proper 3D "lifted" illusion.

I'll add the `box-shadow` property to the hover state and also ensure the `transition` on the base style is updated to animate all the properties smoothly.

Here are the changes for your `styles.css` file:

```css
/* File: c:\Users\Arshath Prabhu\OneDrive\Desktop\Personal portfolio\styles.css */
/* ... existing code */
.project-card p {
    flex-grow: 1; /* Pushes the link to the bottom */
    margin-bottom: 20px;
    font-size: 1rem;
}

.project-card a {
    text-decoration: none;
    color: var(--secondary-color);
    font-weight: bold;
    transition: color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
    align-self: flex-start; /* Aligns the link to the left */
    display: inline-flex;
    align-items: center;
    padding: 8px 12px;
    border-radius: 8px;
    background-color: rgba(52, 152, 219, 0.1);
    /* 3D Button Style */
    box-shadow: 0 4px 0 var(--button-shadow-color);
}

.project-card a:hover {
    color: var(--link-hover-color);
    background-color: rgba(52, 152, 219, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 6px 0 var(--button-shadow-color); /* Make shadow 'taller' on hover */
    animation: shake 0.6s cubic-bezier(.36,.07,.19,.97) both;
}

.project-card a:active {
    /* "Pressed" effect */
    transform: translateY(2px);
    box-shadow: 0 2px 0 var(--button-shadow-color);
}

.project-card a i {
/* ... existing code */
```

### Summary of Changes:

1.  **`.project-card a`**: I updated the `transition` property to include `transform` and `box-shadow` so the button's movement and shadow change will be animated smoothly.
2.  **`.project-card a:hover`**: I added `box-shadow: 0 6px 0 var(--button-shadow-color);`. This increases the shadow's size when the button is hovered, creating a more convincing "lifted" effect that matches the behavior of your other 3D buttons.

These adjustments will make the project buttons feel consistent with the rest of the interactive elements on your page.