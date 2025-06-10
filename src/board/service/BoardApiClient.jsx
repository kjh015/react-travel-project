import { authFetch } from "../../AuthFetch";

class BoardApiClient {
    static SERVER_URL = "http://localhost:8000/api/board";
    static GET_LIST = "/list";
    static GET_VIEW = "/view";
    static GET_SEARCH = "/search";
    static POST_ADD = "/add";
    static POST_EDIT = "/edit";
    static POST_REMOVE = "/remove";
    static POST_MIGRATE = "/migrate-data";

    static getBoardListBySearch({keyword, category, region, sort, direction, page}){
        return fetch(BoardApiClient.SERVER_URL + BoardApiClient.GET_SEARCH + `?keyword=${keyword}&category=${category}&region=${region}&sort=${sort}&direction=${direction}&page=${page}`);
    }

    static getBoardList() {
        return fetch(BoardApiClient.SERVER_URL + BoardApiClient.GET_LIST);
    }
    static getBoard(no) {
        return fetch(BoardApiClient.SERVER_URL + BoardApiClient.GET_VIEW + "?no=" + no);
    }
    static addBoard(formData) {
        return authFetch(BoardApiClient.SERVER_URL + BoardApiClient.POST_ADD, {
            method: 'POST',
            body: formData,
        });

    }
    static editBoard(formData) {
        return authFetch(BoardApiClient.SERVER_URL + BoardApiClient.POST_EDIT, {
            method: 'POST',
            body: formData,
        });
    }
    static removeBoard(no) {
        return authFetch(BoardApiClient.SERVER_URL + BoardApiClient.POST_REMOVE + "?no=" + no, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            }),
        });
    }
    static migrateBoard() {
        return authFetch(BoardApiClient.SERVER_URL + BoardApiClient.POST_MIGRATE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }




}
export default BoardApiClient;