import React, {Component} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import withNavigation from '../todo/WithNavigation'
import withParams from './WithParams';
import WelcomeComponent from './WelcomeComponent';
import ListTodosComponent from './ListTodoComponent';
import AuthenticatedRoute from './AuthenticatedRoute';
import HeaderComponent, { FooterComponent } from './HeaderFooterComponent';
import LoginComponent, { LogoutComponent } from './LoginLogoutComponent';
import TodoComponent from './TodoComponent';

class TodoApp extends Component {
    render() {
        const LoginComponentWithNavigation = withNavigation(LoginComponent);
        const WelcomeComponentWithParams = withParams(WelcomeComponent);
        const HeaderComponentWithNavigation = withNavigation(HeaderComponent);
        const ListTodosComponentWithNavigation = withNavigation(ListTodosComponent)
        const TodoComponentWithParamsAndNavigation = withParams(withNavigation(TodoComponent));

        return (
            <div className='TodoApp'>
                <Router>
                    <HeaderComponentWithNavigation/> 
                    <Routes>
                        <Route path="/" element={<LoginComponent />} />
                        <Route path="/login" element={<LoginComponentWithNavigation />} />
                        <Route path="/welcome/:name" element={
                            <AuthenticatedRoute><WelcomeComponentWithParams/></AuthenticatedRoute>}/>
                        <Route path="/todos" element={ 
                            <AuthenticatedRoute><ListTodosComponentWithNavigation/></AuthenticatedRoute>}/>
                        <Route path="/logout" element={
                            <AuthenticatedRoute><LogoutComponent/></AuthenticatedRoute>} />
                        <Route path="/todos/:id" element={
                            <AuthenticatedRoute><TodoComponentWithParamsAndNavigation/></AuthenticatedRoute>} />  
                        <Route path="*" element={<ErrorComponent />} />
                    </Routes>
                    <FooterComponent/>
                </Router>
            </div>
        )
    }
}

function ErrorComponent() {
    return <div>An Error Occurred. Don't know what to do! Contact support.</div>
}

export default TodoApp