import { authFetch } from "../../AuthFetch";

class SignApiClient {
    static SERVER_URL = "http://localhost:8000/sign-api";
    static SIGN_UP = "/sign-up";
    static SIGN_IN = "/sign-in";
    static SIGN_OUT = "/sign-out"

    static signUp(payload) {        
        return fetch(SignApiClient.SERVER_URL + SignApiClient.SIGN_UP, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        });
    }
    static signIn(payload) {
        return fetch(SignApiClient.SERVER_URL + SignApiClient.SIGN_IN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(payload),
        });
    }
    static signOut(){
        return fetch(SignApiClient.SERVER_URL + SignApiClient.SIGN_OUT, {
            method: 'POST',
            credentials: 'include',
        });
        
    }
    static test(){
         return authFetch(SignApiClient.SERVER_URL + "/test", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        });
    }
}

export default SignApiClient;