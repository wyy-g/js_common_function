const express = require('express')

const app = express()

app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'get')
    next()
})

app.get('/test1', (req, res) => {
    res.send('test1')
})

app.get('/test2', (req, res) => {
    res.send('test2')
})

app.get('/test3', (req, res) => {
    res.send('test3')
})

app.get('/test4', (req, res) => {
    res.send('test4')
})

app.get('/test5', (req, res) => {
    res.send('test5')
})

app.get('/test6', (req, res) => {
    res.send('test6')
})

app.get('/test7', (req, res) => {
    res.send('test7')
})

app.get('/test8', (req, res) => {
    res.send('test8')
})

app.get('/test9', (req, res) => {
    res.send('test9')
})

app.get('/test10', (req, res) => {
    res.send('test10')
})

app.listen(8000, () => {
    console.log('ok')
})