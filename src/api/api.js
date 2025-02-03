// const BASE_URL = "http://127.0.0.1:8000/api/";
const BASE_URL = "http://192.168.1.7/api/";
const LOGIN_URL = BASE_URL + "token/";
const CREATE_URL = BASE_URL + "create/";
const DELETE_URL = BASE_URL + "delete/";
const EDIT_URL = BASE_URL + "edit/";
const NOTES_URL = BASE_URL + "notes/";
const REFRESH_URL = BASE_URL + "token/refresh/";
const LOGOUT_URL = BASE_URL + "logout/";
const AUTH_URL = BASE_URL + "authenticated/";
import axios from "axios";
import { ca } from "date-fns/locale";
import { revalidatePath } from "next/cache";

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
        const data = await response.json();
        // console.log('Note pushed:', data);
        return data;
        // return response.json();
    } catch (error) {
        console.error('Error fetching notes:', error);
        throw error;
    }
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

export const create_note = async (description) => {
    try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            throw new Error('Access token is missing');
        }
        const response = await fetch(CREATE_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ description })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error creating note: ${errorData.message || response.statusText}`);
        }

        const data = await response.json();
        return true;

    } catch (error) {
        console.error('Error creating note:', error);
        throw error;
    }
}


export const delete_note = async (id) => {
    try {
        const access_token = localStorage.getItem('access_token');
        const response = await fetch(DELETE_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${access_token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                id
            )
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.error || response.statusText}`);
        }
        const data = await response.json();
        return true;
    } catch (error) {
        console.error('Error deleting note:', error);
        return false;
    }
}


export const edit_note = async (id, description) => {
    try {
        const access_token = localStorage.getItem('access_token');
        const response = await fetch(BASE_URL + 'edit/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${access_token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                description: description
            }
            )
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.error || response.statusText}`);
        }
        const data = await response.json();
        return true;

    } catch (error) {
        console.error('Error editing note:', error);
        throw error;
    }
}