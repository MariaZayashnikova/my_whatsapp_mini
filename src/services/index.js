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
}