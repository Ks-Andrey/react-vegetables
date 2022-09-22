class ParseData{
    _url = 'db.json';

    getData = async () => {
        const res = await fetch(this._url);

        return await res;
    }

    addTovar = async (formData) => {
        await fetch(this._url, formData);
    }
}

export default ParseData;