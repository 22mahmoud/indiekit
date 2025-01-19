import * as dotenv from 'dotenv';
dotenv.config();

import { getPostTemplate } from './src/post-template.js';

export default {
  plugins: [
    '@indiekit/store-github',
    '@indiekit/syndicator-mastodon',
    '@maw.sh/keywords-input',
    '@maw.sh/template-input',
  ],
  '@indiekit/store-file-system': {
    directory: '/blog',
  },
  '@indiekit/store-github': {
    user: '22mahmoud',
    repo: 'maw.sh',
    branch: 'master',
  },
  '@indiekit/syndicator-mastodon': {
    url: 'https://fosstodon.org',
    user: '22mahmoud',
  },
  '@indiekit/post-type-article': {
    fields: {
      name: { required: true },
      template: {
        value: 'blog',
      },
      summary: {},
      content: { required: true },
      category: {},
      keywords: {},
      geo: {},
      'post-status': {},
      published: { required: true },
      visibility: {},
    },
  },
  '@indiekit/post-type-note': {
    fields: {
      content: { required: true },
      template: {
        value: 'thought',
      },
      category: {},
      keywords: {},
      geo: {},
      'post-status': {},
      published: { required: true },
      visibility: {},
    },
  },
  publication: {
    me: 'https://maw.sh',
    postTemplate: getPostTemplate,
    postTypes: {
      note: {
        name: 'Thoughts',
        post: {
          path: 'src/thoughts/{t}/index.md',
          url: 'thoughts/{t}',
        },
        media: {
          path: 'src/thoughts/{t}/{filename}',
        },
      },
      article: {
        name: 'Blog',
        post: {
          path: 'src/blog/{slug}/index.md',
          url: 'blog/{slug}',
        },
        media: {
          path: 'src/blog/{slug}/{filename}',
        },
      },
    },
  },
};
