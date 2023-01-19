import React, {Component} from 'react'
import { Link} from 'react-router-dom'
import AuthenticationService from './AuthenticationService'

class HeaderComponent extends Component {
    render() {

        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        // console.log(isUserLoggedIn)

        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="http://www.in28minutes.com" className='navbar-brand'>in28minutes</a></div>
                    <ul className="navbar-nav">
                    {/* We need to use value, isUserLoggedIn, to enable or disable links. We need to show this link only when user is logged in. */}
                        {isUserLoggedIn && <li><Link className='nav-link' to="/welcome/in28minutes">Home</Link></li>}
                        {isUserLoggedIn && <li><Link className='nav-link' to="/todos">Todos</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li><Link className='nav-link' to="/login">Login</Link></li>}
                        {isUserLoggedIn && <li><Link className='nav-link' to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

class FooterComponent extends Component {
    render() {
        return (
            <footer className='footer'>
                <span className='text-muted'>All Rights reserved 2018 @in28minutes</span>
            </footer>
        )
    }
}

export default HeaderComponent
export {FooterComponent}