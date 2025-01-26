// const BASE_URL = "http://127.0.0.1:8000/api/";
const BASE_URL = "http://192.168.1.7/api/";
const LOGIN_URL = BASE_URL + "token/";
const NOTES_URL = BASE_URL + "notes/";
const REFRESH_URL = BASE_URL + "token/refresh/";
const LOGOUT_URL = BASE_URL + "logout/";
const AUTH_URL = BASE_URL + "authenticated/";
import axios from "axios";
export const login = async (username, password) => {
    try {
        const response = await fetch(LOGIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ username, password })
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Login failed');
        }
        const data = await response.json();
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh);
        return data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

export const get_notes = async () => {
    try {
        const accessToken = localStorage.getItem('access_token');
        const response = await fetch(NOTES_URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })
        return response.json();
    } catch (error) {
        console.error('Error fetching notes:', error);
        throw error;
    }
};
export const refresh_token = async () => {
    try {
        const response = await axios.post(REFRESH_URL, {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
    }
};

const refresh = async (error, func) => {
    if (error.response && error.response.status === 401) {
        try {
            const refreshData = await refresh_token();
            const retryResponse = await func();
            return retryResponse;
        } catch (refreshError) {
            console.error('Failed to refresh token:', refreshError);
            return false;
        }
    }
    return false;
};

export const logout = async () => {
    try {
        const response = await fetch(LOGOUT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        return true;
    }
    catch (error) {
        console.error('Error during logout:', error);
        return false;
    }

}

export const isAuthenticated = async () => {
    try {
        const accessToken = localStorage.getItem('access_token');
        const response = await fetch(AUTH_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            credentials: 'include',
        });

        if (!response.ok) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            return false;
        }

        const data = await response.json();
        if (data.authenticated) {
            return true;
        } else {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            return false;
        }
    } catch (error) {
        console.log('Error checking authentication:', error);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        return false;
    }
};

export const register = async (username, email, password) => {
    try {
        const response = await fetch(BASE_URL + 'register/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })

        })

        if (response.ok) {
            const res = await login(username, password);
            if (res) {
                localStorage.setItem('access_token', res.access_token);
                localStorage.setItem('refresh_token', res.refresh_token);
                return true;
            } else {
                throw new Error('Failed to login after registration');
            }
        }

    } catch (error) {
        console.error('Error during register:', error);
        return false;
    }
}