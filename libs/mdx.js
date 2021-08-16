import fs from 'fs'
import matter from 'gray-matter'
import mdxPrism from 'mdx-prism'
import path from 'path'
import readingTime from 'reading-time'
import { serialize } from 'next-mdx-remote/serialize';
import remarkAutolinkHeadings from 'remark-autolink-headings';
import remarkCodeTitles from 'remark-code-titles';
import remarkSlug from 'remark-slug';

import { MDXComponents } from '@/config/mdx';

export const BLOGS_PATH = path.join(process.cwd(), 'content', 'blogs');
export const PROJECTS_PATH = path.join(process.cwd(), 'content', 'projects');

export const getAllBlogSlugs = async () => {
  const postFolders = fs.readdirSync(path.join('content', 'blogs'));
  return postFolders;
}

export const getAllBlogs = async () => {
  const postFolders = fs.readdirSync(path.join('content', 'blogs'));

  const blogs = postFolders.map(postFolder => {
    const markdownWithMeta = fs.readFileSync(path.join('content', 'blogs', postFolder, 'index.mdx'), 'utf-8');
    const { data, content } = matter(markdownWithMeta);

    return {
      ...data,
      content,
      slug: postFolder,
    }
  });

  return blogs.sort((b1, b2) => Date.parse(b2) - Date.parse(b1));
}

export const getBlogBySlug = async (slug) => {
  const markdownWithMeta = fs.readFileSync(path.join('content', 'blogs', slug, 'index.mdx'), 'utf-8');
  const { data, content } = matter(markdownWithMeta);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [
        remarkAutolinkHeadings,
        remarkCodeTitles,
        remarkSlug,
      ],
      rehypePlugins: [mdxPrism]
    }
  });

  return {
    ...data,
    content,
    slug,
    wordCount: content.split(/\s+/gu).length,
    readingTime: readingTime(content),
    mdxSource
  }
}

export const getBlogsByTag = async (tag) => {
  const postFolders = fs.readdirSync(path.join('content', 'blogs'));

  const blogs = postFolders.map(postFolder => {
    const markdownWithMeta = fs.readFileSync(path.join('content', 'blogs', postFolder, 'index.mdx'), 'utf-8');
    const { data, content } = matter(markdownWithMeta);
    return {
      ...data,
      content,
      slug: postFolder,
    }
  }).filter(p => {
    console.log(p.tags)
    return p.tags.indexOf(tag.toLowerCase()) > -1;
  });

  return blogs;
}

export const getAllTags = async () => {
  const postFolders = fs.readdirSync(path.join('content', 'blogs'));
  let tags = [];
  postFolders.forEach(postFolder => {
    const markdownWithMeta = fs.readFileSync(path.join('content', 'blogs', postFolder, 'index.mdx'), 'utf-8');
    const { data } = matter(markdownWithMeta);
    tags = tags.concat(data.tags);
  });

  const reducedTagObj = tags.reduce((acc, it) => {
    if (acc[it]) acc[it] = acc[it] + 1;
    else acc[it] = 1;
    return acc;
  }, {});
  console.log(reducedTagObj);

  return Object.keys(reducedTagObj).map(key => ({ name: key, numOfBlogs: reducedTagObj[key] }))
}