// ids to manipulate:
// time-limit
// phrase
// message
// time-left
// score
// high-score

const randomQuotesURL = "http://api.quotable.io/random"

function getRandomQuote() {
    return fetch(randomQuotesURL)
        .then(response => response.json())
        .then(data => data.content)
}

async function getNextQuote() {
    const quote = await getRandomQuote()
    document.getElementById("phrase").innerText = quote
}

getNextQuote()