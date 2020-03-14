import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import queryString from "query-string"
import React from "react"
import Post from "../components/Post"

const GET_FILTERED_BLOG_POSTS = gql`
  query Post($search: String!) {
    queryPost(
      filter: {
        or: {
          title: { anyoftext: $search }
          or: { text: { anyoftext: $search } }
        }
        tags: { eq: $search }
      }
    ) {
      postID
      title
      text
      numLikes
      isPublished
      author {
        id
        name
        dob
      }
    }
  }
`

const GET_ALL_BLOG_POSTS = gql`
  {
    queryPost {
      postID
      title
      text
      numLikes
      isPublished
      author {
        id
        name
        dob
      }
    }
  }
`

export default function PostList(props) {
  let params,
    search = ""
  if (props.location.search !== "") {
    params = queryString.parse(props.location.search)
    search = params.search
  }
  let query = GET_FILTERED_BLOG_POSTS
  if (search === "") {
    query = GET_ALL_BLOG_POSTS
  }

  const { loading, error, data } = useQuery(query, {
    variables: { search },
    fetchPolicy: "network-only",
  })
  if (loading) return "Fetching Posts..."
  if (error) return `Error: ${error}`
  const posts = data.queryPost

  return (
    <div className="container">
      {posts.map(post => (
        <Post key={post.postID} post={post} />
      ))}
    </div>
  )
}
