import fetchCrowdRiff from './fetch';

async function fetchAssetBySearch(searchTerm: string): Promise<void> {
    try {
        const request = {
            url: 'apps/',
            body: { searchTerm },
            method: 'post'
        }
        fetchCrowdRiff(request);
    } catch(err) {
        console.log(err)
    }
}

export default fetchAssetBySearch;