import './ProjectComments.css';
import { useState } from 'react';
import { timestamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import Avatar from '../avatar/Avatar';
import { formatDistanceToNow } from 'date-fns';
import { firestoreDateToJSDate } from '../../helpers/converters';

function ProjectComments({ project }) {
    const { updateDocument, response } = useFirestore('projects');
    const [newComment, setNewComment] = useState('');
    const { user } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const commentObject = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: newComment,
            createdAt: timestamp.fromDate(new Date()),
            id: Math.random()
        }

        console.log(commentObject);

        await updateDocument(project.id, {
            comments: [...project.comments, commentObject]
        });

        if(!response.error){
            setNewComment('');
        }else{
            console.log(response.error);
        }
    }

    return ( 
        <div className='project-comments'>
            <h4>Project Comments</h4>

            <ul>
                {project.comments.length > 0 && project.comments.map(comment => (
                    <li key={comment.id}>
                        <div className="comment-author">
                            <Avatar src={comment.photoURL} />
                            <p>{ comment.displayName }</p>
                        </div>

                        <div className="comment-date">
                            <p>{ formatDistanceToNow(firestoreDateToJSDate(comment.createdAt), { addSuffix: true }) }</p>
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