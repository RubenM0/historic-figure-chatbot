//Initialise what is needed
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json())

//Recieve and reply to user message
function replyToChat(message) {
    return "I'm Julius I think"
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
