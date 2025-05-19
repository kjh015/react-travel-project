class SignApiClient {
    static SERVER_URL = "http://localhost:8000/sign-api";
    static SIGN_UP = "/sign_up";
    static SIGN_IN = "/sign_in";

    static signUp({ loginId, password, email, nickname, gender, role }) {
        const payload = {
            loginId,
            password,
            email,
            nickname,
            gender,
            role
        };
        return fetch(SignApiClient.SERVER_URL + SignApiClient.SIGN_UP, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        });
    }
    static signIn({loginId, password}) {
        const payload = {
            loginId,
            password
        };
        return fetch(SignApiClient.SERVER_URL + SignApiClient.SIGN_IN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        });
    }
}

export default SignApiClient;