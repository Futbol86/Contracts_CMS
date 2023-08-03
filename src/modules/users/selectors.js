import {createSelector} from 'reselect';
import {MODULE_ID} from "./constants";

export const getUserId = (state) => {
    return (state.auth && state.auth.user && state.auth.user.user && state.auth.user.user.id);
}

export const getUserName = (state) => {
    return (state.auth && state.auth.user && state.auth.user.user && state.auth.user.user.username);
}

export const getGroupId = (state) => {
    return (state.auth && state.auth.user && state.auth.user.user && state.auth.user.user.group_id);
}

export const getUserData = (state) => {
    return (state.auth && state.auth.user && state.auth.user.user);
}

export const getUserAccessModules = (state) => ('all');

const getUserProfileFunc = (state) => state[MODULE_ID].detail;
export const getUserProfile = createSelector(
    getUserProfileFunc,
    (user) => user
);

export const getDealerInfo = createSelector(
    getUserProfileFunc,
    (user) => user && user.dealer
);

const getUserRolesFunc = createSelector(
    getUserProfileFunc,
    (user) => user.roles
);
export const checkIsDealerRole = createSelector(
    getUserRolesFunc,
    (roles) => (roles && (roles.includes('dealer') || roles.includes('admin')))
);

export const getUserAccessProductTypes = (state) => (state.auth && state.auth.user && state.auth.user.user
    && state.auth.user.user.accessProductTypes && state.auth.user.user.accessProductTypes.split(','));

export const getDealerLogoFile = (state) => state[MODULE_ID].dealerForm.logoFile;