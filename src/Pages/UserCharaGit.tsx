import { useParams } from "react-router-dom";

export const UserCharaGit = () => {
  const { id } = useParams();
  
  return (
    <>id: {id}</>
  )
}
