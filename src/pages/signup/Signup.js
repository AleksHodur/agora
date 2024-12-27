import { useState } from 'react';

//styles
import './Signup.css';
import { useSignup } from '../../hooks/useSignup';

function Signup () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailError, setThumbnailError] = useState(null);
    const { signup, error: signupError, isPending } = useSignup();

    const handleFileChange = (e) => {
        setThumbnail(null);
        let selected = e.target.files[0]; //first file selected
        console.log(selected);

        if(!selected){
            setThumbnailError('Please select a file');
            return;
        }
        if(!selected.type.includes('image')){
            setThumbnailError('Selected file must be an image');
            return;
        }
        if(selected.size > 100000){
            setThumbnailError('Image file size must be less than 100kb');
            return;
        }

        setThumbnailError(null);
        setThumbnail(selected);
        console.log('thumbnail updated');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password, displayName, thumbnail);
        signup(displayName, email, password, thumbnail);
    }

    return ( 
        <form className='auth-form' onSubmit={handleSubmit}>
            <h2>Signup</h2>
            <label>
                <span>Email: </span>
                <input
                required
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                />
            </label>

            <label>
                <span>Password: </span>
                <input
                required
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                />
            </label>

            <label>
                <span>Display name: </span>
                <input
                required
                type="display name"
                onChange={(e) => setDisplayName(e.target.value)}
                value={displayName}
                />
            </label>

            <label>
                <span>Profile thumbnail: </span>
                <input
                required
                type="file"
                onChange={handleFileChange}
                />
            </label>

            {thumbnailError && (
                <div className='error'>
                    { thumbnailError }
                </div>
            )}

            {signupError && (
                <div className='error'>
                    { signupError }
                </div>
            )}

            {!isPending &&<button className="btn">Sign up</button>}
            {isPending &&<button className="btn" disabled>Loading...</button>}

        </form>
     );
}

export default Signup ;