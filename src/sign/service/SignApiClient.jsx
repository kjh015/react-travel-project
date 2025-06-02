import { authFetch } from "../../AuthFetch";

class SignApiClient {
    static SERVER_URL = "http://localhost:8000/api/sign";
    static SIGN_UP = "/sign-up";
    static SIGN_IN = "/sign-in";
    static SIGN_OUT = "/sign-out";
    static WITHDRAW = "/withdraw";
    static GET_NICKNAME = "/nickname";

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
        return authFetch(SignApiClient.SERVER_URL + SignApiClient.SIGN_OUT, {
            method: 'POST',
            credentials: 'include',
        });
        
    }
    static withdraw(){
        return authFetch(SignApiClient.SERVER_URL + SignApiClient.WITHDRAW, {
            method: 'POST',
            credentials: 'include',
        });
        
    }
    static getNickname(loginId){
        return authFetch(SignApiClient.SERVER_URL + SignApiClient.GET_NICKNAME, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ loginId: loginId })
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