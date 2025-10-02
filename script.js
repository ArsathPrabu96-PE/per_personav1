
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const colorThief = new ColorThief();

    sections.forEach((section, index) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        
        // Use a unique URL for each section to get different images
        // The ?random=${index} part ensures a new image is fetched
        img.src = `https://picsum.photos/1600/900?random=${index}`;

        img.addEventListener('load', () => {
            const dominantColor = colorThief.getColor(img);
            const backgroundColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;

            const brightness = Math.round(((parseInt(dominantColor[0]) * 299) +
                                         (parseInt(dominantColor[1]) * 587) +
                                         (parseInt(dominantColor[2]) * 114)) / 1000);
            
            const textColor = (brightness > 125) ? 'black' : 'white';

            section.style.backgroundColor = backgroundColor;
            section.style.color = textColor;
            section.style.backgroundImage = `url(${img.src})`;
            
            // REMOVE these lines to let CSS handle the layout
            // section.style.display = 'flex';
            // section.style.alignItems = 'center';
            // section.style.justifyContent = 'center';
        });

        img.addEventListener('error', () => {
            console.error(`Failed to load the background image for section ${index}.`);
            section.style.backgroundColor = '#2c3e50';
            section.style.color = 'white';
        });
    });
});
