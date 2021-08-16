
import React from 'react';

import AppLayout from '@/layouts/AppLayout';
import { getAllBlogs, getAllTags } from '@/libs/mdx';
import BlogPageContainer from '@/src/components/BlogPageContainer';
import BlogList from '@/src/components/BlogList';

const BlogPage = (props) => {
  const { blogs, tags } = props;

  return (
    <AppLayout seo={{ title: "dev blog" }}>
      <BlogPageContainer tags={tags}>
        <BlogList
          blogs={blogs}
          title="Blogs"
        />
      </BlogPageContainer>
    </AppLayout >
  );
};

export async function getStaticProps() {
  const blogs = await getAllBlogs();
  const tags = await getAllTags();

  return {
    props: {
      blogs,
      tags
    }
  }
}

export default BlogPage;