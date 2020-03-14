import { Link, navigate } from "gatsby"
import React from "react"

export default function Header() {
  const filterPosts = e => {
    const code = e.key
    const filterValue = e.target.value
    if (code === "Enter") {
      navigate(`/feed?search=${filterValue}`)
    }
  }

  return (
    <nav className="navbar navbar-expand">
      <span className="navbar-brand">
        <h3>Dgraph GraphQL Blog</h3>
      </span>
      <div className="navbar-collapse navbar-direction">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/feed" className="nav-link">
              Feed
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/create" className="nav-link">
              Add Article
            </Link>
          </li>
          <li className="nav-item">
            <input
              id="search"
              className="form-control"
              onKeyPress={e => filterPosts(e)}
              type="text"
              placeholder="Search"
            />
          </li>
        </ul>
      </div>
    </nav>
  )
}
