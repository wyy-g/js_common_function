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
            this.responses[task.name] = {
                result: res,
                err: null
            }
        }).catch(err => {
            this.responses[task.name] = {
                result: null,
                err: err
            }
        }).finally(() => {
            this.maxConCurrencyCount++
            this._doRequest()
        })
    }
}

function getMinCount(count1, count2) {
    return Math.min(count1, count2)
}