
document.addEventListener('DOMContentLoaded', (event) => {

    // let isDataLoaded = false;
    // const maxIntervalCount = 5000; // Check for 3000 seconds
    // let intervalCount = 0;


//    const dataCheckInterval = setInterval(() => {
//         intervalCount++;
//         console.log("intervalCount", intervalCount)
//         if (Object.keys(corpus).length > 0 && Object.keys(weatherData).length > 0) {
//             // Both `corpus` and `weatherData` are populated, we can proceed
//             isDataLoaded = true;
//             // Create strands
            
//             for (const [key, data] of Object.entries(weatherData)) {  // Replace windData with weatherData
//                 createStrand(key, data);
//             }
//             startAnimation();
//             clearInterval(dataCheckInterval); // Stop checking
//         } else if (intervalCount >= maxIntervalCount) {
//             // Stop checking after 3000 seconds
//             clearInterval(dataCheckInterval);
//         }
//     }, 1000); // Check every second

    
        function getRandomTextChunk(text, maxLength = 100) {
            const start = Math.floor(Math.random() * (text.length - maxLength));
            return text.substring(start, start + maxLength);
        }
    
        function createStrand(key, data) {
            const strand = document.createElement('div');
            strand.className = "strand";
            console.log("key, data", key, data)
            // Assign random chunk of text from corpus
            strand.textContent = getRandomTextChunk(corpus.join(' ')); 
            strand.style.transform = `translate(0px, 0px)`; // Initial position
    
            // Store data for use in animation
            strand.dataset.weatherData = JSON.stringify(data);
            strand.dataset.weatherKey = key;
    
            document.getElementById('windStrands').appendChild(strand);
        }
    
        // // // Create strands
        // for (const [key, data] of Object.entries(weatherData)) {  // Replace windData with weatherData
        //     createStrand(key, data);
        // }

         // Filter keys that contain 'wind' and create strands for them
    Object.entries(weatherData)  // Replace windData with weatherData
    .filter(([key, data]) => key.includes('wind'))
    .forEach(([key, data]) => {
        createStrand(key, data);
    });
    
        function startAnimation() {
        function animate() {
            const strands = document.querySelectorAll('#windStrands .strand');
    
            strands.forEach(strand => {
                const data = JSON.parse(strand.dataset.weatherData);  // Replace windData with weatherData
                const key = strand.dataset.weatherKey;  // Replace windKey with weatherKey
    
                // Logic to determine movement based on weather data
                const movement = calculateMovement(data, key);
                console.log("pig")
    
                // Animate strand
                strand.style.transform = `translate(${movement.x}px, ${movement.y}px)`;
            });
    
            requestAnimationFrame(animate);
        }
        function calculateMovement(data, key) {
            // Attempt to extract height part from key (e.g., '150h' from 'wind_u-150h')
            let heightMatch = key.match(/\d+h/);
        
            // Check if the height part was successfully extracted
            if (heightMatch && heightMatch.length > 0) {
                let height = heightMatch[0];
        
                // Construct keys for wind_u and wind_v components
                let wind_u_key = `wind_u-${height}`;
                let wind_v_key = `wind_v-${height}`;
        
                // Check if the data contains the required keys
                if (data.hasOwnProperty(wind_u_key) && data.hasOwnProperty(wind_v_key)) {
                    // Get horizontal and vertical wind components
                    let wind_u = data[wind_u_key];
                    let wind_v = data[wind_v_key];
        
                    // Map wind speed to movement range (adjust the scale as needed)
                    let movementScale = 10;
                    let xMove = wind_u * movementScale;
                    let yMove = wind_v * movementScale;
        
                    return { x: xMove, y: yMove };
                }
            }
        
            // Return no movement if the pattern doesn't match or data keys are missing
            return { x: 0, y: 0 };
        }
        
        
        
    
        // Start the animation
        animate();
    }

    console.log("I AM CORPUS", corpus)
    startAnimation()
});
