class ParseData{
    // _url = 'db.json';

    getData = async (url) => {
        const res = await fetch(url);

        return await res;
    }

    newData = async (formData, url) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        return await res;
    }

    sellTovar = async (sellData) => {
        const res = await fetch('http://localhost:3000/sellTovar', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sellData)
        });

        return await res;
    }

    deleteItem = async (url, id) => {
        const res = await fetch(url + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        return await res;
    }

    changePassword = async (password) => {
        const res = await fetch('http://localhost:3000/password/1', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(password)
        });

        return await res;
    }
}

export default ParseData;