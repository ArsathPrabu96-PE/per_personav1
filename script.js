
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

// Dynamic contact background rotator
document.addEventListener('DOMContentLoaded', () => {
    const contact = document.getElementById('contact');
    if (!contact) return;

    // Create two background layers for crossfading
    const bgA = document.createElement('div');
    const bgB = document.createElement('div');
    bgA.className = 'contact-bg';
    bgB.className = 'contact-bg';
    contact.appendChild(bgA);
    contact.appendChild(bgB);

    let current = 0;
    const layers = [bgA, bgB];
    const intervalMs = 8000; // change every 8s

    // Read optional site-provided sources first
    const bgSourceRaw = contact.dataset.bgSource || '';
    const bgSources = bgSourceRaw.split(',').map(s => s.trim()).filter(Boolean);

    // Build image URLs using Unsplash (preferred) or fallback to Picsum
    const unsplashQuery = contact.dataset.unsplashQuery || 'nature';
    const unsplashKey = contact.dataset.unsplashKey || null; // optional

    function getRandomImageUrl(width = 1600, height = 900) {
        const t = Date.now();
        // If site-provided sources exist, use them first (cycle through the list)
        if (bgSources.length) {
            const idx = Math.floor(Math.random() * bgSources.length);
            // If the user provided a relative path, keep as-is; otherwise append a cache-busting query
            const url = bgSources[idx];
            // If it's a local path (no protocol), make it relative; otherwise use as provided
            return { type: 'site', url: url.includes('://') ? url : url + `?v=${t}` };
        }

        // If an Unsplash Access Key is provided, we'll use the API to get a stable URL
        if (unsplashKey) {
            return { type: 'unsplash-api', url: `https://api.unsplash.com/photos/random?query=${encodeURIComponent(unsplashQuery)}&w=${width}&h=${height}` };
        }

        // Without API key, use the source.unsplash.com shortcut which doesn't require a key
        if (unsplashQuery) {
            return { type: 'source-unsplash', url: `https://source.unsplash.com/${width}x${height}/?${encodeURIComponent(unsplashQuery)}&sig=${t}` };
        }

        // Fallback to Picsum
        return { type: 'picsum', url: `https://picsum.photos/${width}/${height}?random=${t}` };
    }

    async function preloadImage(spec) {
        // spec may be an object with type and url
        if (typeof spec === 'string') spec = { type: 'picsum', url: spec };

        if (spec.type === 'unsplash-api') {
            // Fetch Unsplash API to get a redirect or raw url
            const resp = await fetch(spec.url, {
                headers: unsplashKey ? { Authorization: `Client-ID ${unsplashKey}` } : {}
            });
            if (!resp.ok) throw new Error('Unsplash API error');
            const data = await resp.json();
            // Prefer the full quality url; include w/h params if available
            const finalUrl = data.urls && (data.urls.full || data.urls.raw || data.urls.regular) ? (data.urls.raw || data.urls.full || data.urls.regular) : data.urls;
            // Append '?auto=format' to help with CORS and formats
            return finalUrl + '?auto=format&fit=crop&w=1600&h=900';
        }

        // For source-unsplash and picsum, just preload the image
        return await new Promise((resolve, reject) => {
            const img = new Image();
            // DO NOT set crossOrigin for remote site images (prevents CORS errors when servers don't expose CORS)
            img.onload = () => resolve(spec.url);
            img.onerror = () => reject(new Error('Image load failed: ' + spec.url));
            img.src = spec.url;
        });
    }

    async function showNext() {
        const nextLayer = layers[(current + 1) % 2];
        const spec = getRandomImageUrl(1600, 900);
        try {
            const finalUrl = await preloadImage(spec);
            nextLayer.style.backgroundImage = `url(${finalUrl})`;
            nextLayer.style.opacity = '1';

            // fade out the previous
            layers[current].style.opacity = '0';
            current = (current + 1) % 2;
        } catch (e) {
            console.warn('Contact background image failed to load, retrying...', e);
        }
    }

    // Initialize with two images staggered
    (async function init() {
        try {
            const spec1 = getRandomImageUrl();
            const final1 = await preloadImage(spec1);
            bgA.style.backgroundImage = `url(${final1})`;
            bgA.style.opacity = '1';

            setTimeout(async () => {
                await showNext();
                setInterval(showNext, intervalMs);
            }, 1200);
        } catch (e) {
            console.warn('Failed to initialize contact background rotator', e);
        }
    })();
});
