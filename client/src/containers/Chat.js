import React from 'react';
import { DRow, DCol } from '../components/Container';
import DCard from '../components/Card';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const Board = styled(DCard)`
  height: 70px;
  padding: 6px;
  background-color: rgb(255, 255, 255, 0.9);
  margin: 10px 0;
`

const BoardBody = styled(DCard.Body)`
  padding: 6px;
  color: #333;
  font-weight: bold;
  font-size: 18px;
`

const Avatar = styled.p`
  border: 1px solid #000;
  border-radius: 50%;
  width: 100%;
  font-weight: bold;
  text-align: center;
  padding:10px;
`;

const Username = styled.div`
  font-weight: bold;
  margin-top: 10px;
`;

const Chat = ({ children, id}) => {

  
  return (
    <Board>
      <BoardBody>
        <DRow>
          <DCol xs={10}>
            <Username>{children}</Username>
          </DCol>
          <DCol xs={2}>
            <Link to={`/chat/${id}`}><span style={{fontSize: '28px', color: 'rgb(44, 130, 201)'}}>&#9658;</span></Link>
          </DCol>
        </DRow>
      </BoardBody>
    </Board>
  )
}

export default Chat;