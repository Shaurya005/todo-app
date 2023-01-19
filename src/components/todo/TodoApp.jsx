import React, {Component} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import withNavigation from '../todo/WithNavigation'
import withParams from './WithParams';
import WelcomeComponent from './WelcomeComponent';
import ListTodosComponent from './ListTodoComponent';
import AuthenticatedRoute from './AuthenticatedRoute';
import HeaderComponent, { FooterComponent } from './HeaderFooterComponent';
import LoginComponent, { LogoutComponent } from './LoginLogoutComponent';

class TodoApp extends Component {
    render() {
        const LoginComponentWithNavigation = withNavigation(LoginComponent);
        const WelcomeComponentWithParams = withParams(WelcomeComponent);
        const HeaderComponentWithNavigation = withNavigation(HeaderComponent);

        return (
            <div className='TodoApp'>
                <Router>
                    {/* <HeaderComponent/> As with only HeaderComponent we need to refersh the page to see the changes in Header once user is logged in or logged out, it would not happen automatically once user log in or log out.*/}
                    <HeaderComponentWithNavigation/> 
                    <Routes>

                    {/* In the previous step, we disabled the menu links based on whether a user has logged in or not, but we can type in the URL and get to that right.
                    So even though a user has not really logged in. He's able to get to the URL. To prevent it, we need to authenticate before we need to route.
                    So until we were using the Route, right over here. What we would want to be able to do is we would want to be able to say AuthenticatedRoute. 
                    So we create the AuthenticatedRoute component. If somebody tries to access the welcome page or the todo page, we want to make sure that 
                    he is logged in, and only then let the user to go to the Route */}

                        <Route path="/" element={<LoginComponent />} />
                        <Route path="/login" element={<LoginComponentWithNavigation />} />
                        <Route path="/welcome/:name" element={
                            <AuthenticatedRoute><WelcomeComponentWithParams/></AuthenticatedRoute>}/>
                        <Route path="/todos" element={ 
                            <AuthenticatedRoute><ListTodosComponent/></AuthenticatedRoute>}/>
                        <Route path="/logout" element={
                            <AuthenticatedRoute><LogoutComponent/></AuthenticatedRoute>} />
                            {/* Do take care of not to have any space after <AuthenticatedRoute> or before </AuthenticatedRoute> in above tags */}
                        <Route path="*" element={<ErrorComponent />} />
                        {/* We want to show the ErrorComponent when none of these components match that. You need to pass * to the path in Route. */}
                    </Routes>
                    <FooterComponent/>
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
The first thing that I would need to do to be able to use the router is, actually add it to our project. React is just the view library, it does not come 
with all the features to build a real web application and that's where React Router comes in and gives us the features to route from one page to another.

npm add react-router-dom should download the reactor-router-dom and all its transitive dependencies including React Router.
So, you see that all of them would be downloaded into the node modules and at the end of it, you would also see that it is added into the package.json as a dependency.

Before we can actually use it, we would need to import a few classes from react-router-dom. Things that we would want to import are BrowserRouter and Route from react-router-dom. 
I'll rename BrowserRouter as Router because that's typically how it is used. We can use the router is using <Router> inside the place where we would want to render it.
*/

/*
So somebody comes in and type some random url and he does not know what's happening in here. To prevent that,
we need to add in a component called ErrorComponent.
*/
function ErrorComponent() {
    return <div>An Error Occurred. Don't know what to do! Contact support.</div>
}

export default TodoApp