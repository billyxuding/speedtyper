$(function() {
    let secondsRemaining = 20
    $(".time-limit").text(secondsRemaining)
    $("#time-left").text(secondsRemaining)
    let score = 0
    const phrase = document.getElementById("phrase")

    function getRandomQuote() {
        return fetch("http://api.quotable.io/random")
            .then(response => response.json())
            .then(data => data.content)
    }

    async function getNextQuote() {
        const quote = await getRandomQuote()
        $(phrase).html(null)
        quote.split("").forEach(character => {
            const characterSpan = document.createElement("span")
            $(characterSpan).text(character)
            $(phrase).append(characterSpan)
        })
        $("#input").val(null)
        $("#score").text(score)
    }

    function countdown() {
        if (secondsRemaining > 0) {
            secondsRemaining--
        } else {
            $("#message").text("Game Over!")
        }
        $("#time-left").text(secondsRemaining)
    }

    getNextQuote()
    setInterval(countdown, 1000)

    $("#input").on("input", function() {
        const phraseCharArray = phrase.querySelectorAll("span")
        const inputCharArray = $("#input").val().split("")
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
                secondsRemaining = 21
                score++
                getNextQuote()
            }
        }
    })

    $("#new-game").click(function() {
        secondsRemaining = 21
        score = 0
        getNextQuote()
        $("#input").focus()
        $("#message").text(null)
    })
})