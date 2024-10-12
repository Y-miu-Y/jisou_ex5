import { useParams } from "react-router-dom";

export const SettingCharaGit = () => {
  const { id } = useParams();
  
  return (
    <>id: {id} setting</>
  )
}
