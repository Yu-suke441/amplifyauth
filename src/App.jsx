import React, {useEffect, useState } from 'react'
import './App.css';
import Amplify, {API, graphqlOperation} from 'aws-amplify';
import config from './aws-exports'
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react'
import {listUsers} from './graphql/queries'

Amplify.configure(config)

function App() {
  const [users, setUsers] = useState([])

useEffect(() => {
    fetchUsers();
  },[])

  const fetchUsers = async () => {
    try {
      const userData = await API.graphql(graphqlOperation(listUsers));
      const userList = userData.data.listUsers.items;
      console.log('user list', userList)
      setUsers(userList)
    } catch(error) {
      console.log('error on fetching users', error);

    }
  };


  return (
    <div className="App">
      <header className="App-header">

        <h2>My App Content</h2>
        <AmplifySignOut/>
        
      </header>
      <div className="userList">
        { users.map(user => {
          return (
            <table border="1">
              <tr>
                <th>名前</th>
                <th>詳細</th>
              </tr>
              <tr>
                <td>{user.name}</td>
                <td>{user.description}</td>
              </tr>
            </table>
            
          )
        })}
      </div>
    </div>
  );
}

export default withAuthenticator(App);
