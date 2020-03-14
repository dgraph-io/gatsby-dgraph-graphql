import React from "react"

import PostList from "./feed"
import PostView from "./view"
import CreatePost from "./create"
import { Router, Location } from "@reach/router"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import EditPost from "./edit"

import "bootstrap/dist/css/bootstrap.css"
import "../components/main.css"
import { navigate } from "gatsby"

const IndexPage = () => {
  navigate("/feed")
  return (
    <div className="container">
      <FadeTransitionRouter>
        <Page path="/feed" component={PostList} />
        <Page path="/create" component={CreatePost} />
        <Page path="/view" component={PostView} />
        <Page path="/edit" component={EditPost} />
      </FadeTransitionRouter>
    </div>
  )
}

const FadeTransitionRouter = props => (
  <Location>
    {({ location }) => (
      <TransitionGroup className="transition-group">
        <CSSTransition key={location.key} classNames="fade" timeout={500}>
          <Router location={location} className="router">
            {props.children}
          </Router>
        </CSSTransition>
      </TransitionGroup>
    )}
  </Location>
)

const Page = props => (
  <div
    className="page"
    style={{ background: `hsl(${props.page * 75}, 60%, 60%)` }}
  >
    {props.page}
  </div>
)

export default IndexPage
