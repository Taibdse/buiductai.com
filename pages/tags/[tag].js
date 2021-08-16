import BlogList from '@/src/components/BlogList';
import BlogPageContainer from '@/src/components/BlogPageContainer';
import AppLayout from '@/layouts/AppLayout';
import { getAllTags, getBlogsByTag } from '@/libs/mdx';
import React from 'react';

function BlogByTagPage(props) {
  const { blogs, tags, tag } = props;
  return (
    <AppLayout seo={{ title: 'blog by tag' }}>
      <BlogPageContainer tags={tags}>
        <BlogList
          blogs={blogs}
          title={`Blogs by tag #${tag}`}
        />
      </BlogPageContainer>
    </AppLayout>
  )
}

export async function getStaticPaths(context) {
  const tags = await getAllTags();
  const paths = tags.map(tag => ({
    params: { tag: tag.name }
  }));

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps(context) {
  const { params: { tag } } = context;
  const blogs = await getBlogsByTag(tag);
  const tags = await getAllTags();
  return {
    props: {
      blogs,
      tags,
      tag
    }
  }
}

export default BlogByTagPage;