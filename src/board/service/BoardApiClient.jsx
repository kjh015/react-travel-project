import { authFetch } from "../../AuthFetch";

class BoardApiClient {
    static SERVER_URL = "http://localhost:8000/api/board";
    static GET_LIST = "/list"
    static GET_VIEW = "/view"
    static POST_ADD = "/add"
    static POST_EDIT = "/edit"
    static POST_REMOVE = "/remove"

    static getBoardList() {
        return fetch(BoardApiClient.SERVER_URL + BoardApiClient.GET_LIST);
    }
    static getBoard(no) {
        return fetch(BoardApiClient.SERVER_URL + BoardApiClient.GET_VIEW + "?no=" + no);
    }
    static addBoard(payload) {
        return authFetch(BoardApiClient.SERVER_URL + BoardApiClient.POST_ADD, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        });

    }
    static editBoard(payload) {
        return authFetch(BoardApiClient.SERVER_URL + BoardApiClient.POST_EDIT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
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




}
export default BoardApiClient;