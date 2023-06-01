//import ConcurrencyRequset from "./ConcurrencyRequset";
export default class ConcurrencyRequset {
    constructor({ maxConCurrencyCount }) {
        this.maxConCurrencyCount = maxConCurrencyCount
        this.taskQueue = []
        this.responses = {}
        setTimeout(() => {
            this._doRequest()
        })
    }

    push(task) {
        this.taskQueue.push(task)
    }

    _doRequest() {
        if (!this.taskQueue.length) return
        const minConcurrencyCount = getMinCount(
            this.taskQueue.length,
            this.maxConCurrencyCount
        )
        for (let i = 0; i < minConcurrencyCount; i++) {
            const task = this.taskQueue.shift()
            this.maxConCurrencyCount--
            this._runTask(task)
        }

    }

    _runTask(task) {
        task().then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            this.maxConCurrencyCount++
            this._doRequest()
        })
    }
}

function getMinCount(count1, count2) {
    return Math.min(count1, count2)
}
const BASE_URL = 'http://localhost:8000/'

function getTest1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            axios(BASE_URL + 'test1').then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        }, 2000)
    })
}

function getTest2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            axios(BASE_URL + 'test2').then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        }, 2000)
    })
}

function getTest3() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            axios(BASE_URL + 'test3').then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        }, 2000)
    })
}

function getTest4() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            axios(BASE_URL + 'test4').then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        }, 2000)
    })
}

function getTest5() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            axios(BASE_URL + 'test5').then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        }, 2000)
    })
}

function getTest6() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            axios(BASE_URL + 'test6').then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        }, 2000)
    })
}

function getTest7() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            axios(BASE_URL + 'test7').then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        }, 2000)
    })
}

function getTest8() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            axios(BASE_URL + 'test8').then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        }, 2000)
    })
}

function getTest9() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            axios(BASE_URL + 'test9').then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        }, 2000)
    })
}

// 任务队列
const taskQueue = [
    getTest1,
    getTest2,
    getTest3,
    getTest4,
    getTest5,
    getTest6,
    getTest7,
    getTest8,
    getTest9
]


const concurrencyRequset = new ConcurrencyRequset({
    maxConCurrencyCount: 2
})



for (let task of taskQueue) {
    concurrencyRequset.push(task)
}

console.log(concurrencyRequset.responses)
