class FilterApiClient {
    static SERVER_URL = "http://localhost:8000/filter"; 
    static GET_LIST = "/list"
    static GET_VIEW = "/view"
    static POST_ADD = "/add"
    static POST_UPDATE = "/update"
    static POST_REMOVE = "/remove"

    static getFilterList(){
        return fetch(FilterApiClient.SERVER_URL + FilterApiClient.GET_LIST);
    }
    static viewFilter(filterId){
        return fetch(FilterApiClient.SERVER_URL + FilterApiClient.GET_VIEW + "?filterId=" + filterId);
    }
    static addFilter(name){
        return fetch(FilterApiClient.SERVER_URL + FilterApiClient.POST_ADD + "?name=" + name, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    static updateFilter(processId, name){
        return fetch(FilterApiClient.SERVER_URL + FilterApiClient.POST_UPDATE + "?filterId=" + filterId + "&name=" + name, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    static removeFilter(processId){
        return fetch(FilterApiClient.SERVER_URL + FilterApiClient.POST_REMOVE + "?filterId=" + filterId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    
}
export default FilterApiClient;