document.addEventListener('DOMContentLoaded', () => {
    const alphabetGrid = document.getElementById('alphabet-grid');
    const videoFrame = document.getElementById('libras-video');
    const videoPlaceholder = document.getElementById('video-placeholder');

    const librasVideos = {
        'A': '8FCmW4pT_jY', 'B': 'hzCwZHmyvLI', 'C': 'z_eN1lcd4vM',
        'D': 'bvFx1BPawRA', 'E': 'JO0F2YbEY-k', 'F': 'L5D0cUYw12c',
        'G': 'HqTOn4y0aNA', 'H': 'CD6hVWFXe10', 'I': 'UmPe7Flbw1k',
        'J': 'rzMsdjXHUrU', 'K': 'ygB8YVJ0vAs', 'L': 'GWSXhIRoCyM',
        'M': 'vyK9ZZ6z5zc', 'N': 'APtvghRZFvk', 'O': 'NQf1dzd8kao',
        'P': 'Udj-vnynVTA', 'Q': 'VQDMEqeG6s8', 'R': 'YZjXFjvHFy8',
        'S': 'jF5072Tu8ZE', 'T': 'oNfxMboxE_0', 'U': 'tcCmEE8Fk70',
        'V': '3WunOAOU224', 'W': 'mra6cH0b3No', 'X': 'MfLI0-7OdnU',
        'Y': 'd2pNDDYtSMc', 'Z': 'LyEP7kaVEoM'
    };

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

    // Create letter buttons
    alphabet.forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter;
        button.classList.add('letter-button');
        button.dataset.letter = letter; // Store letter in data attribute
        alphabetGrid.appendChild(button);

        // Add event listener to each button
        button.addEventListener('click', () => {
            const videoId = librasVideos[letter];
            if (videoId) {
                // Construct the embed URL with autoplay and mute
                // Added playsinline=1 for better mobile experience
                const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1`;
                videoFrame.src = embedUrl;
                videoPlaceholder.style.display = 'none'; // Hide placeholder
                videoFrame.style.display = 'block'; // Show iframe
            }
        });
    });

    // Initially hide the iframe and show placeholder
     videoFrame.style.display = 'none';
     videoPlaceholder.style.display = 'block';

});

