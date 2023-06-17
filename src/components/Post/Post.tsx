import { FC } from "react"
import { IPostData, PostInfoCard } from "./PostInfoCard/PostInfoCard"
import { ISubredditData, SubredditInfoCard } from "./SubredditInfoCard/SubredditInfoCard"
import styles from './Post.module.scss';
import { usePostData } from "../Hooks/usePostData";
import { useSubredditData } from "../Hooks/useSubredditData";
import { BounceLoader } from "react-spinners";
import { GoHomeBtn } from "../ui-components/GoHomeBtn/GoHomeBtn";
import classNames from "classnames";

interface IPost {
  postID: string;
  forModal?: boolean;
}

export const Post: FC<IPost> = ({ postID, forModal = false }) => {

  const { postData, postLoadError, isLoadingPost } = usePostData(postID)
  const { subredditData, subreddigLoadError, isLoadingSubreddit } = useSubredditData(postID)

  return (
    <div className={classNames(
      styles.post,
      { [styles.forModal]: forModal })}
    >

     {!forModal && (<GoHomeBtn />)}

     {isLoadingPost && isLoadingSubreddit && (
        <div role='alert' style={{textAlign: 'center'}}>
          <BounceLoader color="#CC6633" size={80}/>
        </div>
      )}

      {postData && subredditData && (!postLoadError || !postLoadError) && (
        <>
          <PostInfoCard postData={postData as IPostData}/>
          <SubredditInfoCard subredditData={subredditData as ISubredditData} prefix={postData?.subreddit_name_prefixed as string}/>
        </>
      )}

      {(postLoadError && !isLoadingPost && (String(postLoadError.response.status) === '401')) && (
        <div role='alert' style={{textAlign: 'center'}}>
          <p>Необходимо повторно авторизоваться (время авторизации истекло)</p>
          <p>{postLoadError.message}</p>
        </div>
      )}

      {(postLoadError && !isLoadingPost && (String(postLoadError.response.status) != '401')) && (
        <div role='alert' style={{textAlign: 'center'}}>
          <p>{postLoadError.message}</p>
        </div>
      )}

    </div>
  )
}
