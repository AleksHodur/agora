import './Login.css';
import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';

function Login () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isPending } = useLogin();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    }

    return ( 
        <form className='auth-form' onSubmit={handleSubmit}>
            <h2>Log in</h2>
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

            {error && (
                <div className='error'>
                    { error }
                </div>
            )}

            {!isPending &&<button className="btn">Log in</button>}
            {isPending &&<button className="btn" disabled>Loading...</button>}

        </form>
     );
}

export default Login ;