import BlogList from '@/src/components/BlogList';
import BlogPageContainer from '@/src/components/BlogPageContainer';
import AppLayout from '@/layouts/AppLayout';
import { readAllTags, readPostsByTag } from '@/libs/mdx';
import { CONTENT_TYPE } from '@/src/constants/enum';

function BlogByTagPage(props) {
  const { blogs, tags, tag } = props;

  const seo = {
    title: `Blogs of tag ${tag}`,
    description: `Duc-Tai Bui's blogs of tag ${tag} come here.`,
  };

  return (
    <AppLayout seo={seo}>
      <BlogPageContainer tags={tags} isBlogListContainer>
        <BlogList
          blogs={blogs}
          title={`Blogs of #${tag}`}
        />
      </BlogPageContainer>
    </AppLayout>
  )
}

export async function getStaticPaths(context) {
  const tags = await readAllTags(CONTENT_TYPE.BLOGS);
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
  const blogs = await readPostsByTag(CONTENT_TYPE.BLOGS, tag);
  const tags = await readAllTags(CONTENT_TYPE.BLOGS);

  return {
    props: {
      blogs,
      tags,
      tag
    }
  }
}

export default BlogByTagPage;