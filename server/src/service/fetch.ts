import fetch from 'node-fetch';

interface Body {
    searchTerm?: string;
    id?: number;
}

interface FetchRequest {
    url: string;
    body: Body;
    method: string;
}

async function fetchCrowdRiff(request: FetchRequest): Promise<void> {
    try {
        return fetch(`${process.env.CROWDRIFF_BASEURL}${request.url}`,{
            method: request.method,
            body:    JSON.stringify(request.body),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.CROWDRIFF_API}`
            },
        })
        .then(res => res.json())
        .then(json => console.log(json));
    } catch(err) {

    }
}

export default fetchCrowdRiff;