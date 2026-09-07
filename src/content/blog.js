/**
 * Add posts here. Each post renders at /blog/:slug.
 * Keep `published: false` to hide a draft.
 */
export const posts = [
  // {
  //   slug: 'first-post',
  //   title: 'Example post',
  //   date: '2026-09-01',
  //   excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  //   published: true,
  //   content: [
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  //     'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  //   ],
  // },
];

export const blogMeta = {
  headline: 'Notes',
  kicker: 'Field notes, later',
  emptyTitle: 'Nothing in orbit yet',
  emptyBody:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Posts added in src/content/blog.js will appear here.',
};

export function getPublishedPosts() {
  return posts
    .filter((post) => post.published !== false)
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug);
}
