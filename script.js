let TIME_LIMIT = 15
let SECONDS_REMAINING = TIME_LIMIT
let SCORE = 0

function getQuote() {
    $.get("https://api.quotable.io/random", function(response) {
        const quote = response.content
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
    }, "json")
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
getQuote()
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
        getQuote()
    }
})

$("#new-game").click(function() {
    SCORE = 0
    getQuote()
})