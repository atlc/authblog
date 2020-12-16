export const TOKEN_KEY = 'token'

export default async <T = any>(uri: string, method: string = 'GET', body?: {}) => {
    const Token = localStorage.getItem(TOKEN_KEY);
    const headers = new Headers();
    const options: {[key: string]: string | Headers} = {
        method,
        headers
    }


    if (method === 'POST' || method === 'PUT') {
        headers.append('Content-Type', 'application/json');
        options.body = JSON.stringify(body)
    }

    if (Token) headers.append('Authorization', `Bearer ${Token}`);

    try {
        // const res = await fetch(uri, {
        //     method,
        //     headers,
        //     ...(body) && body
        // });
        // const data = await res.json();

        const res = await fetch(uri, options);

        switch(true) {
            case (res.status >= 500):
                throw new Error('My code sucks, server error!');
            case (res.status === 401):
                throw new Error('Token invalid or not found!');
        }

        if (res.ok) return await res.json();

    } catch (e) {
        console.log(e)
    }
}