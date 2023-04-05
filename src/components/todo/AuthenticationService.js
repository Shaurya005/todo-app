import axios from "axios";

class AuthenticationService {
    registerSuccessfulLogin (username, password) {
        console.log('registerSuccessfulLogin')
        sessionStorage.setItem('authenticatedUser', username)
       // this.setupAxiosInterceptors()
    }

    /*
        At login, we added a key value pair into session storage. We also need to remove it at log out. Right. 
        So when a user clicks login, what we want to do, is we would want to remove out the key from the session storage.
    */
    logout() {
        sessionStorage.removeItem('authenticatedUser')
    }

    // We would want to check if a user has logged in or not. If logged in, then we would want to enable a few links. Otherwise we need to disable them.
    isUserLoggedIn() { // Method to check if a user is successfully login or not.
        let user = sessionStorage.getItem('authenticatedUser')

        if (user === null) return false;
        return true;
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem('authenticatedUser')
        if (user === null) return '';
        return user;
    }

    // setupAxiosInterceptors() {
    //     let username = 'in28minutes';
    //     let password = 'dummy';

    //     let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)

    //     axios.interceptors.request.use(
    //         (config) => {
    //             if(this.isUserLoggedIn)
    //                 config.headers.authorization = basicAuthHeader
                
    //             return config;
    //         }
            
    //     )
    // }
}

export default new AuthenticationService // For React Components we export the class directly. For Helper services, we export an instrance of the class - an object.

/*
Now how do we track if a user has logged in or not? One of the options available to track whether a user has logged in or not, is session storage.

If you look at all the browsers they have something called session storage, and whatever you put in session storage, is available to the application. 
While user is logged in into the current browser window session. So if you do a right click inspect and go to the application tab, you can check out the 
storage section where if you expand this, you can see that this basic application does not really have anything in session storage.

What we can do, is when a user logs in, we can set a key into sessions storage, and when a user logs out, remove the key out, and we can use that to check if a user has logged in or not.
The great thing is if you close the browser window and come back, This is in storage is completely cleared out. Thereby, a user would be treated as logged out.

What we do in this step, is we'll try and put something into session storage when a user logs in.
So when a user logs in successfully, we want to put a entry in the session storage, that the user has logged in. In the next steps,
We will make use of this specific key token and use it to check before we render all other pages.
*/

/*
In the previous step, we talked about session storage and you might be wondering why did we not use the local storage.
One of the important things about local storage is that once you set a value into it, once you set a key into it, it will not be deleted until you explicitly delete it.
So even if the user closes the browser and comes back, the key would still remain there. So it is not really considered secure, 
and that is the reason why we use session storage, which is cleared as soon as you closed the browser and go out.
*/