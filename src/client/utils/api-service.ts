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
        const res = await fetch(uri, options);

        // switch(true) {
        //     case (Number(res.status) >= 500):
        //         throw new Error('My code sucks, server error!');
        //     case (Number(res.status) >= 401 && Number(res.status) < 500):
        //         throw new Error('Token invalid or not found!');
        //     case (Number(res.status) >= 200 && Number(res.status) < 400):
        //         return await res.json();    
        // }

        if (!res.ok) throw new Error('Server error.');
        
        const data = await res.json();
        console.log(data);
    } catch (e) {
        console.log(e)
    }
}