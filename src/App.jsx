import React, {useEffect, useState } from 'react'
import './App.css';
import Amplify, {API, graphqlOperation} from 'aws-amplify';
import config from './aws-exports'
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react'
import {listUsers} from './graphql/queries'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

Amplify.configure(config)

function App() {
  const [users, setUsers] = useState([])

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  const classes = useStyles();


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

      <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">名前</TableCell>
            <TableCell align="right">詳細</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.name}>
              <TableCell component="th" scope="row">
                {user.id}
              </TableCell>
              <TableCell align="right">{user.name}</TableCell>
              <TableCell align="right">{user.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

export default withAuthenticator(App);
