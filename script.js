// ids to manipulate:
// time-limit
// phrase
// message
// time-left
// score
// high-score

var randomQuotesURL = "http://api.quotable.io/random";

function getRandomQuote() {
    return fetch(randomQuotesURL)
        .then(response => response.json())
        .then(data => data.content)
}

async function getNextQuote() {
    var quote = await getRandomQuote()
    console.log(quote)
}

getNextQuote()