import React, {Component} from 'react'
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import withNavigation from '../todo/WithNavigation'
import withParams from './WithParams';

class TodoApp extends Component {
    render() {
        const LoginComponentWithNavigation = withNavigation(LoginComponent);
        const WelcomeComponentWithParams = withParams(WelcomeComponent);

        return (
        <div className='TodoApp'>
            <Router>
                <Routes>
                    <Route path="/" element={<LoginComponent />} />
                    <Route path="/login" element={<LoginComponentWithNavigation />} />
                    <Route path="/welcome/:name" element={<WelcomeComponentWithParams />} />
                    <Route path="/todos" element={<ListTodosComponent/>} />
                    <Route path="*" element={<ErrorComponent />} />
                    {/* We want to show the ErrorComponent when none of these components match that. You need to pass * to the path in Route. */}
                </Routes>
            </Router>
        </div>
        )
        /*
        With earlier versions of React, "A Router may have only one child element." So, one of the things is, inside the router, you can only have one child element, just like in JSX.
        So we must had to inclue them within React fragments but with new version of React A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Wrap your <Route> in a <Routes>.
        */
    }
}

/*
The first thing that I would need to do to be able to use the router is, actually add it to our project. React is just the view library, it does not come with all the 
features to build a real web application and that's where React Router comes in and gives us the features to route from one page to another.

npm add react-router-dom should download the reactor-router-dom and all its transitive dependencies including React Router.
So, you see that all of them would be downloaded into the node modules and at the end of it, you would also see that it is added into the package.json as a dependency.

Before we can actually use it, we would need to import a few classes from react-router-dom. Things that we would want to import are BrowserRouter and Route from react-router-dom. 
I'll rename BrowserRouter as Router because that's typically how it is used. We can use the router is using <Router> inside the place where we would want to render it.
*/

/*
In the previous step we hard coded in28minutes in the WelcomeComponent, and that's not really good.
How can we pass the fact that in28minutes has logged in from from the LoginComponent to the Welcome Component.
*/
class WelcomeComponent extends Component {
    /* 
    So we need to go to the WelcomeComponent and add the link in there to go to todos component.
    Let's try defining an a href, and say I want to route to todo. So a is typically the usual HTML way of doing it. I would go to the welcome/in28minutes and over here,
    If I click this link on here, you'd see that the entire page gets refreshed. So you can see that the complete page gets refreshed.
    However you'd see that when I go from login to welcome page and the entire page is not refreshed.
    Only the specific part of the page is refreshed. You can actually clearly see this once we add the menu and the footer later. For now.

    The most important thing to note is the fact that when you actually add a normal a href, the entire page gets refreshed. 
    And when you're doing single page applications, you don't want the entire page to get refreshed, and that's where Link comes in. 
    So you can add a link where only that specific component will be replaced, with whatever is pointed to by the specific component. 
    The attribute name is not href, it "to" here i.e. <Link to>
    */
    render() {
        // How can we add a link around here. So we need to use something called Link, which also is defined in the react-router-dom.
        return <div> Welcome {this.props.params.name}. You can manage your todos <Link to='/todos'>here</Link> </div>
    }
}

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

/*
So somebody comes in and type some random url and he does not know what's happening in here. To prevent that,
we need to add in a component called ErrorComponent.
*/

function ErrorComponent() {
    return <div>An Error Occurred. Don't know what to do! Contact support.</div>
}

class LoginComponent extends Component {

    // The best practice is also to accept props and pass props to the superclass.
    constructor(props) {
        super(props)

        this.state = {
            username: 'in28minutes',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    loginClicked() {
        if(this.state.username==='in28minutes' && this.state.password==='dummy') {
            this.props.navigate(`/welcome/${this.state.username}`)
            // console.log("Successful")
            // this.setState({showSuccessMessage: true})
            // this.setState({hasLoginFailed: false})
        }
        else {
            console.log("Failed")
            this.setState({showSuccessMessage: false, hasLoginFailed: true})
        }
    }

    // So if you talk in terms of HTML, any action that you perform in the button - when you do a click on it, you're generate a click event, in React terms, actually this is something called a synthetic event.
    handleChange(event) { // This is a generic method which can handle all changes for any text element.
        console.log(this.state)

        this.setState(
            {[event.target.name]: event.target.value} // target.value gives the value which is being changed.
            /*
            What we are doing in here within the curly braces, it's creating an object. When we are creating an object

            The left hand side is the name of the object member variable, and that is typically expected to be a constant value. 
            You cannot put a variable in there. If I want to use a variable in there. What I would need to do is put it within its square bracket.
            */
        )
    }

    /*
    Here we had to create two change events for handling the changes, in the two elements which are present in here.
    What if the form has 10 elements, 15, or more elements. You cannot keep writing events like this right? So what can we do in that kind of scenarios?

    In handleUsernameChange(event), let's see what would happen if I console.log event.target.name. So you can see that it's printing user name which is the name of the field
    which is changing. So what I can do is actually instead of hard coding user name in here, we can use event.target.name.

    So what we can do now is instead of actually calling this handleUsernameChange, call this handleChange.
    So for any change of event what we want to do, is call this. The thing is, it can work both with user name and the password field.

    Because here we are not hard coding the name of the element in this state, which is changing. One of the important things now, is whatever have in the state  should match 
    with whatever we have in the form element names. So the name of this form element is user name, so instead also we should use user name. Same with password as well.
    So this is now generic to handleChange, and it will only work when I have the same names for form elements as well as inside this state.
    */

    /*
    What is a controlled field? A controlled component at the larger picture is something in which the entire change in the UI is dictated by the state.
    So whenever some change happen state is updated, and when the state is updated, the view is updated.
    Back to this specific thing is called a controlled component. The source of truth is the state inside the React component.
    */
    render() {
        return (
            /*
            In step, I'll show you a tip about how you can simplify this kind of component creation for simple ifs.
            All that we have is a simple if, and we had to create a functional component to show this. So we can have work around for this using AND condition of Javascript as 
            html gets ultimately converted to javascript using Babel so second expression of html will be displayed only if first expression is true.

            If you wanted to show a specific div on a specific condition, then you can actually use this and operator &&.
            */
            <div>
               {/* <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed} /> */}
               {/* <ShowLoginSuccesMessage showSuccessMessage={this.state.showSuccessMessage} /> */}
               { this.state.hasLoginFailed && <div>Invalid Credentials</div>}
               { this.state.showSuccessMessage && <div>Login Succesful</div> }
               User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
               Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
               <button onClick={this.loginClicked}>Login</button>
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