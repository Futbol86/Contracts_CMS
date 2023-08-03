import {httpClient, httpClient2} from '../../services';
import {API_SUB_URL, API_SUB_UPDATE_PROFILE_URL, API_SUB_UPDATE_PASSWORD_URL, API_SUB_USER_LOG_URL} from './constants';
import {AUTH_MANAGEMENT_API_SUB_URL} from '../../constants';

export const apiLoadProfile = ({id}) => {
    return httpClient.get(`${API_SUB_URL}/${id}`);
};

// export const apiUpdateProfile = ({id, email, isVerified, createdAt, updatedAt, wholesaleMargin, productMargin, ...remainingInfo}) => {
//     return httpClient.patch(`${API_SUB_URL}/${id}`, remainingInfo);
// };

/**
 * It is assumed that the oldPassword and newPassword are already validated
 *
 * @param id
 * @param oldPassword
 * @param newPassword
 * @returns {AxiosPromise<any>}
 */
// export const apiUpdatePassword = ({id, currentPassword, password}) => {
//     return httpClient.post(
//         AUTH_MANAGEMENT_API_SUB_URL,
//         {
//             action: "passwordChange",
//             value: {
//                 user: {id: `${id}`},    //-- Trick: since we allow id as user identifier, must provide a string
//                 oldPassword: currentPassword,
//                 password
//             }
//         }
//     );
// };

export const apiUpdateProfile = (payload = {}) => {
    return httpClient2.patch(`${API_SUB_UPDATE_PROFILE_URL}/${payload.id}`, payload);
};

export const apiUpdatePassword = (payload = {}) => {
    return httpClient2.patch(`${API_SUB_UPDATE_PASSWORD_URL}/${payload.id}`, payload);
};

export const apiAddAUserLog = (payload = {}) => {
    return httpClient2.post(`${API_SUB_USER_LOG_URL}`, payload);
};