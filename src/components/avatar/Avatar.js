import './Avatar.css';

function Avatar ({ src }) {
    return ( 
        <div className="avatar">
            <img src={src} alt="" />
        </div>
     );
}

export default Avatar ;