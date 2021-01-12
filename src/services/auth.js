export const TOKEN_KEY = "accessToken";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
};

export const isADM = (user) => {
    return user.user_type ===  process.env.REACT_APP_ADM_ROLE;
};

export const isADMOrEmployee = (user) => {
    return (user.user_type === process.env.REACT_APP_EMPLOYEE_ROLE || user.user_type === process.env.REACT_APP_ADM_ROLE);
};

export const isClient = (user) => {
    return ( user.user_type === process.env.REACT_APP_CLIENT_ROLE || user.user_type === process.env.REACT_APP_EMPLOYEE_ROLE || user.user_type === process.env.REACT_APP_ADM_ROLE ) ;
};
