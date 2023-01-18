import axios from "axios"

class HelloWorldService {
    executeHelloWorldService() {
        return axios.get('http://localhost:8080/hello-world')
    }

    executeHelloWorldBeanService() {
        return axios.get('http://localhost:8080/hello-world-bean')
    }

    executeHelloWorldPathVariableService(name) {
        return axios.get(`http://localhost:8080/hello-world/path-variable/${name}`)
        // ${name} will be replaced with function parameter 'name' only if we use `` and not with '' or ""
    }
}

export default new HelloWorldService