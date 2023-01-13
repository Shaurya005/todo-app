import React, {Component} from 'react'

class TodoApp extends Component {
    render() {
        return (
        <div className='TodoApp'>
            <LoginComponent/>
        </div>
        )
    }
}

class LoginComponent extends Component {

    // The best practice is also to accept props and pass props to the superclass.
    constructor(props) {
        super(props)

        this.state = {
            username: 'in28minutes',
            password: 'password'
        }

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    // So if you talk in terms of HTML, any action that you perform in the button - when you do a click on it, you're generate a click event, in React terms, actually this is something called a synthetic event.
    handleUsernameChange(event) {
        console.log(event)

        this.setState(
            {username: event.target.value} // target.value gives the value which is being changed.
        )
    }

    handlePasswordChange(event) {
        console.log(event)

        this.setState(
            {password: event.target.value} // target.value gives the value which is being changed.
        )
    }

    /*
    What is a controlled field? A controlled component at the larger picture is something in which the entire change in the UI is dictated by the state.
    So whenever some change happen state is updated, and when the state is updated, The view is updated.
    Back to this specific thing is called a controlled component. The source of truth is the state inside the React component.
    */
    render() {
        return (
            <div>
               User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleUsernameChange}/>
               Password: <input type="password" name="password" value={this.state.password} onChange={this.handlePasswordChange}/>
               <button>Login</button>
            </div>
        )
        /*
        I am changing the value of this password HTML element. Where is this value being stored?
        This value is being stored as part of DOM of the form HTML. All the form elements typically maintain their own state, so this password element 
        or any other element we add to a form, maintains its own state, and it is updated directly based on user input.
        As I changed something in here, the state of this specific thing gets updated. However when it comes to React, we would want to hold the state inside the specific component.

        So for example, you would want to hold the values of user name and password as state inside the Login Component. So there are two possibilities which are present in here.

        Either the form is the source of truth for the password value, or use the state of the component as the source of truth.
        What React intends to do, is to combine these two and have a single source of truth. So what Reeact intends to do, is to have a state inside the LoginComponent for these two things.
        So I have a form, so I'll have the corresponding state in the LoginComponent and will update states of LoginComponent based on user input from UI elements.

        So this complete component that we have, LoginComponent - is now a controlled component, because everything is now dictated by the state which is inside the LoginComponent. 
        Whenever you make a change in here, state is updated. When the state is updated, the changes are reflected back in the element. 
        */
    }
}

export default TodoApp