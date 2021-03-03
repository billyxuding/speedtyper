// TODO: refactor to jQuery

// ids to manipulate:
// time-limit
// message
// time-left
// score
// high-score

const randomQuotesURL = "http://api.quotable.io/random"
const phrase = document.getElementById("phrase")
const input = document.getElementById("input")

input.addEventListener("input", () => {
    console.log("changed")
    const phraseCharArray = phrase.querySelectorAll("span")
    const inputCharArray = input.value.split("")

    let typedCorrect = true
    phraseCharArray.forEach((characterSpan, index) => {
        const character = inputCharArray[index]
        if (character == null) {
            characterSpan.classList.remove("incorrect")
            characterSpan.classList.remove("correct")
            typedCorrect = false
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.add("correct")
            characterSpan.classList.remove("incorrect")
        } else {
            characterSpan.classList.add("incorrect")
            characterSpan.classList.remove("correct")
            typedCorrect = false
        }
    })
    if (typedCorrect) {
        getNextQuote()
    }
})

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
    input.value = null
}

getNextQuote()