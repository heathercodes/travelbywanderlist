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

async function fetchImages(request: FetchRequest): Promise<void> {
    try {
        return fetch(`https://api.unsplash.com/${request.url}`,
        {
            method: request.method,
            body:   JSON.stringify(request.body),
            headers: {
                'Content-Type': 'application/json',
                'Accept-Version': 'v1',
                Authorization: `Client-${process.env.UNSPLASH_ACCESS_KEY}`,
            },
        })
        .then(res => res.json())
        .then(json => console.log(json));
    } catch(err) {

    }
}

export { fetchImages };