import React, {Component} from 'react'
import TodoDataService from '../../api/todo/TodoDataService'

class ListTodosComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            todos: [
                // {id: 1, description: 'Learn to Dance', done: false, targetDate: new Date()},
                // {id: 2, description: 'Become an expert at React', done: false, targetDate: new Date()},
                // {id: 3, description: 'Visit India', done: false, targetDate: new Date()}
            ]
        }
    }
    
    /*
    React defines a pre-defined life cycle for each of these components. So when a component is being initialized, the first thing being called is the constructor.

    Whenever something in the component changes, we know the state in the component changes, and the view has to be updated for it
    Which method would we call? The render method would be the one which would be called and similar to that,

    There is one method which is called when the component is loaded for the first time, and shown on the browser.

    This process of actually putting the component on the browser is called mounting, and the method name is componentDidMount().
    If you hover over componentDidMount(), it says "Called immediately after the component is mounted.

    Typically the best practice suggested in React is, when you're calling an API, It's better not to do the initial API call directly in the constructor. 
    What happens if you do the initial API call in the constructor? 
    The state will not be initialized until the API call is completed, and that is not a good state to be in. So initially we can set it to some empty state, i.e., initially the todos list is empty.

    The initial render, which will happen with an empty list and once this component is rendered, what we want to do is actually make the call to the API, so that
    we can load up the todos. With this we can make sure that the component is rendered, and it's not really waiting for the data from the API, and once the data is appeared,
    Once the data is populated again, the component will be rendered.
    */

    componentDidMount() {
        TodoDataService.retrieveAllTodos()
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