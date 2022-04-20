import React, {useState, useEffect} from 'react';

function Users() {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        fetch('/users/getUsers')
        .then((res => {
            if(res.ok) {
                return res.json();
            }
        }))
        .then(jsonRes => setUsers(jsonRes));
    }, []) //empty array passed as second argument to useEffect can be used to tell the hook to run at least once without causing infinite loop
    console.log(users);

 
     
    return (
        <div className='testScss'>
            {users.map((user) =>
                <li key={user.user_id}>{user.username}</li>
            )}
        </div>
    )
}

    

export default Users;
