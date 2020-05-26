import React from 'react';
import DCard from '../components/Card'; 
import styled from 'styled-components';

const Board = styled(DCard)`
  width: 150px;
  height: 150px;
  padding: 6px;
  background-color: rgb(255,165,0, 0.9);
`

const BoardBody = styled(DCard.Body)`
  padding: 6px;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
`

const Settings = (props) => {
  return (
    <>
    <h5>Your Boards :</h5>
    <Board>
      <BoardBody>
        First
            </BoardBody>
    </Board>
    </>
  )
}


export default Settings;