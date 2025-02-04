import './Create.css';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useCollection } from '../../hooks/useCollection';

const categories = [
    { value: 'development', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' }
];

function Create () {
    const { documents } = useCollection('users');
    const [users, setUsers] = useState([]);

    //form field values
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('');
    const [assignedUsers, setAssignedUsers] = useState([]);

    useEffect(() => {
        if(documents){
            const options = documents.map(user => {
                return { value: user, label: user.displayName }
            })
            setUsers(options);
        }
    }, [documents]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, details, dueDate, category, assignedUsers);
    }

    return ( 
        <div className='create-form'>
            <h2 className="page-title">Create a new project</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Project name:</span>
                    <input
                    required
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    />
                </label>

                <label>
                    <span>Details:</span>
                    <textarea
                    required
                    type="text"
                    onChange={(e) => setDetails(e.target.value)}
                    value={details}
                    >
                    </textarea>
                </label>

                <label>
                    <span>Due date:</span>
                    <input
                    required
                    type="date"
                    onChange={(e) => setDueDate(e.target.value)}
                    value={dueDate}
                    />
                </label>

                <label>
                    <span>Project category</span>
                    <Select
                        onChange={(option) => setCategory(option)}
                        options={ categories }
                    />
                </label>

                <label>
                    <span>Assign user:</span>
                    <Select
                        onChange={(option) => setAssignedUsers(option)}
                        options={ users }
                        isMulti
                    />
                </label>

                <button className="btn">Add Project</button>
            </form>
        </div>
     );
}

export default Create ;