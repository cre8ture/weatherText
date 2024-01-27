
document.addEventListener('DOMContentLoaded', (event) => {

    const mouseCircle = document.getElementById('mouse-circle');

    let lastTime = 0;
    const throttleInterval = 100; // in milliseconds
    let spans = []

    
    document.addEventListener('mousemove', function(e) {
        const currentTime = new Date().getTime();
        if (currentTime - lastTime < throttleInterval) return;
        lastTime = currentTime;
    
        let circleCenterX = e.clientX - mouseCircle.offsetWidth / 2;
        let circleCenterY = e.clientY - mouseCircle.offsetHeight / 2;
        mouseCircle.style.left = circleCenterX + 'px';
        mouseCircle.style.top = circleCenterY + 'px';
        let circleRadius = mouseCircle.offsetWidth / 2;
    
        spans.forEach(span => {
            const spanRect = span.getBoundingClientRect();
            const spanX = spanRect.left + spanRect.width / 2;
            const spanY = spanRect.top + spanRect.height / 2;
            const dx = circleCenterX - spanX;
            const dy = circleCenterY - spanY;
            const distance = Math.sqrt(dx * dx + dy * dy);
    
            if (distance < circleRadius + 100) { // Adjust the radius as needed
                const angle = Math.atan2(dy, dx);
                const moveX = Math.cos(angle) * (circleRadius - distance / 2);
                const moveY = Math.sin(angle) * (circleRadius - distance / 2);
                span.style.transform = `translate(${moveX}px, ${moveY}px)`;
                console.log('Moving span:', span, 'MoveX:', moveX, 'MoveY:', moveY);
            } else {
                span.style.transform = '';
            }
        });
    });
    
    
    

    function getRandomTextChunk(text, maxWords = 80) {
        const words = text.split(' '); // Split the entire text into words
        const start = Math.floor(Math.random() * (words.length - maxWords));
        return words.slice(start, start + maxWords).join(' '); // Select a chunk of words
    }
    
    function createSpans(text, parent, data) {
        const arr = text.split(' ');
        arr.forEach((word, i) => {
            const span = document.createElement("span");
            span.textContent = word + ' ';
            span.style.display = "inline-block";
            span.style.marginRight = "5px";
            span.style.transform = `translate(${0}px, ${data[i]}px)`;
            span.style.transition = 'transform 0.2s';
           
            parent.appendChild(span);
            spans.push(span);
        });
    }
    
    
    function createStrand(key, data) {
        const strand = document.createElement('div');
        strand.className = "strand";
    
        const innerDiv = document.createElement('div'); // Create an inner div
        innerDiv.className = "inner";
        strand.appendChild(innerDiv);
    
    
    
        strand.style.transform = `translate(0px, 0px)`; // Initial position
        strand.dataset.weatherData = JSON.stringify(data);
        strand.dataset.weatherKey = key;

            // Assign random chunk of text from corpus
            const text = getRandomTextChunk(corpus.join(' '));
            createSpans(text, innerDiv, strand.dataset.weatherData); // Pass innerDiv instead of strand
    
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
                const spans = strand.querySelectorAll('div span');
                // Logic to determine movement based on weather data
              calculateMovement(data, key, spans);
                // console.log("pig", movement)
    
                // Animate strand
                // strand.style.transform = `translate(${movement.x}px, ${movement.y}px)`;
            });
    
            requestAnimationFrame(animate);
        }
        function calculateMovement(data, key, spans) {
            // Attempt to extract height part from key (e.g., '150h' from 'wind_u-150h')
            let heightMatch = key.match(/\d+h/);

            console.log("heigtMAtch, data", heightMatch, data)
        
            // Check if the height part was successfully extracted
            if (heightMatch && heightMatch.length > 0) {
                let height = heightMatch[0];
        
                // Construct keys for wind_u and wind_v components
                let wind_u_key = `wind_u-${height}`;
                let wind_v_key = `wind_v-${height}`;
                console.log("data.length, spans.length", data.length, spans.length)
                // Check if the data contains the required keys
                // if (data.hasOwnProperty(wind_u_key) && data.hasOwnProperty(wind_v_key)) {
                data.forEach((item, i) => {
                    // Get horizontal and vertical wind components
                    // let wind_u = data[wind_u_key];
                    // let wind_v = data[wind_v_key];

                    // console.log("wind_u, wind_v", wind_u, wind_v)
        
                    // Map wind speed to movement range (adjust the scale as needed)
                    // let movementScale = 10;
                    // let xMove = wind_u * movementScale;
                    // let yMove = wind_v * movementScale;

                    if (i < spans.length){
                        // spans[i].style.transform = `translate(${0}px, ${item}px)`;
                    }
                    // return { x: xMove, y: yMove };
                })
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
