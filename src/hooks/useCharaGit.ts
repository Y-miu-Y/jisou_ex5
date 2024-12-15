import { useCallback, useState } from "react";
import { CharaGit, isExistDBGitId, selectCharaGit } from "../services/CharaGItService";

export const useCharaGit = () => {
  
  const [ isLoading , setIsLoading ] = useState<boolean>(false);

  const [charaGit, setCharaGit] = useState<CharaGit | undefined>(undefined);

  const [ comment, setComment ] = useState<string>("");

  const getCharaGit = useCallback(async(github_id: string) => {
    setIsLoading(true);
    if(await isExistDBGitId(github_id)){
      setCharaGit(await selectCharaGit(github_id));
      setIsLoading(false);
    } else {
      console.error("ユーザーが存在しません");
    }
  }, []);

  const getComments = useCallback(async() => {

  }, [])

  return { charaGit, getCharaGit, isLoading, comment, setComment  };
}