import React from 'react';
import {
  Image,
} from 'semantic-ui-react';
import createProfileLink from '../utils/createProfileLink';

const Avatar = ({ username, name }) => (
  <Image
    src={createProfileLink(username)}
    className={name}
    avatar
  />
);

export default Avatar;
