require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const app = express();
const {getSession, register, login, updateUsername, logout} = require('./controllers/authController')
const {getAll, getOne, create} = require('./controllers/postsController')

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

app.use(express.json())

massive(CONNECTION_STRING)
    .then(db => {
        app.set('db', db)
        console.log(`Database Connected (^_^)`)
    })
    .catch(error => console.log(`oops, you have an error: ${error}`))

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7  // 1 week
    }
}))


//Auth endpoints
app.get('/api/auth/me', getSession);
app.post('/api/auth/register', register);
app.post('/api/auth/login', login);
app.put('/api/auth/updateusername/:username', updateUsername)
app.post('/api/auth/logout', logout);
//Post endpoints
app.get('/api/posts/getAll/:displayOwnBool', getAll);
app.get('/api/posts/getOne/:postId', getOne);
app.post('/api/posts/create', create);

app.listen(SERVER_PORT, () => {
    console.log(`${SERVER_PORT} is listening`)
})