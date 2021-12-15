require('dotenv').config()

const express = require('express')
const app = express()

const signinRoute = require('./routes/signinRoute')
const signupRoute = require('./routes/singupRoute')

app.use(express.json())

app.get('/', (req, res)=>{
    res.redirect('/signin')
})

app.use('/signin', signinRoute)

app.use('/signup', signupRoute)

// NEED TO IMPLEMENT THIS NEXT
//app.use(':user', userRoute)


const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`)
})
