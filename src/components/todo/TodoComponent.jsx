import React, {Component} from 'react'
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TodoDataService from '../../api/todo/TodoDataService';
import AuthenticationService from './AuthenticationService';

class TodoComponent extends Component {

    constructor(props) {
        /*
        In the previous steps we set up the TodoComponent. In this step, Let's build up a form for the todo. For some time, instead of connecting to the back end, 
        we will have a todo form where the default values are directly populated into the form. Let's put a few values into this state, and we'll take those values 
        and show them in the form. After some time what wes will call the API, and put the values into this data. So let's create a default state.
        */
        super(props)

        this.state = {
            id : this.props.params.id,
            description : '',
            targetDate : moment(new Date()).format('YYYY-MM-DD')
            // Let's start with using moment. New Date() format we saw was not really good. So I'll start using moment which is an awesome javascript library 
            // which helps you to format dates and things like that. So I'll say .format(). and in the format, I would want to use is YYYY-MM-DD. 
            // This is the format in which the HTML dates are typically stored, so let's use that as the targetDate in our state.
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount() { // Here we invoke the API to retrieve the details of a todo and connected it to the front end.
        if(this.state.id===-1)
            return;

        let username = AuthenticationService.getLoggedInUserName();
        TodoDataService.retrieveTodo(username, this.state.id)
            .then(
                responnse => this.setState({
                    description: responnse.data.description, 
                    targetDate: moment(responnse.data.targetDate).format('YYYY-MM-DD') // For the targetDate, we need to do the same formatting that we did earlier for targetDate.
                                                          // We need to use the moment framework and format it to the same format.
                    })
            )
    }

    validate(values) {
        let errors = {}
        if(!values.description) {
            errors.description = 'Enter a Description'
        } else if(values.description.length<5) {
            errors.description = 'Enter atleast 5 Characters in Description'
        }

        // The value of the date field is the values.targetDate. To validate the date field, We can use a moment framework, it provides options to check if a date is valid or Not.
        if(!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid Target Date'
        }

        return errors
    }

    onSubmit(values) {
        console.log(values); // Whatever values which we are modifying on screen, it gets populated directly into values.

        let username = AuthenticationService.getLoggedInUserName();
        let todo = {
                id: this.state.id,
                description: values.description,
                targetDate: values.targetDate
            }
        if (this.state.id === -1) {
            TodoDataService.createTodo(username, todo)
            .then(() => this.props.navigate('/todos'))
        } else {
            TodoDataService.updateTodo(username, this.state.id, todo)
            .then(() => this.props.navigate('/todos'))// If updateTodo service is successful, we are redirecting the user to the todos page.
            // you need to pass in an object saying what details need to be updated. We'll pick that from the values.
            // so we'll say id: this.state.id, description: values.description and targetDate: values.targetDate. id Is not in values so we pick this from this.state.id
        }
    }

    render() {
        
        let {description,targetDate} = this.state // This is destructuring.
        // let description = this.state.description
        // let targetDate = this.state.targetDate

        /*
        Earlier, with LoginComponent, We used the normal HTML element, and we wrote all the events. we wrote the handleChange event, We did all this stuff, 
        and we did not really write a lot of validation and stuff, in here as well. But what we saw at that point was creating forms with React was complex. 
        It's not an easy task and that's where we would want to use another library called formic. Formic is one of the most popular form libraries with React. 
        It's very very popular and used across the world. We will now install formic and also another library called moment, which we will use to format it.
        */
        return (
            <div>
                <h1>Todo</h1>
                <div className="container">
                {/* Let's focus on the form now. To create a form in formic, the way we can start it is by using a <Formik> tag.
                So inside Formik,we would need to actually define a method, which would return the entire form. So I would start with putting javascript notation. 
                For this method, we will receive the props which are passed in, and we can define what should be returned there. So inside the Formik component.
                We are defining a method which accepts props as input, and returns back the exact HTML of the form.
                The way we can define a form in formik is by using a tag called Form which is imported from Formik.
                Inside the Form, we would want all the Form elements. I'll put a parenthesis around the divs, so that we can easily format it in a better way.*/}
                    <Formik
                    /* In the previous step, we designed a todo page form. Now we'll take the initial values from this state, and actually show them in these fields, 
                    and also when we do the save, we would want to actually submit the details which are present in there.

                    How to show the initial values in this state? We already have the default values populated in the state. At a later point in time, 
                    we will get them from the API and show them in here. But for now we have the default values. To show them inside the form, formik makes it very easy, 
                    all that I need to do is send something called initialValues.So we create a variable for description and targetDate. In formik I can add in a property 
                    called initialValues, and on this initialValues we would want to assign a javascript object to it. So if you want to assign a javascript object, 
                    I would need to put two curly braces the first one to say it's javascript, and the second one to say I'm creating an object, right. 
                    In the initial values, what we'll do is we'll put description: description. So we are saying I would want to have a key-value pair. 
                    The name of the key is description, the value is description whatever is present above. Similarly for javascript object targetDate. 
                    
                    So whatever the values we are setting in the state, are appearing in the form. This syntax here looks a little verbose. 
                    We can make use of is a shortcut notation. Here the key and the name of the variable which contains the value, is the same. 
                    In those kind of situations, You can create JavaScript objects just by saying initialValues={{description,targetDate}}.
                    
                    Thing is, the same structure can be created very easily, by not even needing to pass in the value attribute if the name and the value are exactly the same.
                    So if the key is the same as the name of the variable which has the value, then you don't really need to do colon and put that in.*/
                        initialValues={{description,targetDate}}
                        onSubmit={this.onSubmit} 
                        /*The next thing is handling the submit. The way we can handle the submit is by defining it onSubmit(). There is an attribute called values which 
                        is passed in to the method handling onSubmit event. For now, Let's do a console.log of value so that we can see what are the values being submitted. 
                        Compare it against the login form that we created earlier, to be able to get the values out from the fields. What we had to do was to create onChange 
                        method on each of the elements, and we had to actually define the body of onChange method as well. But formik makes it all easy.*/
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}>
                        {/* One of the things we need to do is to enable re-initialization on formik, so what we would need to do is enableReInitialize = true. By default, It's turned off. That's why the form does not initialize. */}
                        
                        {/* We can see that as soon as I change the values, the validation is kicking in and the validation is also active as soon as I blur something.
                        So if I do a blur, also the same thing would happen. What we need to do is disable both of those. Formik by default enables validation onBlur and validation onChange.
                        So what we'll do is validateOnChange = false, and validateOnBlur = false. And now you see that even if I enter an error value, until we click Save, the validation doesn't happen.

                        We saw that only when the validation is passed, the forms get submitted. So when I entered a proper value, then the submit button submit method is being called.
                        Otherwise you'd see that you would get a validation error. */}
                        {
                            (props) => (
                                <Form>
                                {/* So now inside the form, we want to create our form elements. Start with creating description and the targetDate, and we're using Bootstrap.
                                So we'll use bootstrap elements, so we'll start with doing fieldset, and inside that <fieldset> you define your element which you'd want to show.
                                And over here you would have a <label></label> and the actual <input> element.
                                However, we are using formik. So what we would use is something called <Field>. Field is also imported from formic. Let's add a few classes to it.
                                So these are basic bootstrap classes to format the form, so className=form-group and for Field, Let's add a className of form-control. */}
                                    <ErrorMessage name="description" component="div" 
                                                                className="alert alert-warning"/>
                                    <ErrorMessage name="targetDate" component="div" 
                                                                className="alert alert-warning"/>
                                    {/* How can I see the error, formik makes it makes it very easy. So if I want to see the error message, all that I need to do is add 
                                    ErrorMessage, which field's the error message is this? name=description and let's create the error message in a div. 
                                    So let's say component=div, and let's assign className=alert alert-warning to it. */}
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field className="form-control" type="date" name="targetDate"/>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                
                </div>                
            </div>
        )
    }
}

export default TodoComponent