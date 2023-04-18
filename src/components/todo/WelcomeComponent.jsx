import React, {Component} from 'react'
import HelloWorldService from '../../api/todo/HelloWorldService';
import {Link} from 'react-router-dom'

class WelcomeComponent extends Component 
{
    constructor(props) {
        super();

        this.state = {
            welcomeMessage : ''
        }
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
        this.handleError = this.handleError.bind(this)
    }
    render() {
        return  <>
                    <h1>Welcome!</h1>
                    <div className='container'> 
                        Welcome {this.props.params.name}. You can manage your todos <Link to='/todos'>here</Link>
                    </div>
                    <div className='container'>
                        {this.state.welcomeMessage}
                        
                        <button onClick={this.retrieveWelcomeMessage} className='btn btn-success'>Get Welcome Message</button>
                    </div>
                </>
    }

    retrieveWelcomeMessage() {
        HelloWorldService.executeHelloWorldPathVariableService(this.props.params.name)
        .then(response => {
            this.handleSuccessfulResponse(response)
        })
        .catch(error => this.handleError(error))
    }

    handleSuccessfulResponse(response) {
        console.log(response)
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);

        this.setState ({welcomeMessage : response.data.message})
    }

    handleError(error) {
        console.log( error.response)

        let errorMessage = '';
        if(error.message)
            errorMessage += error.message;
         if(error.response && error.response.data)
            errorMessage += error.response.data;
        this.setState ({welcomeMessage : errorMessage})
    }
}

export default WelcomeComponent