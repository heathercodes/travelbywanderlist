interface RequestBody {
    url: string;
    method: string;
    body: {
        [key: string]: string;
    };
}

export const fetchAPI = async (request: RequestBody): Promise<any> => {
    const response = await fetch(request.url, {
        method: request.method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: request.body ? JSON.stringify(request.body) : null,
    });

    return response.json();
};
