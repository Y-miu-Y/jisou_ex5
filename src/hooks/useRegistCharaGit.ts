import { isExistDBGitId, registCharaGit, updateCharaGitByGitId } from "../services/CharaGItService"

export const useRegistCharaGit = () => {
  const upsertDB = async (props: {git_id: string, name: string, character: string}) => {
    if(await isExistDBGitId(props.git_id)){
      updateCharaGitByGitId(props);
    } else {
      registCharaGit(props)
    }
  }

  return { upsertDB }
}