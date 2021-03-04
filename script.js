$(function() {
    const phrase = document.getElementById("phrase")
    const input = document.getElementById("input")
    let score = 0
    let secondsRemaining = 20
    $("#score").text(score)
    $("#time-limit").text(secondsRemaining)
    $("#time-left").text(secondsRemaining)
    
    input.addEventListener("input", () => {
        const phraseCharArray = phrase.querySelectorAll("span")
        const inputCharArray = input.value.split("")
        let typedCorrect = true
        phraseCharArray.forEach((characterSpan, index) => {
            const character = inputCharArray[index]
            if (character == null) {
                $(characterSpan).removeClass("text-danger")
                $(characterSpan).removeClass("text-success")
                typedCorrect = false
            } else if (character === $(characterSpan).text()) {
                $(characterSpan).addClass("text-success")
                $(characterSpan).removeClass("text-danger")
            } else {
                $(characterSpan).addClass("text-danger")
                $(characterSpan).removeClass("text-success")
                typedCorrect = false
            }
        })
        if (typedCorrect) {
            if (secondsRemaining > 0) {
                score++
                $("#score").text(score)
                secondsRemaining = 21
                getNextQuote()
            }
        }
    })

    $("#new-game").click(function() {
        getNextQuote()
        $("#game-over").text(null)
        secondsRemaining = 21
        score = 0
        $("#score").text(score)
    })

    function getRandomQuote() {
        return fetch("http://api.quotable.io/random")
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
    
    function countdown() {
        if (secondsRemaining > 0) {
            secondsRemaining--
        } else {
            document.getElementById("game-over").innerText = "Game Over!"
        }
        document.getElementById("time-left").innerText = secondsRemaining
    }
    
    getNextQuote()
    setInterval(countdown, 1000)
})