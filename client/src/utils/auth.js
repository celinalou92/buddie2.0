import decode from 'jwt-decode';

const AuthService = {
    getProfile() {
        return decode(this.getToken());
    },
    
    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token)? this.getProfile(token) : false;
    },

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    },
    
    getToken() {
        return localStorage.getItem('id_token');
    },
    
    handleLogin(idToken) {
       console.log("Logging in, saving token")
        localStorage.setItem('id_token', idToken);
    
        window.location.assign('/dashboard');
    },
    
    logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/login');
    },
};


export default AuthService;