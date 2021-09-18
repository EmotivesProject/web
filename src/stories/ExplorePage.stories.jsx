/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import '../assets/index.css';
import { ExplorePage } from '../explore/ExplorePage';

export default {
  title: 'Explore Page',
  component: ExplorePage,
};

const PageTemplate = (args) => (
  <BrowserRouter>
    <ExplorePage {...args} />
  </BrowserRouter>
);

export const DefaultExplorePage = PageTemplate.bind({});
DefaultExplorePage.args = {
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
  fetchPost: () => [],
  commentPost: () => [],
  unlikePost: () => [],
  createPost: () => [],
  finished: false,
  errors: null,
};
