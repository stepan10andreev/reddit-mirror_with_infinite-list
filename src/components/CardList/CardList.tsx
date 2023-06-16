import { FC, useEffect, useState } from "react";
import styles from './CardList.module.scss';
import { Card } from "./Card/Card";
import axios from "axios";
import { getCookie } from "cookies-next";
import useSWRInfinite from 'swr/infinite'
import { PropagateLoader } from "react-spinners";

// type ICardListsProps = Pick<IHomePageProps, 'postsData'>

const fetchPosts = async (url: string) => {
  const token = getCookie('token')

  const {data} = await axios.get(`https://oauth.reddit.com${url}`, {
    headers: { Authorization: `bearer ${token}` },
  })

  return data.data
}

const getKey = (pageIndex: number, previousPageData: { children: any; after: any; }) => {
  // // если достигнут конец
  if (previousPageData && !previousPageData.children) return null

  if (pageIndex === 0) return `/r/all/hot.json?limit=10`

  return `/r/all/hot.json?limit=10&after=${previousPageData.after}`
}


export const CardList: FC = () =>  {
  const [errorStatus, setErrorStatus] = useState('')
  const { data, error, isLoading, size, setSize } = useSWRInfinite(getKey, fetchPosts, {
    shouldRetryOnError: false
  })

  console.log(error)

  useEffect(() => {
    if (error) setErrorStatus(String(error.response?.status))
  }, [error])

  return (
    <>
      <ul className={styles.cardsList}>

        {(!data && !isLoading && (errorStatus === '401')) && (
          <div role='alert' style={{textAlign: 'center'}}>
            <p>Для просмотра постов необходимо авторизоваться</p>
          </div>
        )}

        {(!data && !isLoading && (errorStatus != '401')) && (
          <div role='alert' style={{textAlign: 'center'}}>
            <p>{error.message}</p>
          </div>
        )}

        {data?.map((posts) => {
          if (posts.children.length === 0) return (
            <div role='alert' style={{textAlign: 'center'}}>
              <p>Нет ни одного поста</p>
            </div>
          )

          return posts.children.map((post: any) => (
            <Card
            key={post.data.id}
            title={post.data.title}
            url={post.data.url}
            thumbnail={post.data.thumbnail}
            permalink={post.data.permalink}
            author={post.data.author}
            score={post.data.score}
            num_comments={post.data.num_comments}
            created={post.data.created}
            media={post.data.media}
            id={post.data.id}
          />))
        })}

      {isLoading && (
        <div role='alert' style={{textAlign: 'center'}}>
          <PropagateLoader color="#CC6633" />
        </div>
      )}

      {!isLoading && data && (
        <button className={styles.button} onClick={() => setSize(size + 1)}>Загрузить ещё</button>
      )}
      </ul>

    </>
  );
}
