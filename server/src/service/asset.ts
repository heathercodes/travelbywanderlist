import fetchCrowdRiff from './fetch';

async function fetchGallery(id: number): Promise<void> {
    try {
        const request = {
            url: 'apps/',
            body: { id },
            method: 'get'
        }
        fetchCrowdRiff(request);
    } catch(err) {
        console.log(err)
    }
}

export default fetchGallery;