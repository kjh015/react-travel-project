class LogDBApiClient {
    static SERVER_URL = "http://localhost:8000/log-db";
    static GET_SUCCESS = "/success";
    static GET_FAIL = "/fail";
    static GET_PROCESS = "-process";
    static GET_FILTER = "-filter";

    static getSuccessList() {
        return fetch(LogDBApiClient.SERVER_URL + LogDBApiClient.GET_SUCCESS);
    }
    static getFailList() {
        return fetch(LogDBApiClient.SERVER_URL + LogDBApiClient.GET_FAIL);
    }
    static getSuccessListByProcess(processId) {
        return fetch(LogDBApiClient.SERVER_URL + LogDBApiClient.GET_SUCCESS + LogDBApiClient.GET_PROCESS + "?processId=" + processId);
    }
    static getFailListByProcess(processId) {
        return fetch(LogDBApiClient.SERVER_URL + LogDBApiClient.GET_FAIL + LogDBApiClient.GET_PROCESS + "?processId=" + processId);
    }
    static getFailListByFilter(filterId) {
        return fetch(LogDBApiClient.SERVER_URL + LogDBApiClient.GET_FAIL + LogDBApiClient.GET_FILTER + "?filterId=" + filterId);
    }

}

export default LogDBApiClient;