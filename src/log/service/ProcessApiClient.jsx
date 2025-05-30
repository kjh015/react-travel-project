class ProcessApiClient {
    static SERVER_URL = "http://localhost:8000/process";
    static GET_LIST = "/list"
    static POST_ADD = "/add"
    static POST_UPDATE = "/update"
    static POST_REMOVE = "/remove"

    static getProcessList() {
        return fetch(ProcessApiClient.SERVER_URL + ProcessApiClient.GET_LIST);
    }
    static addProcess(name) {
        return fetch(ProcessApiClient.SERVER_URL + ProcessApiClient.POST_ADD + "?name=" + name, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    static updateProcess(processId, name) {
        return fetch(ProcessApiClient.SERVER_URL + ProcessApiClient.POST_UPDATE + "?processId=" + processId + "&name=" + name, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    static removeProcess(processId) {
        return fetch(ProcessApiClient.SERVER_URL + ProcessApiClient.POST_REMOVE + "?processId=" + processId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }


}
export default ProcessApiClient;