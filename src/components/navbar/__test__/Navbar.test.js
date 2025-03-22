import '@testing-library/jest-dom';
import { act } from 'react';
import { render, screen, cleanup, renderHook } from '@testing-library/react';
import Navbar from '../Navbar';
import { AuthContext, AuthContextProvider } from '../../../context/AuthContext';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { useLogout } from '../../../hooks/useLogout';

const MockNavbar = () => {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Navbar />
            </AuthContextProvider>
        </BrowserRouter>
    );
}

const MockAuthContextProviderWithUser = ({ children }) => {
    const mockUser = {
        email: 'user@mail.com'
    }

    return (
        <AuthContext.Provider value={{ user: mockUser }}>
            { children }
        </AuthContext.Provider>
    );
}

const MockNavbarWithUser = () => {
    return (
        <BrowserRouter>
            <MockAuthContextProviderWithUser>
                <Navbar />
            </MockAuthContextProviderWithUser>
        </BrowserRouter>
    );
}

jest.mock('../../../hooks/useLogout');

describe('Navbar', () => {

    afterEach(() => {
        cleanup(); // Cleans up DOM after each test
    });

    //No user tests

    test('if there is no user, Login button should be available', async () => {
        
        useLogout.mockReturnValue({
            logout: jest.fn(),
            isPending: false
        });
        
        await act( async () => {
            render(<MockNavbar />)
        });

        const loginButton = screen.getByRole('link', { name: /login/i });
        expect(loginButton).toBeInTheDocument();
    });

    test('if there is no user, Signup button should be available', async () => {
        
        useLogout.mockReturnValue({
            logout: jest.fn(),
            isPending: false
        });
        
        await act( async () => {
            render(<MockNavbar />)
        });

        const signupButton = screen.getByRole('link', { name: /signup/i });
        expect(signupButton).toBeInTheDocument();
    });

    test('if there is no user, Logout button should not be available', async () => {
        
        useLogout.mockReturnValue({
            logout: jest.fn(),
            isPending: false
        });
        
        await act( async () => {
            render(<MockNavbar />)
        });

        const logoutButton = screen.queryByRole('button', { name: /logout/i });
        expect(logoutButton).toBeNull();
    });

    //User tests

    test('if there is a user logged in and there is not a logout pending, ' + 
        'Logout button should be available', async () => {

        useLogout.mockReturnValue({
            logout: jest.fn(),
            isPending: false
        });

        await act( async () => {
            render(<MockNavbarWithUser />)
        });

        const logoutButton = screen.getByRole('button', { name: /logout/i });
        expect(logoutButton).toBeInTheDocument();
    });

    test('if there is a user logged in and there is a logout pending, ' + 
        'Logging out message should be visible', async () => {

        useLogout.mockReturnValue({
            logout: jest.fn(),
            isPending: true
        });

        await act( async () => {
            render(<MockNavbarWithUser />)
        });

        const pendingButton = screen.getByRole('button', { name: /logging out.../i });
        expect(pendingButton).toBeDisabled();
    });

    test('if there is a user logged in and there is not a logout pending, ' + 
        'Logging out message should not be visible', async () => {

        useLogout.mockReturnValue({
            logout: jest.fn(),
            isPending: false
        });

        await act( async () => {
            render(<MockNavbarWithUser />)
        });

        const pendingButton = screen.queryByRole('button', { name: /logging out.../i });
        expect(pendingButton).toBeNull();
    });

    test('if there is a user logged in and there is a logout pending, ' + 
        'Logout button should not be available', async () => {

        useLogout.mockReturnValue({
            logout: jest.fn(),
            isPending: true
        });

        await act( async () => {
            render(<MockNavbarWithUser />)
        });

        const logoutButton = screen.queryByRole('button', { name: /logout/i });
        expect(logoutButton).toBeNull();
    });

    test('if there is a user logged in, Login button should not be available', async () => {
        
        useLogout.mockReturnValue({
            logout: jest.fn(),
            isPending: false
        });
        
        await act( async () => {
            render(<MockNavbarWithUser />)
        });

        const loginButton = screen.queryByRole('link', { name: /login/i });
        expect(loginButton).toBeNull();
    });

    test('if there is a user logged in, Signup button should not be available', async () => {
        
        useLogout.mockReturnValue({
            logout: jest.fn(),
            isPending: false
        });
        
        await act( async () => {
            render(<MockNavbarWithUser />)
        });

        const signupButton = screen.queryByRole('link', { name: /signup/i });
        expect(signupButton).toBeNull();
    });

});