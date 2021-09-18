/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import '../assets/index.css';
import { FeedPage } from '../feed/FeedPage';

export default {
  title: 'Feed Page',
  component: FeedPage,
};

const PageTemplate = (args) => (
  <BrowserRouter>
    <FeedPage {...args} />
  </BrowserRouter>
);

export const DefaultFeedPage = PageTemplate.bind({});
DefaultFeedPage.args = {
  auth: {
    username: 'test',
    token: 'fake-token',
    refresh_token: 'refreshToken',
  },
  posts: [
    {
      post: {
        id: 1,
        username: 'imtom',
        content: {
          latitude: -27.476875493160236,
          longitude: 153.02841213226316,
          reaction: '📚',
          title: 'QUT',
          type: 'map',
        },
        created_at: '2021-09-14T21:31:36.915178+10:00',
        updated_at: '2021-09-14T21:31:36.915178+10:00',
        active: true,
      },
      comments: [
        {
          id: 1,
          post_id: 1,
          username: 'imtom',
          message: '😀',
          created_at: '2021-09-14T21:31:52.184325+10:00',
          updated_at: '2021-09-14T21:31:52.184325+10:00',
          active: true,
        },
      ],
      emoji_count: '😀',
      self_emoji_count: '😀',
      likes: [
        {
          id: 1,
          post_id: 1,
          username: 'imtom',
          created_at: '2021-09-14T21:31:48.673033+10:00',
          updated_at: '2021-09-14T21:31:48.673033+10:00',
          active: true,
        },
      ],
    },
  ],
  page: 0,
  loadPosts: () => [],
  likePost: () => [],
  commentPost: () => [],
  unlikePost: () => [],
  finished: false,
  errors: null,
};
