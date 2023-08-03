import {httpClient, utils} from '../../services';
import {API_SUB_URL} from "./constants";


export const apiFindADocument = ({type, subKey}) => {
    if (type && subKey)
        return httpClient.get(`${API_SUB_URL}?type=${type}&subKey=${subKey}`);
    else
        return null;
};

export const apiUpdateADocument = (payload) => {
    if (payload){
        if (payload.id)
            return httpClient.patch(`${API_SUB_URL}/${payload.id}`, payload);
        else
            return httpClient.post(`${API_SUB_URL}`, payload);
    }
    else
        return null;
};

export const apiConvertHTMLToPDF = (payload) => {
    if (payload)
        return httpClient.post(`/pdf`, payload, {responseType: 'blob'});
    else
        return null;
};

/**
 * Request zip content, but in blob format. The content should not exceed 500Mb in most browsers.
 *
 * @param payload
 * @returns {*}
 */
export const apiRequestZipContent = (payload) => {
    if (payload)
        return httpClient.post(`/zip`, payload, {responseType: 'blob'});
    else
        return null;
};