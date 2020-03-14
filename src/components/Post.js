import React from "react"
import { navigate } from "@reach/router"

export default function Post({ post }) {
  const viewPost = postID => {
    navigate(`/view?postID=${postID}`)
  }
  return (
    <div className="card col-12 mb-3">
      <div
        className="card-body card-pointer"
        onClick={() => viewPost(post.postID)}
      >
        <h5 className="card-title">Title: {post.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">by {post.author.name}</h6>
      </div>
    </div>
  )
}
