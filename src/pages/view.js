import { useMutation, useQuery } from "@apollo/react-hooks"
import { navigate } from "gatsby"
import gql from "graphql-tag"
import queryString from "query-string"
import React, { useState } from "react"
import { FaEdit, FaTrash } from "react-icons/fa"

const GET_POST = gql`
  query Post($postID: ID!) {
    getPost(postID: $postID) {
      postID
      title
      text
      tags
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

const DELETE_POST = gql`
  mutation deletePost($postID: ID!) {
    deletePost(filter: { postID: [$postID] }) {
      msg
    }
  }
`

const POST_MUTATION = gql`
  mutation updatePost($postSet: PostPatch!, $postID: ID!) {
    updatePost(input: { filter: { postID: [$postID] }, set: $postSet }) {
      post {
        postID
        title
        text
        tags
        author {
          id
          name
        }
      }
    }
  }
`

export default function ViewPost(props) {
  const [numLikes, setNumLikes] = useState(0)
  const editPost = postID => {
    navigate(`/edit?postID=${postID}`)
  }
  const postSet = {
    numLikes: numLikes + 1,
  }
  let params = queryString.parse(props.location.search)
  let postID = params.postID

  const { loading, error, data } = useQuery(GET_POST, {
    variables: { postID },
    fetchPolicy: "network-only",
  })
  const [deletePost] = useMutation(DELETE_POST)
  const [updatePost] = useMutation(POST_MUTATION)

  if (loading) return "Fetching Posts..."
  if (error) return `Error: ${error}`
  const post = data.getPost
  if (numLikes === 0) {
    setNumLikes(post.numLikes)
  }

  return (
    <div className="container">
      <div className="h3 text-center">
        {post.title}
        <span
          className="delete-post"
          onClick={async e => {
            e.preventDefault()
            await deletePost({ variables: { postID } })
            navigate("/feed")
          }}
        >
          <FaTrash />
        </span>
        <span className="edit-post" onClick={() => editPost(post.postID)}>
          <FaEdit />
        </span>
      </div>
      <hr />
      <div className="text-post">{post.text}</div>
      <div>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={async e => {
            e.preventDefault()
            await updatePost({
              variables: { postSet, postID },
              refetchQueries: [{ query: GET_POST, variables: { postID } }],
            })
            navigate(`/view?postID=${postID}`)
          }}
        >
          Likes <span className="badge badge-light">{post.numLikes}</span>
        </button>
        <span className="tagsset-post">
          {post.tags.map(tag => (
            <span className="badge badge-secondary tag-post" key={tag}>
              {tag}
            </span>
          ))}
        </span>
      </div>
    </div>
  )
}
