import { getOptimizatedData } from "@/utils/getOptimizatedData"
import axios from "axios"
import { getCookie } from "cookies-next"
import useSWR from "swr"

const subredditProps = ['title', 'public_description', 'url', 'icon_img', 'banner_img', 'subscribers']

const fetchPost = async (postID: string) => {
  const token = getCookie('token')

  const {data} = await axios.get(`https://oauth.reddit.com/api/info.json?id=t3_${postID}`, {
    headers: { Authorization: `bearer ${token}` },
  })
  const postData = data.data.children.map((item: { data: any }) => item.data)

  const subreddit = await axios.get(`https://oauth.reddit.com/api/info.json?id=${postData[0].subreddit_id}`, {
    headers: { Authorization: `bearer ${token}` },
  })

  const subredditData = subreddit.data.data.children.map((item: { data: any }) => item.data)
  const optimizatedSubredditData = getOptimizatedData(subredditData, subredditProps)
  return optimizatedSubredditData[0]
}

export function useSubredditData (postID: string) {

  const { data, error, isLoading } = useSWR(postID, fetchPost);

  return {
    subredditData: data,
    isLoadingSubreddit: isLoading,
    subreddigLoadError: error
  }
}
