// ids to manipulate:
// time-limit
// phrase
// message
// time-left
// score
// high-score

const randomQuotesURL = "http://api.quotable.io/random"
const phrase = document.getElementById("phrase")

function getRandomQuote() {
    return fetch(randomQuotesURL)
        .then(response => response.json())
        .then(data => data.content)
}

async function getNextQuote() {
    const quote = await getRandomQuote()
    phrase.innerHTML = ""
    quote.split("").forEach(character => {
        const characterSpan = document.createElement("span")
        characterSpan.innerText = character
        phrase.appendChild(characterSpan)
    })
}

getNextQuote()