import React from 'react';

const UserInfo = (props) => {
  const { user } = props;

  return (
    <>
      <div className='user-info'>
        <h2>{user.firstName} {user.lastName} <br /><img src="./images/place.svg" width="20" alt="location" /><span> {user.location}</span></h2>
      </div>
    </>
  )

}

export default UserInfo;