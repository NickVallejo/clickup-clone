import {v4 as uuidv4} from 'uuid'

class Task {
    constructor(status, title, text, assignee) {
        if(!title) return new Error('Initialization Failed...')
        this.id = uuidv4()
        this.status = status
        this.title = title
        this.text = text
        this.assignee = assignee
        return {id: this.id, status: this.status, title: this.title, text: this.text, assignee: this.assignee}
    }
}

// just use this class to return a plain object

export default Task