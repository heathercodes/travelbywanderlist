interface RequestBody {
    url: string;
    method: string;
    body: {
        [key: string]: any;
    };
}

export const fetchAPI = async (request: RequestBody): Promise<any> => {
    try {
        const response = await fetch(`/api/${request.url}`, {
            method: request.method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: request.body ? JSON.stringify(request.body) : null,
        });

        return response.json();
    } catch (err) {
        return Promise.reject(new Error(err));
    }
};
