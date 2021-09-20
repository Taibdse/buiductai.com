
import React from 'react';

import AppLayout from '@/layouts/AppLayout';
import { readAllPosts, readAllTags } from '@/libs/mdx';
import BlogPageContainer from '@/src/components/BlogPageContainer';
import BlogList from '@/src/components/BlogList';
import { CONTENT_TYPE } from '@/src/constants/enum';

const BlogPage = (props) => {
  const { blogs, tags } = props;

  const seo = {
    title: 'Blogs',
    description: "Duc-Tai Bui's blogs come here.",
  };

  return (
    <AppLayout seo={seo}>
      <BlogPageContainer tags={tags} isBlogListContainer>
        <BlogList
          blogs={blogs}
          title="Blogs"
        />
      </BlogPageContainer>
    </AppLayout>
  );
};

export async function getStaticProps() {
  const blogs = await readAllPosts(CONTENT_TYPE.BLOGS);
  const tags = await readAllTags(CONTENT_TYPE.BLOGS);

  return {
    props: {
      blogs,
      tags
    }
  }
}

export default BlogPage;