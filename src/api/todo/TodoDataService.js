import axios from "axios"

class TodoDataService {

    retrieveAllTodos(name) {
        return axios.get(`http://localhost:8080/users/${name}/todos`)
    }

    retrieveTodo(name, id) {
        return axios.get(`http://localhost:8080/users/${name}/todos/${id}`)
    }

    deleteTodo(name, id) {
        return axios.delete(`http://localhost:8080/users/${name}/todos/${id}`)
    }

    /*
    Typically we would use the put method to do the update, and put method in addition to the URI, accepts an additional parameter.
    You can say what is the value that needs to be updated, or what should be part of the body of the request.
    */
    updateTodo(name, id, todo) {
        return axios.put(`http://localhost:8080/users/${name}/todos/${id}`, todo)
    }

    createTodo(name, todo) {
        return axios.post(`http://localhost:8080/users/${name}/todos`, todo)
    }
}

export default new TodoDataService()