import React, {Component} from 'react'
import TodoDataService from '../../api/todo/TodoDataService'

class ListTodosComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            todos: [
                {id: 1, description: 'Learn to Dance', done: false, targetDate: new Date()},
                {id: 2, description: 'Become an expert at React', done: false, targetDate: new Date()},
                {id: 3, description: 'Visit India', done: false, targetDate: new Date()}
            ]
        }
    }
    
    render() {
        return (
            <div>
                <h1>List Todos</h1>
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>description</th>
                            <th>Target Date</th>
                            <th>Is Completed</th>
                        </tr>
                    </thead>
                    {/* In React, whenever you would want to loop around the list and display them is something similar to this.
                    What we'll do is use something called a map function ,where you can actually map each of these todos to something else. So I can see todos.map
                    So for each todo map it to something else. So I can say take each todo, and map it to just the description of the todo.
                    This would print array with only the descriptions. I can take the todos and map it to only id's. todo.id. It prints only the id's. */}
                    <tbody>
                        {
                            this.state.todos.map (
                                todo =>
                                    <tr>
                                        <td>{todo.id}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.targetDate.toString()}</td>
                                        <td>{todo.done.toString()}</td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ListTodosComponent