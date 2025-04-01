import '@testing-library/jest-dom';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import Avatar from '../Avatar';

const mockProps = {
    src: 'https://ivory-persistent-gull-342.mypinata.cloud/ipfs/bafkreie2wjfoj6ysgppj7oolzfbkciinybmeemqoxegz7iav5da2qceoi4',
    size: '80px'
}

describe('Avatar', () => {

    afterEach(() => {
        cleanup(); // Cleans up DOM after each test
    });

    test('the user image should be displayed', async () => {
        
        render(<Avatar src={mockProps.src} size={mockProps.size} />)
        const imgElement = screen.getByRole('img');
        expect(imgElement).toBeInTheDocument();
    });

    test('uses the src given in the props', async () => {
        
        render(<Avatar src={mockProps.src} size={mockProps.size} />)

        const imgElement = screen.getByRole('img');
        expect(imgElement.src).toBe(mockProps.src);
    });

});