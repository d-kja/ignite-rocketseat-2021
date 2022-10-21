import { useEffect, useState } from "react"

import { RepositoryItem } from "./RepositoryItem"
import "../../styles/repository.scss"

const repoUrl = "https://api.github.com/users/Nyyu/repos"

export function RepositoryList() {
  const [repos, setRepos] = useState([])

  useEffect(() => {
    fetch(repoUrl)
      .then((response) => response.json())
      .then((data) => setRepos(data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <section className="repository-list">
      <h1>Repository List</h1>

      <ul>
        {repos.map((repo) => (
          <RepositoryItem
            repository={repo}
            key={repo.name}
          />
        ))}
      </ul>
    </section>
  )
}
