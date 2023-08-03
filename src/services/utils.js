import {
    PAGINATION_ITEMS_PER_PAGE,
} from "../constants";
import {httpClient, httpClient2} from "./index";
import FormData from 'form-data';

let utils = {
    getModuleAbsLink(modName) {
        let absLink = window.location.href;
        return absLink.substring(0, absLink.indexOf(`/${modName}/`) + modName.length + 2);
    },

    /**
     * Get array of item list in the normalized state tree. Mostly used in the list selector.
     *
     * @param currentSelectedState
     * @param itemSchemaIdentification
     * @returns {null}
     */
    getItemListInStateTree(currentSelectedState, itemSchemaIdentification) {
        if (currentSelectedState.result)
            return currentSelectedState.result.map(id =>
                currentSelectedState.entities[itemSchemaIdentification][id]
            );
        else
            return null;
    },

    /**
     * Factory function for calling LIST API for an endpoint.
     *  - Filter must be built before passing to payload.
     *      + E.g. $or[0][agentName][$like]=%25900%25&$or[1][businessNumber][$like]=%25900%25
     *
     * @param payload
     * @returns {AxiosPromise<any>}
     *
     * Data shape:
     {
         data: [{…}, {…}, {…}, {…}, {…}]
         limit: 5
         skip: 0
         total: 9
     }
     */
    callAPIListFor(apiSubEndPoint) {
        const callLoadListAPI = (payload) => {
            let {limit, skip, sortBy, sortDir, filter} = payload;
            if (!limit)
                limit = PAGINATION_ITEMS_PER_PAGE;
            if (!sortBy)
                sortBy = 'id';
            if (!sortDir)
                sortDir = -1;
            if (!skip || skip < 0)
                skip = 0;

            let apiUrl = `${apiSubEndPoint}?$sort[${sortBy}]=${sortDir}&$limit=${limit}&$skip=${skip}`;
            if (filter)
                apiUrl += filter;
            return httpClient.get(apiUrl);
        };
        return callLoadListAPI;
    },

    callAPIListFor2(apiSubEndPoint) {
        const callLoadListAPI = (payload) => {
            let {limit, skip, sortBy, sortDir, filter} = payload;
            if (!limit)
                limit = PAGINATION_ITEMS_PER_PAGE;
            if (!sortBy)
                sortBy = 'id';
            if (!sortDir)
                sortDir = -1;
            if (!skip || skip < 0)
                skip = 0;

            let apiUrl = `${apiSubEndPoint}?sort[${sortBy}]=${sortDir}&limit=${limit}&skip=${skip}`;
           
            filter && Object.keys(filter).map(key => {
                apiUrl += "&" + key + "=" + filter[key];
            })

            return httpClient2.get(apiUrl);
        };
        return callLoadListAPI;
    },

    /**
     * Upload a single file to remote
     * @param file
     */
    uploadFile(file, subPath = null){
        let data = new FormData();
        data.append('uri', file, file.fileName);
        httpClient.defaults.headers.common['accept'] = 'application/json';
        httpClient.defaults.headers.common['Accept-Language'] = 'en-US,en;q=0.8';
        httpClient.defaults.headers.common['Content-Type'] = `multipart/form-data; boundary=${data._boundary}`;
        let uploadURL = '/upload';
        if (subPath)
            uploadURL += `?subPath=${subPath}`;
        return httpClient2.post(uploadURL, data);
    },

    deleteFile({id, subPath}){
        let uploadURL = `/upload/delete/${id}?subPath=${subPath}`;
        return httpClient2.delete(`${uploadURL}`);
    },

    // Get Remote IP
    getUserGeolocationDetails() {
        fetch(
            "https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572"
        )
        .then(response => response.json())
        .then(data => {});
    },
};

export default utils;