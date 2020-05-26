import React, { useEffect, useState } from 'react';
import DCard from '../components/Card';
import { DRow, DCol } from '../components/Container';
import styled from 'styled-components';
import Chat from './Chat';

import { getAllUsers } from '../services/chat';
import { allChatSocket } from '../utils/socket';

const ChatContainer = styled(DCard)`
  padding: 5px;
  height: 60vh;
  overflow-y: scroll;
  overflow-x:hidden;
  &::-webkit-scrollbar {
    width: 6px;
    background-color: #F5F5F5;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgb(44, 130, 201, 0.8)
  }
}
`

const Chats = (props) => {

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalOnline, setTotalOnline] = useState(1);

  useEffect(() => {
    getAllUsers().then((users) => {
      setUsers(users);
      setIsLoading(false);
    })

    const { auth : { user } } = props;
    const chatsServices = allChatSocket();
    chatsServices.emit('new-connection', user);

    chatsServices.on('total-online', (count) => {
      setTotalOnline(count)
    });
    
  }, []);

  const AllUsers = users.map((user) => {
    return (
      <Chat key={user.id} id={user.id} >
        <p>{user.firstName} {user.lastName}</p>
      </Chat>)
  });

  const loading = <div style={{textAlign: 'center'}}> <img src={process.env.PUBLIC_URL+"/images/rings.svg"} width="150px" alt="loading" /> </div>;

  return (
    <>
      <h5>Total Online users : {totalOnline - 1} </h5>
      <hr />
      <ChatContainer>
        <DRow>
          <DCol md={12}>
            { isLoading ? loading : null}
            { users.length === 0 && !isLoading ? <h5 style={{textAlign: 'center'}}> No Users</h5> : AllUsers }
          </DCol>
        </DRow>
      </ChatContainer>
    </>
  )
}


export default Chats;