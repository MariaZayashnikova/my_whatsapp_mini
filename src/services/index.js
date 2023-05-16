export default class GreenApi {
    constructor() {
        this._ApiBase = 'https://api.green-api.com/waInstance';
    }

    getService = async (data, method) => {
        const res = await fetch(`${this._ApiBase}${data.idInstance}/${method}/${data.apiTokenInstance}`);

        if (!res.ok) {
            throw new Error(`Ошбика по адресу: ${this._ApiBase}, Статус: ${res.status}`);
        }

        return await res.json();
    }

    postService = async (data, method) => {
        let values = JSON.stringify(data.value)
        const res = await fetch(`${this._ApiBase}${data.idInstance}/${method}/${data.apiTokenInstance}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: values
        });

        if (!res.ok) {
            throw new Error(`Ошбика по адресу: ${this._ApiBase}, Статус: ${res.status}`);
        }

        return await res.json();
    }

    deleteNotification = async (data) => {
        const res = await fetch(`${this._ApiBase}${data.idInstance}/DeleteNotification/${data.apiTokenInstance}/${data.receiptId}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        });

        if (!res.ok) {
            throw new Error(`Ошбика по адресу: ${this._ApiBase}, Статус: ${res.status}`);
        }

        return await res.json();
    }
}