import React, {Component} from 'react'
import HelloWorldService from '../../api/todo/HelloWorldService';
import {Link} from 'react-router-dom'

/*
In the previous step we hard coded in28minutes in the WelcomeComponent, and that's not really good.
How can we pass the fact that in28minutes has logged in from from the LoginComponent to the Welcome Component.
*/
class WelcomeComponent extends Component 
{
    constructor(props) {
        super();

        this.state = {
            welcomeMessage : ''
        }
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
    }
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
        return  <>
                    <div> 
                        Welcome {this.props.params.name}. You can manage your todos <Link to='/todos'>here</Link>
                    </div>
                    <div className='container'>
                        {this.state.welcomeMessage}
                        Click here to get a customized welcome message.
                        <button onClick={this.retrieveWelcomeMessage} className='btn btn-success'>Get Welcome Message</button>
                    </div>
                </>
    }

    retrieveWelcomeMessage() {
        HelloWorldService.executeHelloWorldService()
        .then(response => this.handleSuccessfulResponse(response))
        //.catch()
    }

    handleSuccessfulResponse(response) {

        this.setState ({welcomeMessage : response.data})

    }
}

export default WelcomeComponent