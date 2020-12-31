export let Token: string = localStorage.getItem('token') || null;

export let User: any = {
    userid: localStorage.getItem('userid') || null,
    roles: localStorage.getItem('roles') || null
}

export const api = async <T = any>(uri: string, method: string = 'GET', body?: {}) => {
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
        const res = await fetch(uri, options)    
        if (res.ok) {
            return <T><unknown>(res);
        } else {
            return <T><unknown>(res);
        }
    } catch (e) {
        console.log(e);
    }
}

export const SetAccessToken = (token: string, user: {} = { userid: undefined, roles: [] }) => {
    Token = token;
    User = user;

    localStorage.setItem('token', token);
    localStorage.setItem('userid', User.userid);
    localStorage.setItem('roles', User.roles);
}