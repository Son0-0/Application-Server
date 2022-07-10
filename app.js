const express = require('express')
const cors = require('cors');
const db = require('./lib/db');
const app = express()

const PORTNUM = 3000;

// https://m.blog.naver.com/psj9102/221282415870
db.connect();
app.use(cors());
app.use(express.json());
app.use('/', require('./routes/'));

app.listen(PORTNUM, () => {
  console.log(`Server is running... port: ${PORTNUM}`)
})