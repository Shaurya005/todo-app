import axios from "axios"
import {JPA_API_URL, API_URL } from '../../Constants';

class TodoDataService {

    retrieveAllTodos(name) {
        console.log(name)
        return axios.get(`${JPA_API_URL}/users/${name}/todos`)
    }

    retrieveTodo(name, id) {
        return axios.get(`${JPA_API_URL}/users/${name}/todos/${id}`)
    }

    deleteTodo(name, id) {
        return axios.delete(`${JPA_API_URL}/users/${name}/todos/${id}`)
    }

    /*
    Typically we would use the put method to do the update, and put method in addition to the URI, accepts an additional parameter.
    You can say what is the value that needs to be updated, or what should be part of the body of the request.
    */
    updateTodo(name, id, todo) {
        return axios.put(`${JPA_API_URL}/users/${name}/todos/${id}`, todo)
    }

    createTodo(name, todo) {
        return axios.post(`${JPA_API_URL}/users/${name}/todos`, todo)
    }
}

export default new TodoDataService()