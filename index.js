const express = require('express');
const cors = require("cors");
const { connection } = require('./db');
const { userRoute } = require('./routes/userRoute')
const { postRouter } = require('./routes/postRoute')

const app = express();
app.use(cors());
app.use(express.json());
app.use('/users', userRoute)
app.use('/posts', postRouter)



app.listen(8080, async () => {
    try {
        await connection
        console.log('The server is running at the port number 8080...')
    }
    catch (err) {
        console.log(err)
    }
})