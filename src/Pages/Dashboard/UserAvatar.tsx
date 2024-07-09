import React from 'react';
import Avatar from '@mui/material/Avatar';

interface UserAvatarProps {
  imageUrl: string; // Specify the type of imageUrl as string
}

const UserAvatar: React.FC<UserAvatarProps> = ({ imageUrl }) => {
  return (
    <Avatar alt="User Avatar" src={imageUrl} />
  );
};

export default UserAvatar;
