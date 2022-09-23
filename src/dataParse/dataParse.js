class ParseData{
    _url = 'db.json';

    getData = async () => {
        const res = await fetch(this._url);

        return await res;
    }

    newData = async (formData) => {
        const res = await fetch('http://localhost:3000/changedTovar', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        return await res;
    }
}

export default ParseData;