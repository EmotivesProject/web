import React from 'react';
import {
  Image,
} from 'semantic-ui-react';
import createProfileLink from '../utils/createProfileLink';

const Avatar = ({ username, name }) => (
  <Image
    src={createProfileLink(username)}
    className={name}
    aria-label="Avatar profile picture"
    alt-text={`Avatar profile picture ${username}`}
    avatar
  />
);

export default Avatar;
