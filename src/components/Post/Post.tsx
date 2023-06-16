import { FC } from "react"
import { IPostData, PostInfoCard } from "./PostInfoCard/PostInfoCard"
import { ISubredditData, SubredditInfoCard } from "./SubredditInfoCard/SubredditInfoCard"
import styles from './Post.module.scss';
import { getCookie } from "cookies-next";
import axios from "axios";
import useSWR from "swr";
import { getOptimizatedData } from "@/utils/getOptimizatedData";
import { usePostData } from "../Hooks/usePostData";
import { useSubredditData } from "../Hooks/useSubredditData";
import { BounceLoader } from "react-spinners";


// const postProps = ['title', 'thumbnail', 'permalink', 'author', 'media', 'subreddit_name_prefixed', 'selftext']

// const fetchPost = async (postID: string) => {
//   const token = getCookie('token')

//   const { data } = await axios.get(`https://oauth.reddit.com/api/info.json?id=t3_${postID}`, {
//     headers: { Authorization: `bearer ${token}` },
//   })
//   const postData = data.data.children.map((item: { data: any }) => item.data)
//   const optimizatedPostData = getOptimizatedData(postData, postProps)
//   return optimizatedPostData
// }

interface IPost {
  postID: string;
}

export const Post: FC<IPost> = ({ postID }) => {

  const { postData, postLoadError, isLoadingPost } = usePostData(postID)
  const { subredditData, subreddigLoadError, isLoadingSubreddit } = useSubredditData(postID)

  return (
    <div className={styles.post}>

      {isLoadingPost && isLoadingSubreddit && (
        <div role='alert' style={{textAlign: 'center'}}>
          <BounceLoader color="#CC6633" size={80}/>
        </div>
      )}

      {subredditData && subredditData && (
        <>
          <PostInfoCard postData={postData as IPostData}/>
          <SubredditInfoCard subredditData={subredditData as ISubredditData} prefix={postData?.subreddit_name_prefixed as string}/>
        </>
      )}

      {(postLoadError || subreddigLoadError) && (
        <div role='alert' style={{textAlign: 'center'}}>
          <p>{postLoadError.message || subreddigLoadError.message}</p>
        </div>
      )}
    </div>
  )
}
