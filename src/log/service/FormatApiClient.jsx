class FormatApiClient {
    static SERVER_URL = "http://localhost:8000/format";
    static GET_LIST = "/list"
    static GET_VIEW = "/view"
    static POST_ADD = "/add"; 
    static POST_UPDATE = "/update"
    static POST_REMOVE = "/remove" 
    
    static getFormatList(processId){
        return fetch(FormatApiClient.SERVER_URL + FormatApiClient.GET_LIST + "?processId=" + processId);
    }
    static viewFormat(formatId){
        return fetch(FormatApiClient.SERVER_URL + FormatApiClient.GET_VIEW + "?formatId=" + formatId);
    }
    
    static addFormat(processId, name, formatJson) {
        return fetch(FormatApiClient.SERVER_URL + FormatApiClient.POST_ADD + "?processId=" + processId + "&name=" + name, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                format: JSON.parse(formatJson),
            })
        });
    }
    static updateFormat(formatId, name, formatJson) {
        return fetch(FormatApiClient.SERVER_URL + FormatApiClient.POST_UPDATE + "?formatId=" + formatId + "&name=" + name, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                format: JSON.parse(formatJson),
            })
        });
    }
    static removeFormat(formatId) {
        return fetch(FormatApiClient.SERVER_URL + FormatApiClient.POST_REMOVE + "?formatId=" + formatId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    
}
export default FormatApiClient;