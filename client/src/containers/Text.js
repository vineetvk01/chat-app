import React from 'react';
import { DRow, DCol } from '../components/Container';
import DCard from '../components/Card';
import styled from 'styled-components';


const Board = styled(DCard)`
  padding: 6px;
  background-color: rgb(255, 255, 255, 0.9);
  margin: 10px 0;
`

const BoardBody = styled(DCard.Body)`
  padding: 6px;
  color: #333;
  font-size: 15px;
`

const Sender = styled.p`
  margin: 0;
  padding: 0;
  color: #999;
`;

const NotSeen = styled.span`
  color: grey;
  font-size: 18px;
`;

const Seen = styled.span`
  color: blue;
  font-size: 18px;
`;

const notSeen = <NotSeen> &#10003;<span style={{fontSize: '10px'}}>Sent</span> </NotSeen>;
const seen = <Seen> &#10003;<span style={{fontSize: '10px'}}>Read</span> </Seen>;

const Text = ({ sender, children, seenBy, sentBy, sentTo, auth }) => {

  const myId = auth.user.id;

  return (
    <>
      <Board>
        <BoardBody>
          <Sender>{sender}</Sender>
          <DRow>
            <DCol xs={10}>
              {children}
            </DCol>
            <DCol xs={2}>
              { myId === sentBy ? (( !seenBy[sentTo] || seenBy[sentTo] === 0 ) ? notSeen : seen ) : null }
            </DCol>
          </DRow>
        </BoardBody>
      </Board>
    </>
  )
}

export default Text;