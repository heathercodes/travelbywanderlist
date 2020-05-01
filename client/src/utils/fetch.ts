export const fetchAPI = async (
    url: string,
    method: string,
    bodyParams?: { [key: string]: string },
): Promise<any> => {
    const response = await fetch(url, {
        method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: bodyParams ? JSON.stringify(bodyParams) : null,
    });

    return response.json();
};
