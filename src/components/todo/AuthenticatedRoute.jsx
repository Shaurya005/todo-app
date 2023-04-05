import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthenticationService from "./AuthenticationService";

class AuthenticatedRoute extends Component 
{
    // In the render, if user is logged in then we want to redirect him to the welcome, otherwise you'd want to redirect him to the login page.
    render() {
        /*
        So if AuthenticatedUser.isUserLoggedIn, then we would want to redirect him to the <Route/>.

        Now when we change <Route/> to <AuthenticatedRoute/>, what would happen is all the parameters would be passed to <AuthenticatedRoute> now which were 
        previously being passed to <Route/>. So we would want to take all those props and also pass them to the <Route/> here. How do we do that?

        The way we can do that is by using something called {...this.props} with <Route/> tag. What we are using in here is called a spread operator. 
        What is the spread operator? Now let's say there is a simple array (let values = [1,2,3]), and there is a simple function called sum accepting three 
        parameters(a,b,c), which returns a+b+c i.e sum. Now if I call sum with let's say 45, 60 and 90. It would return 195 back. That's exactly as I expected.

        Now I want to use the values from above array, and call the sum(). We do sum(values[0], values[1], values[2]). It gives 6. 
        Instead of that, JavaScript provided something called a spread operator. What you can do is you can say sum(...values).
        What happens is all the elements in this array would be parsed as an individual parameter.
        So what happens is 1 needs to map to a, 2 will be mapped to b, and 3 will be mapped to c. This is called the spread operator.

        What we want to do is if the Todo app is passing different parameters to the <AuthenticatedRoute/>, we need to exactly pass the same parameters 
        to the <Route/>, instead of individually defining those properties. So I'm saying take all the properties and spread them out - <Route {...this.props}>
        Else we need to redirect the user to login page.
        */
        if (AuthenticationService.isUserLoggedIn()) {
            return {...this.props.children}
        } else {
            return <Navigate to="/login" />
        }
    }
}

export default AuthenticatedRoute