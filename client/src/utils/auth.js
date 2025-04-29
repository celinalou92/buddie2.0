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
            return decoded.exp < Date.now() / 1000;
        } catch (err) {
            console.error("Failed to decode token:", err)
            return true;
        }
    },
    
    getToken() {
        return localStorage.getItem('id_token');
    },
    
    handleLogin(idToken) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/dashboard');
    },
    
    logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/login');
    },
};


export default AuthService;