import { useState } from 'react';
import { GetStaticProps } from 'next';

import Head from 'next/head';
import Link from 'next/link';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { FiCalendar, FiUser } from 'react-icons/fi';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import Header from '../components/Header';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  const [posts, setPosts] = useState(postsPagination.results);
  const [nextPageUrl, setNextPageUrl] = useState(postsPagination.next_page);

  function handleFetchMoreContent(fetchUrl: string): void {
    fetch(fetchUrl)
      .then(res => res.json())
      .then(data => {
        setNextPageUrl(data.next_page);

        const postResults: Post[] = data.results.map(result => ({
          uid: result.uid,
          first_publication_date: result.first_publication_date,
          data: {
            title: result.data.title,
            subtitle: result.data.subtitle,
            author: result.data.author,
          },
        }));

        setPosts(prev => [...prev, ...postResults]);
      });
  }

  return (
    <>
      <Head>
        <title>Posts | Space traveling</title>
      </Head>

      <main className={commonStyles.container}>
        <div className={`${commonStyles.content} ${styles.content}`}>
          <Header />
          <section className={styles.posts}>
            {posts.map(post => (
              <Link href={`/post/${post.uid}`} key={post.uid}>
                <a className={styles.post}>
                  <div>
                    <strong className={styles.post_title}>
                      {post.data.title}
                    </strong>

                    <p className={styles.post_subtitle}>{post.data.subtitle}</p>
                  </div>

                  <aside className={styles.post_info}>
                    <time>
                      <FiCalendar size={20} />
                      {format(
                        new Date(post.first_publication_date),
                        'dd MMM yyyy',
                        {
                          locale: ptBR,
                        }
                      )}
                    </time>
                    <span>
                      <FiUser size={20} />
                      {post.data.author}
                    </span>
                  </aside>
                </a>
              </Link>
            ))}
            {nextPageUrl && (
              <button
                type="button"
                className={styles.load_more_button}
                onClick={() => handleFetchMoreContent(nextPageUrl)}
              >
                Carregar mais posts
              </button>
            )}
          </section>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType('post', { pageSize: 1 });

  const postResults: Post[] = postsResponse.results.map(result => ({
    uid: result.uid,
    first_publication_date: result.first_publication_date,
    data: {
      title: result.data.title,
      subtitle: result.data.subtitle,
      author: result.data.author,
    },
  }));

  const postsPagination: PostPagination = {
    next_page: postsResponse.next_page,
    results: postResults,
  };

  return {
    props: {
      postsPagination,
    },
    revalidate: 1,
  };
};
