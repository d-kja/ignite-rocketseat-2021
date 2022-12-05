import { asHTML, asText } from '@prismicio/helpers';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { FiUser, FiCalendar, FiClock } from 'react-icons/fi';
import Header from '../../components/Header';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  if (!post)
    return (
      <main
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        Carregando...
      </main>
    );

  const entireTextChunk: any = post?.data.content.reduce((acc, current) => {
    const textChunk = asText(current.body as any) + current.heading;

    const formattedChunk = textChunk.split(/\s+/).length;
    return acc + formattedChunk;
  }, 0);

  const avgTime = Math.ceil(entireTextChunk / 200);

  return (
    <>
      <Head>
        <title>{`${
          post?.data?.title ?? 'Loading...'
        } | Space traveling`}</title>
      </Head>

      <main className={styles.container}>
        <nav className={styles.navbar}>
          <Header />
        </nav>
        <img
          src={post?.data?.banner?.url}
          alt="banner"
          className={styles.banner}
        />
        <div className={styles.content}>
          <section className={styles.article}>
            <h1 className={styles.article_title}>
              {post?.data.title ?? 'Carregando...'}
            </h1>

            <div className={styles.article_info}>
              <span>
                <FiCalendar size={20} />
                {format(
                  new Date(post?.first_publication_date ?? new Date()),
                  'dd MMM yyyy',
                  {
                    locale: ptBR,
                  }
                )}
              </span>
              <span>
                <FiUser size={20} /> {post?.data.author ?? 'author'}
              </span>
              <span>
                <FiClock size={20} /> {avgTime} min
              </span>
            </div>

            {post?.data.content.length
              ? post?.data.content.map(chunk => {
                  return (
                    <article
                      key={chunk.heading}
                      className={styles.article_body}
                    >
                      <h2>{chunk?.heading}</h2>
                      <div
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          __html: asHTML(chunk?.body as any),
                        }}
                      />
                    </article>
                  );
                })
              : 'Carregando...'}
          </section>
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient({});
  const posts = await prismic.getByType('post', {
    pageSize: 100,
  });

  const pathsParams = posts.results.map(post => ({
    params: { slug: post.uid },
  }));

  return {
    paths: pathsParams,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const prismic = getPrismicClient({});

  try {
    const response = await prismic.getByUID('post', String(slug), {});

    const post: Post = {
      data: {
        author: response.data.author,
        banner: response.data.banner,
        content: response.data.content,
        title: response.data.title,
      },
      first_publication_date: response?.first_publication_date,
    };

    console.log(response?.data);

    return {
      props: {
        post,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};
