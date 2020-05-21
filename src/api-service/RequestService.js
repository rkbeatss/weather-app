class RequestService {
    async fetchRequest(url){
        let res = await fetch(url);
        if (res.ok){
            return await res.json();
        } else {
            throw new Error(res.statusText);
        }
    }
}
export default new RequestService()