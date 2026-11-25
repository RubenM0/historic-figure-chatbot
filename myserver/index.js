// initialise what is needed
const express = require("express");
const app = express();
const port = 3000;
const responses = require("./responses.json");

const Fuse = require("fuse.js");
// 0 - 1 range from "exact word" to "almost anything is acceptable"
const FUZZY_THRESHOLD = 0.5
const minWordAcceptance = 4

app.use(express.json())

function wordsIn(message) {
    return message.toLowerCase().split(/\W+/).filter(Boolean)
}

function keywordWeight(keywords, word) {
    if (!keywords || !Object.hasOwn(keywords, word)) return 0
    const weight = keywords[word]
    if (typeof weight === "number" && Number.isFinite(weight) && weight > 0) {
        return weight
    }
    return 0
}

// a close misspelling of a keyword that is at least 4 characters
function fuzzyWeight(word, keywords) {
    let best = null
    let bestScore = Infinity
    for (const keyword of Object.keys(keywords || {})) {
        const weight = keywordWeight(keywords, keyword)
        if (!weight || word.length < minWordAcceptance || keyword.length < minWordAcceptance) continue
        const result = Fuse.match(word, keyword, {
            ignoreLocation: true,
            threshold: FUZZY_THRESHOLD,
        })
        if (!result.isMatch) continue
        if (result.score < bestScore) {
            best = weight
            bestScore = result.score
        } else if (result.score === bestScore) {
            best = null
        }
    }
    return best || 0
}

function weightFor(word, keywords) {
    const exact = keywordWeight(keywords, word)
    if (exact) return exact
    return fuzzyWeight(word, keywords)
}

// add the weights of keywords that appear as whole words, including a close misspelling
function scoreReply(words, reply) {
    let score = 0
    for (const word of words) {
        score += weightFor(word, reply.keywords)
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

// request and Response
app.post("/api/chat", (req, res) => {
    const message = req.body && req.body.message
    //If no message, http error 400 Bad Request
    if (typeof message !== "string" || message.length === 0) {
        res.status(400).json({ error: "Message required"})
        return
    }
    res.json({ reply: replyToChat(message)})
})

app.listen(port, () => {
    console.log(`Backend is working on port ${port}`);
});
