import { RepositoryType } from "./RepositoryList"

const lorem =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nisi corporis blanditiis corrupti minima unde?"

interface RepositoryItemProps {
  repository: RepositoryType
}

export function RepositoryItem({
  repository,
}: RepositoryItemProps) {
  return (
    <li>
      <strong>{repository?.name ?? "Repo"}</strong>
      <p>{repository?.description ?? lorem}</p>
      <a href={repository?.html_url ?? "#"}>Repo link</a>
    </li>
  )
}
