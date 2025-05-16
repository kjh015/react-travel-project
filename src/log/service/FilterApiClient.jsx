class FilterApiClient {
    static SERVER_URL = "http://localhost:8000/filter";
    static GET_LIST = "/list"
    static GET_VIEW = "/view"
    static POST_ADD = "/add"
    static POST_UPDATE = "/update"
    static POST_REMOVE = "/remove"
    static GET_KEYS = "/keys"

    static getFilterList(processId) {
        return fetch(FilterApiClient.SERVER_URL + FilterApiClient.GET_LIST + "?processId=" + processId);
    }
    static viewFilter(filterId) {
        return fetch(FilterApiClient.SERVER_URL + FilterApiClient.GET_VIEW + "?filterId=" + filterId);
    }
    static addFilter(processId, name, active, conditionStr, tokens) {
        return fetch(FilterApiClient.SERVER_URL + FilterApiClient.POST_ADD + "?processId=" + processId + "&name=" + name + "&active=" + active, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                expression: conditionStr,
                tokens: tokens
            }),
        });
    }
    static updateFilter(filterId, name, active, conditionStr, tokens) {
        return fetch(FilterApiClient.SERVER_URL + FilterApiClient.POST_UPDATE + "?filterId=" + filterId + "&name=" + name + "&active=" + active, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                expression: conditionStr,
                tokens: tokens
            }),
        });
    }
    static removeFilter(filterId) {
        return fetch(FilterApiClient.SERVER_URL + FilterApiClient.POST_REMOVE + "?filterId=" + filterId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    static getFormatKeys(processId) {
        return fetch(FilterApiClient.SERVER_URL + FilterApiClient.GET_KEYS + "?processId=" + processId);
    }


}
export default FilterApiClient;