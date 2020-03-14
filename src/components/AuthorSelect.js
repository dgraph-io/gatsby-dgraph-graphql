import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import React, { useState } from "react"

const GET_AUTHORS = gql`
  {
    queryAuthor {
      id
      name
    }
  }
`

export default function AuthorSelect({ onChange, author }) {
  let authorName = "Select Author"
  if (author !== "") {
    authorName = author
  }
  const [value, setValue] = useState(authorName)
  const { loading, error, data } = useQuery(GET_AUTHORS, {
    fetchPolicy: "network-only",
  })
  if (loading) return "Fetching Authors..."
  if (error) return `Error: ${error}`
  const authorList = [
    { id: "default", name: "Select an Author" },
    ...data.queryAuthor,
  ]

  const onSelectboxChange = e => {
    setValue(e.target.value)

    const selectedIndex = e.target.options.selectedIndex
    const authorId = authorList[selectedIndex].id
    const authorName = e.target.value
    onChange(authorName, authorId)
  }

  return (
    <select
      id="authorSelect"
      value={value}
      onChange={onSelectboxChange}
      className="form-control"
    >
      {authorList.map(({ name, id }) => (
        <option value={name} key={id}>
          {name}
        </option>
      ))}
    </select>
  )
}
