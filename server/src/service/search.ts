import { fetchImages } from './fetch';

async function fetchImageByLocation(searchTerm: string): Promise<void> {
    try {
        const request = {
            url: '/search/photos',
            query: searchTerm,
            method: 'get'
        }
        return fetchImages(request);
    } catch(err) {
        console.log(err)
    }
}

export { fetchImageByLocation };