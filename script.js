let TIME_LIMIT = 15 // seconds per phrase
let SECONDS_REMAINING = TIME_LIMIT
let SCORE = 0

// gets a quote from an API that produces random quotes
function getRandomQuote() {
    return fetch("http://api.quotable.io/random")
    .then(response => response.json())
    .then(data => data.content)
}

// grabs the quote and displays it
async function getNextQuote() {
    const quote = await getRandomQuote()
    const arrayOfQuoteCharacters = quote.split("")
    $("#phrase").html(null)
    $("#message").text(null)
    for (let i = 0; i < arrayOfQuoteCharacters.length; i++) {
        $("#phrase").append("<span>" + arrayOfQuoteCharacters[i] + "</span>")
    }
    $("#input").val(null)
    $("#input").focus()
    $("#score").text(SCORE)
    SECONDS_REMAINING = TIME_LIMIT + 1
}

function countdown() {
    if (SECONDS_REMAINING > 0) {
        SECONDS_REMAINING--
    } else {
        $("#message").text("Game Over!")
    }
    $("#time-left").text(SECONDS_REMAINING)
}

$(".time-limit").text(TIME_LIMIT)
getNextQuote()
setInterval(countdown, 1000)

$("#input").on("input", function() {
    let typedCorrect = true
    $("#phrase span").each(function(index) {
        const arrayOfInputCharacters = $("#input").val().split("")
        if (arrayOfInputCharacters[index] == null) {
            $(this).removeClass("text-danger")
            $(this).removeClass("text-success")
            typedCorrect = false
        } else if (arrayOfInputCharacters[index] === $(this).text()) {
            $(this).addClass("text-success")
            $(this).removeClass("text-danger")
        } else {
            $(this).addClass("text-danger")
            $(this).removeClass("text-success")
            typedCorrect = false
        }
    })
    if (typedCorrect && SECONDS_REMAINING > 0) {
        SCORE++
        getNextQuote()
    }
})

$("#new-game").click(function() {
    SCORE = 0
    getNextQuote()
})