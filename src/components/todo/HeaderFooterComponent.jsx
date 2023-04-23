import React, {Component} from 'react'
import { Link} from 'react-router-dom'
import AuthenticationService from './AuthenticationService'

class HeaderComponent extends Component {
    render() {

        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="http://www.clover.com" className='navbar-brand'>CLover POS</a></div>
                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li><Link className='nav-link' to="/welcome/Clover">Home</Link></li>}
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
                <span className='text-muted'>All Rights reserved 2023 @Clover</span>
            </footer>
        )
    }
}

export default HeaderComponent
export {FooterComponent}