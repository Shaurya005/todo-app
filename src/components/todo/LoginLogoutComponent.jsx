import React, {Component} from 'react'
import AuthenticationService from './AuthenticationService';

class LoginComponent extends Component {

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
            AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
            console.log("Successful with username - " + this.state.username)
            this.props.navigate(`/welcome/${this.state.username}`)
        }
        else {
            console.log("Failed")
            this.setState({showSuccessMessage: false, hasLoginFailed: true})
        }
    }

    handleChange(event) {
        console.log(this.state)

        this.setState(
            {[event.target.name]: event.target.value}
        )
    }

    render() {
        return (
            <div>
               <h1>Login</h1>
               <div className='container'>
               { this.state.hasLoginFailed && <div className='alert alert-warning'>Invalid Credentials</div>}
               { this.state.showSuccessMessage && <div>Login Succesful</div> }
               User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
               Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
               <button className='btn btn-success' onClick={this.loginClicked}>Login</button>
               </div>
            </div>
        )
    }
}

class LogoutComponent extends Component {
    render() {
        return (
            <div>                
                <h1>You are logged out</h1>
                <div className='container'>
                    Thank You for using our application
                </div>
            </div>
        )
    }
}

export default LoginComponent
export {LogoutComponent}