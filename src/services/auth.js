const TOKEN_KEY = process.env.REACT_APP_LOCALSTORAGE_TOKEN_NAME;
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const isADM = (user) => {
    return user.user_type ===  process.env.REACT_APP_ADM_ROLE;
};

export const isADMOrEmployee = (user) => {
    return (user.user_type === process.env.REACT_APP_EMPLOYEE_ROLE || user.user_type === process.env.REACT_APP_ADM_ROLE);
};

export const isClientOrADMOrEmployee = (user) => {
    return ( user.user_type === process.env.REACT_APP_CLIENT_ROLE || user.user_type === process.env.REACT_APP_EMPLOYEE_ROLE || user.user_type === process.env.REACT_APP_ADM_ROLE ) ;
};
