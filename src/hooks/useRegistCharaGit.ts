import { isExistGitId, registCharaGit, updateCharaGitByGitId } from "../services/CharaGItService"

export const useRegistCharaGit = () => {
  const registDB = async (props: {git_id: string, name: string, charactor: string}) => {
    if(await isExistGitId(props.git_id)){
      updateCharaGitByGitId(props);
    } else {
      registCharaGit(props)
    }
  }


  return { registDB }
}