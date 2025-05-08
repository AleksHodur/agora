import './ProjectComments.css';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import Avatar from '../avatar/Avatar';
import { formatDistanceToNow } from 'date-fns';
import { firestoreDateToJSDate } from '../../helpers/converters';
import { useSessionStorage } from '../../hooks/useSessionStorage';

function ProjectComments({ project }) {
    const [comments, setComments] = useState(project.comments || []);
    const [newComment, setNewComment] = useState('');
    const { user } = useAuthContext();
    const { addComment, getFirestoreCommentsByProjectId, addFirestoreComment } = useSessionStorage();

    useEffect(() => {
        if(!project.sessionProject) {
            let sessionComments = getFirestoreCommentsByProjectId(project.id);

            if(sessionComments && sessionComments !== null) {
                setComments([...comments, ...sessionComments.comments])
            }
        }
    }, [project]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const commentObject = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: newComment,
            createdAt: new Date(),
            id: Math.random(),
            sessionComment: true
        }

        if (project.sessionProject) {

            addComment(project.id, commentObject);
            setComments([...comments, commentObject]);
            
        } else {

            addFirestoreComment(project.id, commentObject);
            setComments([...comments, commentObject]);
        }

        setNewComment('');
    }

    return ( 
        <div className='project-comments'>
            <h4>Project Comments</h4>

            <ul>
                {comments.length > 0 && comments.map(comment => (
                    <li key={comment.id}>
                        <div className="comment-author">
                            <Avatar src={comment.photoURL} />
                            <p>{ comment.displayName }</p>
                        </div>

                        <div className="comment-date">
                            { !comment.sessionComment && <p>{ formatDistanceToNow(firestoreDateToJSDate(comment.createdAt), { addSuffix: true }) }</p>}
                            { comment.sessionComment && <p>{ formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true }) }</p>}
                        </div>

                        <div className="comment-content">
                            <p>{ comment.content }</p>
                        </div>
                    </li>
                ))}
            </ul>

            <form className='add-comment' onSubmit={ handleSubmit }>
                <label>
                    <span>Add new comment:</span>
                    <textarea
                        required
                        onChange={(e) => setNewComment(e.target.value)}
                        value={ newComment }
                    ></textarea>
                </label>
                <button className="btn">Add comment</button>
            </form>
        </div>
     );
}

export default ProjectComments;