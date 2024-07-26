"use client"

import { useState, useCallback, useEffect } from 'react';
import appwriteService from './auth.lib'; // Ensure this is the correct path to your Appwrite service
// Auth for Client Side
interface UseAppwriteReturn {
    createUser: (email: string, password: string, name: string) => void;
    login: (email: string, password: string) => void;
    logout: () => void;
    getCurrentUser: () => void;
    isLoggedIn: boolean;
    loading: boolean;
    error: string | null;
    user: any; // You can define a more specific user type if needed
}



/**
 * @description Auth hook for client side
 * @returns all the auth for client side
 */
export function useAppwrite(): UseAppwriteReturn {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);

    // Create a user account
    const createUser = useCallback(async (email: string, password: string, name: string) => {
        setLoading(true);
        setError(null);
        try {
            const userAccount = await appwriteService.createUserAccount({ email, password, name });
            setUser(userAccount);
            setIsLoggedIn(true);
        } catch (err: any) {
            setError(err.message || 'An error occurred while creating the user account.');
            console.error('Error creating user:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Login function
    const login = useCallback(async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const session = await appwriteService.login({ email, password });
            setUser(session);
            setIsLoggedIn(true);
        } catch (err: any) {
            setError(err.message || 'An error occurred while logging in.');
            console.error('Error logging in:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Logout function
    const logout = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            await appwriteService.logout();
            setUser(null);
            setIsLoggedIn(false);
        } catch (err: any) {
            setError(err.message || 'An error occurred while logging out.');
            console.error('Error logging out:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Check current user status
    const getCurrentUser = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const currentUser = await appwriteService.getCurrentUser();
            setUser(currentUser);
            setIsLoggedIn(Boolean(currentUser));
        } catch (err: any) {
            setError(err.message || 'An error occurred while fetching the current user.');
            console.error('Error fetching current user:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getCurrentUser(); // Fetch current user on mount
    }, [getCurrentUser]);

    return {
        createUser,
        login,
        logout,
        getCurrentUser,
        isLoggedIn,
        loading,
        error,
        user,
    };
}
