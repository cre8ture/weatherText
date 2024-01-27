corpus = textDat// {};
weatherData = weatherOld //{};

window.onload = function() {
    // corpus = {};
    // weatherData = {};

    async function weatherDataPromise(){
    // Define the URL for the Windy API request
    const url = 'https://api.windy.com/api/point-forecast/v2';

    // Define the headers for the request
    const headers = {
        'Content-Type': 'application/json'
    };

    // Define the body of the request, including the API key
    const body = JSON.stringify({
        "lat": 40.6782,  // Latitude for Brooklyn
        "lon": -73.9442,  // Longitude for Brooklyn
        "model": "gfs",  // Weather model to use
        "parameters": ["wind", "dewpoint", "rh", "pressure"],
        "levels": ["surface", "1000h", "950h", "925h", "900h", "850h", "800h", "700h", "600h", "500h", "400h", "300h", "200h", "150h"], // All available levels
        "key": "JyvswEzqTy6NjN0Y3Swn0rGVnPzMI87A"  // Your actual API key
    });

    // Make the POST request to the Windy API
    await fetch(url, {method: 'POST', headers: headers, body: body})
        .then(response => response.json())
        .then(data => {
            weatherData = data;  // Assign the data to weatherData
            console.log(weatherData);
        })
        .catch(console.error);

        return weatherData;

    }

        function fetchWikipediaPage(term) {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                const callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
                window[callbackName] = function(data) {
                    delete window[callbackName];
                    document.body.removeChild(script);
                    const pages = data.query.pages;
                    const page = Object.values(pages)[0];
                    resolve(page.extract);
                };
        
                script.src = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${term}&callback=${callbackName}`;
                document.body.appendChild(script);
            });
        }


        async function buildCorpus(terms) {
        
            for (const term of terms) {
                console.log(`Fetching content for: ${term}`);
                try {
                    const text = await fetchWikipediaPage(term);
                    corpus[term] = text;
                    corpus = Object.values(corpus)
                    .map(text => text.split(' '))
                    .flat();
                } catch (error) {
                    console.error(`Error fetching page for ${term}:`, error);
                }
            }
        
            return corpus;
        }
        
        // Example usage
        const terms = ["Climate", "Wind", "Storm", "Hurricane", "Rainbow", "Tornado"];
        buildCorpus(terms).then(corpus => {
            console.log(corpus);
        });
        weatherDataPromise().then(weatherData => {
            console.log(weatherData);
        })
        
};
