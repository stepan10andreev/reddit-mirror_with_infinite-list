import { getOptimizatedData } from "@/utils/getOptimizatedData"
import axios from "axios"
import { getCookie } from "cookies-next"
import useSWR from "swr"

const postProps = ['title', 'thumbnail', 'permalink', 'author', 'media', 'subreddit_name_prefixed', 'selftext']

const fetchPost = async (postID: string) => {
  const token = getCookie('token')

  const { data } = await axios.get(`https://oauth.reddit.com/api/info.json?id=t3_${postID}`, {
    headers: { Authorization: `bearer ${token}` },
  })
  const postData = data.data.children.map((item: { data: any }) => item.data)
  const optimizatedPostData = getOptimizatedData(postData, postProps)
  return optimizatedPostData[0]
}

export function usePostData (postID: string) {
  const { data, error, isLoading } = useSWR(postID, fetchPost);

  return {
    postData: data,
    isLoadingPost: isLoading,
    postLoadError: error
  }
}
