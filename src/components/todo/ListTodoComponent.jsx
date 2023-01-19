import React, {Component} from 'react'
import TodoDataService from '../../api/todo/TodoDataService'
import AuthenticationService from './AuthenticationService'

class ListTodosComponent extends Component {
    constructor(props) {
        console.log('constructor')
        super(props)
        this.state = {
            todos: [
                // {id: 1, description: 'Learn to Dance', done: false, targetDate: new Date()},
                // {id: 2, description: 'Become an expert at React', done: false, targetDate: new Date()},
                // {id: 3, description: 'Visit India', done: false, targetDate: new Date()}
            ],
            message: null
        }

        this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
        this.refreshTodos = this.refreshTodos.bind(this);
        this.updateTodoClicked = this.updateTodoClicked.bind(this)
    }
    
    /*
    React defines a pre-defined life cycle for each of these components. So when a component is being initialized, the first thing being called is the constructor.
    Whenever something in the component changes, whenever the state in the component changes, and the view has to be updated for it
    Which method would we call? The render method would be the one which would be called and similar to that,

    There is one method which is called when the component is loaded for the first time, and shown on the browser.
    This process of actually putting the component on the browser is called mounting, and the method name is componentDidMount().
    If you hover over componentDidMount(), it says "Called immediately after a component is mounted.

    Typically the best practice suggested in React is, when you're calling an API, It's better not to do the initial API call directly in the constructor. 
    What happens if you do the initial API call in the constructor? 
    The state will not be initialized until the API call is completed, and that is not a good state to be in. So initially we can set it to some empty state, i.e., initially the todos list is empty.

    The initial render, which will happen with an empty list and once this component is rendered, what we want to do is actually make the call to the API so that
    we can load up the todos. With this we can make sure that the component is rendered, and it's not really waiting for the data from the API, and once the data is appeared,
    Once the data is populated again, the component will be re-rendered.
    */

    componentDidMount() {
        console.log('componentDidMount')
        this.refreshTodos()
    }
    /*
    We added a life cycle method called componentDidMount. This is part of the component life cycle in React.
    In this step let's look at a few other useful methods in the component life cycle, and also understand
    all this stuff which is happening with this component, as part of the life cycle in depth.  To start off, add a simple console.log at places.

    We can see in the log that first, at the time of initialization of the component.

I mean even before the component is shown on the screen, the first thing which is called is constructor, and to show the component on the screen, what is called? render.

What happens is the initial render is based on the initial state, which is basically empty list. It happened so fast that you cannot really observe it. 
If we add a Thread.sleep(3000) in backend getmapping method and now initially we can see the empty stuff, and after three seconds the render happens. 
What's happening here is at the time of the load of the component. First thing that would be called is the constructor obviously.

What happens next is immediately the render is called. The render uses the initial state whatever is present, and the component loads up on the screen.
Once the component loads up on the screen, that that's basically called mounting. the componentDidMount method gets called.

So constructor, render, and after that the componentDidMount method would be called, and the whole thing happens, we call the service and the state is updated. 
And once the state is updated, what would happen is React would then call the render method again, and then you can see the render method again in here.

So that's kind of the life cycle which is happening in here now. Are there any other life cycle methods in React.
There are other life cycle methods as well like componentWilUnmount and shouldComponentUpdate.
    */

    componentWillUnmount() {
        console.log('componentWill Unmount')
    }
    /*
    When I navigate back to home from todos page, we would see that componentWillUnmount is printed in here.
    So componentWillUnmount is called just before a component is unmounted, a component is removed from the view.

    So if there are things that you have allocated for the component - resources or things you can unallocate them in this specific method.
    The last interesting method is something called shouldComponentUpdate. And it accepts actually two parameters - nextProps, and nextState.
    */

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate')
        console.log(nextProps)
        console.log(nextState)

        return true;
    }
    /*
    The last interesting method is something called shouldComponentUpdate. And it accepts actually two parameters: they are called nextProps, and nextState.
    One of the most important reasons that React is so popular is because of its good performance. When we write React component we never directly update the state.
    What we do is we call this.setState to update the state. React does not immediately update this state as soon as setState method is called. the state update
    in React is in the control of the framework.

    So when the state is updated when the view is rendered, it's all in the control of the framework, and what
    we were doing when we did shouldComponentUpdate and return false? We were telling React even if the state is updated, do not do render.

    So if you return a false, you'd see that the render will not happen at all.
    So the render after the state is updated, it did not happen at all, you can tell render that is not called at all.

    Now if I had written a true and if I actually reload the page, you'd see that the last method which is called is render(), 
    shouldComponentUpdate is an opportunity that React provides you to improve the performance of your application.

    Should I really update the view? Should I really call the render() for every change of state?
    If you don't really want to update the view for a few state changes, then you can actually return false from here.

    What we have done is hardcoded return true and return false.
    Typically when you implement shouldComponentUpdate, sometimes you'll have conditional logic based on which return true or false based on the condition.
    */

    refreshTodos() {
        let user = AuthenticationService.getLoggedInUserName()
        TodoDataService.retrieveAllTodos(user)
            .then (
                response => {
                    console.log(response)
                    this.setState(
                        {todos: response.data}
                    )
                }
            )
    }

    deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedInUserName();
        console.log(id + " " + username)

        TodoDataService.deleteTodo(username, id)
            .then (
                response => {
                    this.setState({message : `Delete of todo ${id} successful`})
                    this.refreshTodos()
                }
            )
    }

    updateTodoClicked(id) {
        let username = AuthenticationService.getLoggedInUserName();
        console.log(id + " " + username)

        // TodoDataService.deleteTodo(username, id)
        //     .then (
        //         response => {
        //             this.setState({message : `Delete of todo ${id} successful`})
        //             this.refreshTodos()
        //         }
        //     )
    }

    render() {
        console.log('render')
        return (
            <div>
                <h1>List Todos</h1>
                {this.state.message && <div className='alert alert-success'>{this.state.message}</div>}
                <div className='container'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Target Date</th>
                                <th>Is Completed</th>
                                <th>Delete</th>
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
                                        <tr key={todo.id}>
                        {/* There is another warning which we are seeing. Each child in the list should have a unique key property.
                        So if you click the link, you'd see that it says every child in a specific list... so in this specific list of items : everything should have a unique key.
                        How do we do that? The way you can add a key is just by saying key is equal to todo.id...we can use the id of the todo as the key.
                        So this would give something unique for React to keep track of this here, and if something changes. It would use this specific key as the starting point. */}
                                            <td>{todo.description}</td>
                                            <td>{todo.targetDate.toString()}</td>
                                            <td>{todo.done.toString()}</td>
                                            <td><button className='btn btn-success' onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                            <td><button className='btn btn-warning' onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ListTodosComponent