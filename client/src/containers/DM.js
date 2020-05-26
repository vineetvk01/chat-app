import React, { useEffect, useState, useRef } from 'react';
import DCard from '../components/Card';
import { DRow, DCol } from '../components/Container';
import styled from 'styled-components';
import Text from './Text';

import { getUserById } from '../services/chat';
import { Redirect, Link } from 'react-router-dom';

import { allChatSocket, dmChatSocket } from '../utils/socket';

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
`;

const UserContainer = styled(DCard)`
  padding: 8px;
`;

const InputArea = styled(DCard)`
  padding: 0px;
`;

const UserName = styled.h4`
  padding: 0;
  margin: 0;
`;

const Status = styled.p`
  padding: 0;
  margin: 0;
`;

let canSend = true;

const DM = (props) => {

  const { auth } = props;
  const [user, setUser] = useState({});
  const [ connection, setConnection ] = useState('X');
  const bottom = useRef(null);
  const [status, setStatus] = useState({ color: 'red', text: 'Offline' });
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading ] = useState(true);

  const [threads, setThreads] = useState([]);

  const allChatServices = allChatSocket();
  const dmChatServices = dmChatSocket();

  let typingRefresh;

  useEffect(() => {
    const userid = props.match.params.userid;
    if (!userid || userid.length < 5) {
      return <Redirect to='/' />
    }

    getUserById(userid).then(user => {
      setUser(user);
    });



    allChatServices.emit('is-user-online', userid);

    allChatServices.on(`user-online-status`, ({ id, status }) => {
      if (id === userid) {
        if (status) {
          setStatus({ color: 'green', text: 'Online' });
        } else {
          setStatus({ color: 'red', text: 'Offline' });
        }
      }
    });

    dmChatServices.emit('connect-chat-room', { fromId: auth.user.id, toId: userid});
    dmChatServices.on('chat-room-connected', (data) => {
      setConnection('Y');
    });

    dmChatServices.on('user-typing', ({id, status})=>{
      if(id === userid && status){
        clearTimeout(typingRefresh);
        setStatus({ color: 'white', text: 'typing....' });
        typingRefresh = setTimeout(()=>allChatServices.emit('is-user-online', userid), 2000);
      }
    })

    dmChatServices.on('new-message', (message) => {
      setThreads((threads) => {
        const update = [...threads];
        update.push(message)
        return update;
      });
      if(message.fromId !== userid){
        scrollToBottom();
      }else{
        console.log('Going to mark as Read');
        dmChatServices.emit('mark-as-read', {fromId: auth.user.id, toId: userid} )
      }
    });

    dmChatServices.emit('fetch-latest', { fromId: auth.user.id, toId: userid});
    dmChatServices.on('fetched-latest', (messages)=>{
      setThreads(messages);
      setIsLoading(false);
      setTimeout(scrollToBottom,1000);
      dmChatServices.emit('mark-as-read', {fromId: auth.user.id, toId: userid} )
    });

    dmChatServices.on('mark-as-read',({readByUserId})=>{
      setThreads((threads) => {
        const updates = [...threads];
        updates.forEach((thread)=>{
          thread.seenBy[readByUserId] = 1;
        })
        return updates;
      });
    })

    return () => {
      dmChatServices.off('new-message');
    }

  }, []);

  //Throttling the event
  
  const handleKeyUp = (e) => {
    if(canSend){
      dmChatServices.emit('user-typing', { fromId: auth.user.id, toId: props.match.params.userid }  );
      canSend = false;
      setTimeout(()=>{canSend = true}, 2000);
    }
  }

  const handleChange = (e) => {
    setMessage(e.currentTarget.value);
  }

  const handleSend = (e) => {
    const messageObj = {
      type: 'text',
      data: {
        message,
      },
      fromId: auth.user.id,
      toId: props.match.params.userid
    }
    dmChatServices.emit('new-message', messageObj);
    setMessage('');
  }

  const scrollToBottom = () => {
    if(bottom.current == null) return;
    bottom.current.scrollIntoView({ behavior: "smooth" });
  }

  const loading = <div style={{ textAlign: 'center' }}> <img src={process.env.PUBLIC_URL + "/images/rings.svg"} width="150px" alt="loading" /> </div>;

  return (
    <>
      <UserContainer>
        <DRow>
          <DCol xs={1}>
            <Link to='/'><span style={{ fontSize: '28px' }}>&#9668;</span></Link>
          </DCol>
          <DCol xs={10}>
            <UserName>{user.firstName} {user.lastName}</UserName>
            <Status> <span style={{ color: status.color, fontSize: '24px' }}>&#9679;</span> {status.text} </Status>
          </DCol>
          <DCol xs={1}>
            {connection}
          </DCol>
        </DRow>
      </UserContainer>
      <hr />
      <ChatContainer>
        <DRow>
          <DCol md={12}>
            {isLoading === true ? loading : null }
            {threads.map((thread)=>{
              return(
                <Text key={thread.id} sentBy={thread.fromId} sentTo={user.id} sender={thread.fromId === auth.user.id ? 'you' : user.firstName} seenBy={thread.seenBy} {...props}>
                  <span>{thread.data.text}</span>
                </Text>
              )
            })}
            <div style={{ float: "left", clear: "both",}}
              ref={bottom}>
            </div>
          </DCol>
        </DRow>
      </ChatContainer>
      <InputArea>
        <DRow>
          <DCol xs={10}>
            <textarea style={{ border: 'none', width: '100%', height: '100%' }} onChange={handleChange} onKeyUp={handleKeyUp} value={message}></textarea>
          </DCol>
          <DCol xs={2}>
            <div style={{ fontSize: '18px', fontWeight: 'bold', paddingTop: '15px', cursor: 'pointer' }} onClick={handleSend}>SEND</div>
          </DCol>
        </DRow>

      </InputArea>
    </>
  )
}


export default DM;