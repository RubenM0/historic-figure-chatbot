//Initialise what is needed
const express = require("express");
const app = express();
const port = 3000;
const responses = require("./responses.json");

app.use(express.json())

function wordsIn(message) {
    return message.toLowerCase().split(/\W+/).filter(Boolean)
}

// Add the weights of keywords that appear as whole words
function scoreReply(words, reply) {
    let score = 0
    for (const word of words) {
        const weight = reply.keywords[word]
        if (weight) {
            score += weight
        }
    }
    return score
}

function replyToChat(message) {
    const words = wordsIn(message)
    let best = null
    let bestScore = 0

    for (const reply of responses.replies) {
        const score = scoreReply(words, reply)
        if (score > bestScore) {
            best = reply
            bestScore = score
        }
    }

    if (!best) {
        return responses.fallback
    }
    return best.text
}

//Request and Response
app.post("/api/chat", (req, res) => {
    const message = req.body.message
    //If no message, http error 400 Bad Request
    if (!message){
        res.status(400).json({ error: "Message required"})
        return
    }
    res.json({ reply: replyToChat(message)})
})

app.listen(port, () => {
    console.log(`Backend is working on port ${port}`);
});
