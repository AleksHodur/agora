import '@testing-library/jest-dom';
import { act } from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Sidebar from '../Sidebar';
import { AuthContext } from '../../../context/AuthContext';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

const MockAuthContextProviderUserWithPhoto = ({ children }) => {
    const mockUser = {
        email: 'user@mail.com',
        photoURL: 'https://ivory-persistent-gull-342.mypinata.cloud/ipfs/bafkreie2wjfoj6ysgppj7oolzfbkciinybmeemqoxegz7iav5da2qceoi4'
    }

    return (
        <AuthContext.Provider value={{ user: mockUser }}>
            { children }
        </AuthContext.Provider>
    );
}

const MockAuthContextProviderUserNoPhoto = ({ children }) => {
    const mockUser = {
        email: 'user@mail.com'
    }

    return (
        <AuthContext.Provider value={{ user: mockUser }}>
            { children }
        </AuthContext.Provider>
    );
}

const MockSidebarUserWithPhoto = () => {
    return (
        <BrowserRouter>
            <MockAuthContextProviderUserWithPhoto>
                <Sidebar />
            </MockAuthContextProviderUserWithPhoto>
        </BrowserRouter>
    );
}

const MockSidebarUserNoPhoto = () => {
    return (
        <BrowserRouter>
            <MockAuthContextProviderUserNoPhoto>
                <Sidebar />
            </MockAuthContextProviderUserNoPhoto>
        </BrowserRouter>
    );
}

describe('Sidebar', () => {

    afterEach(() => {
        cleanup(); // Cleans up DOM after each test
    });

    //Avatar component

    test('if there is a user photoURl, the Avatar component should be displayed', async () => {
        
        await act( async () => {
            render(<MockSidebarUserWithPhoto />)
        });

        const avatarComponent = document.getElementsByClassName('avatar')[0];
        expect(avatarComponent).toBeInTheDocument();
    });

    test('if there is a user photoURl, there is only one avatar component displayed', async () => {
        
        await act( async () => {
            render(<MockSidebarUserWithPhoto />)
        });

        const avatarComponents = document.getElementsByClassName('avatar');
        expect(avatarComponents.length).toBe(1);
    });

    test('if there is no user photoURl, the avatar component should not be displayed', async () => {
        
        await act( async () => {
            render(<MockSidebarUserNoPhoto />)
        });

        const avatarComponents = document.getElementsByClassName('avatar');
        expect(avatarComponents.length).toBe(0);
    });

    //Dashboard link

    test('the dashboard link is available', async () => {
        
        await act( async () => {
            render(<MockSidebarUserWithPhoto />)
        });

        const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
        expect(dashboardLink).toBeInTheDocument();
    });

    test('the dashboard icon img element is displayed', async () => {
        
        await act( async () => {
            render(<MockSidebarUserWithPhoto />)
        });

        const dashboardIcon = screen.getByAltText('dashboard icon');
        expect(dashboardIcon).toBeInTheDocument();
    });

    test('the dashboard icon with the right src is displayed', async () => {
        
        await act( async () => {
            render(<MockSidebarUserWithPhoto />)
        });

        const dashboardIcon = screen.getByAltText('dashboard icon');
        expect(dashboardIcon.src).toBe('http://localhost/dashboard_icon.svg');
    });

    test('directs to the Dashboard page when the Dashboard link is clicked', async () => {

        await act( async () => {
            render(<MockSidebarUserWithPhoto />);
        });

        const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
        fireEvent.click(dashboardLink);
        expect(window.location.pathname).toBe("/");

    });

    //Create link

    test('the add link is available', async () => {
        
        await act( async () => {
            render(<MockSidebarUserWithPhoto />)
        });

        const addLink = screen.getByRole('link', { name: /new project/i });
        expect(addLink).toBeInTheDocument();
    });

    test('the add icon img element is displayed', async () => {
        
        await act( async () => {
            render(<MockSidebarUserWithPhoto />)
        });

        const addIcon = screen.getByAltText('add icon');
        expect(addIcon).toBeInTheDocument();
    });

    test('the add icon with the right src is displayed', async () => {
        
        await act( async () => {
            render(<MockSidebarUserWithPhoto />)
        });

        const addIcon = screen.getByAltText('add icon');
        expect(addIcon.src).toBe('http://localhost/add_icon.svg');
    });

    test('directs to the Create page when the New project link is clicked', async () => {

        await act( async () => {
            render(<MockSidebarUserWithPhoto />);
        });

        const createLink = screen.getByRole('link', { name: /new project/i });
        fireEvent.click(createLink);
        expect(window.location.pathname).toBe("/create");

    });

});