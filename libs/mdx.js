import fs from 'fs'
import matter from 'gray-matter'
import mdxPrism from 'mdx-prism'
import path from 'path'
import readingTime from 'reading-time'
import { serialize } from 'next-mdx-remote/serialize';
import remarkAutolinkHeadings from 'remark-autolink-headings';
import remarkCodeTitles from 'remark-code-titles';
import remarkSlug from 'remark-slug';
import { CONTENT_TYPE } from '@/src/constants/enum'

export const BLOGS_PATH = path.join(process.cwd(), 'content', 'blogs');
export const PROJECTS_PATH = path.join(process.cwd(), 'content', 'projects');

const getDirPath = (type) => {
  let dirPath;
  if (type == CONTENT_TYPE.BLOGS) dirPath = BLOGS_PATH;
  else if (type == CONTENT_TYPE.PROJECTS) dirPath = PROJECTS_PATH;
  return dirPath;
}

export const readAllPostSlugs = async (type) => {
  const dirPath = getDirPath(type);
  return fs.readdirSync(dirPath);
}

export const readAllPosts = async (type) => {
  let dirPath = getDirPath(type);

  const folderNameList = fs.readdirSync(dirPath);

  const posts = folderNameList.map(slug => {
    const markdownWithMeta = fs.readFileSync(path.join(dirPath, slug, 'index.mdx'), 'utf-8');
    const { data } = matter(markdownWithMeta);
    return {
      ...data,
      slug,
    }
  });

  console.log(posts);

  return posts.sort((b1, b2) => Date.parse(b2) - Date.parse(b1));
}

export const readPostBySlug = async (type, slug) => {
  let dirPath = getDirPath(type);

  const markdownWithMeta = fs.readFileSync(path.join(dirPath, slug, 'index.mdx'), 'utf-8');
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

export const readPostsByTag = async (type, tag) => {
  const dirPath = getDirPath(type);
  const folderNameList = fs.readdirSync(dirPath);
  const posts = folderNameList.map(slug => {
    const markdownWithMeta = fs.readFileSync(path.join(dirPath, slug, 'index.mdx'), 'utf-8');
    const { data } = matter(markdownWithMeta);
    return {
      ...data,
      slug: slug,
    }
  }).filter(p => p.tags.map(t => t.toLowerCase()).indexOf(tag.toLowerCase()) > -1);

  return posts;
}

export const readAllTags = async (type) => {
  const dirPath = getDirPath(type);
  const folderNameList = fs.readdirSync(dirPath);
  let tags = [];
  folderNameList.forEach(slug => {
    const markdownWithMeta = fs.readFileSync(path.join(dirPath, slug, 'index.mdx'), 'utf-8');
    const { data } = matter(markdownWithMeta);
    tags = tags.concat(data.tags);
  });

  const reducedTagObj = tags.reduce((acc, it) => {
    if (acc[it]) acc[it] = acc[it] + 1;
    else acc[it] = 1;
    return acc;
  }, {});

  return Object.keys(reducedTagObj).map(key => ({ name: key, numOfBlogs: reducedTagObj[key] }))
}