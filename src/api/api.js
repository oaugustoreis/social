const BASE_URL = "http://127.0.0.1:8000/api/";
const LOGIN_URL = BASE_URL + "token/";
const NOTES_URL = BASE_URL + "notes/";
const REFRESH_URL = BASE_URL + "token/refresh/";
const LOGOUT_URL = BASE_URL + "logout/";
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
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
        return data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

export const get_notes = async () => {
    try {
        const response = await axios.get(NOTES_URL, { withCredentials: true });
        return response.data;
    } catch (error) {
        return await refresh(error, get_notes);
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
    }
    catch (error) {
        console.error('Error during logout:', error);
    }

}