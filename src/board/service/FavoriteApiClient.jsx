class FavoriteApiClient {
    static SERVER_URL = "http://localhost:8000/favorite-api";
    static POST_TOGGLE = "/toggle";
    static POST_EXISTS = "/exists";


    static toggleFavorite(payload){
        return fetch(FavoriteApiClient.SERVER_URL + FavoriteApiClient.POST_TOGGLE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        });        
    } 
    static existsFavorite(payload){
        return fetch(FavoriteApiClient.SERVER_URL + FavoriteApiClient.POST_EXISTS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        });        
    } 
    
}

export default FavoriteApiClient;