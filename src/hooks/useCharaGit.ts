import { useCallback, useState } from "react";
import { CharaGit, isExistDBGitId, selectCharaGit } from "../services/CharaGItService";
import { generateBymeComment } from "../services/CommentService";

export const useCharaGit = () => {
  
  const [ isLoading , setIsLoading ] = useState<boolean>(false);

  const [charaGit, setCharaGit] = useState<CharaGit | undefined>(undefined);

  const [ comment, setComment ] = useState<string>("");

  const getCharaGit = async(github_id: string) => {
    if(await isExistDBGitId(github_id)){
      const cgResult = await selectCharaGit(github_id);
      await setCharaGit(cgResult);
      return cgResult;
    } else {
      console.error("ユーザーが存在しません");
    }
  };

  const getComment = async(input :CharaGit) => {
    const req = {
      personality: input?.character ?? "",
      power: input?.status ?? ""
    }
    const result = await generateBymeComment(req);
    console.debug(result);
    setComment(result);
  };

  const init = useCallback((github_id :string) => {
    setIsLoading(true);
    getCharaGit(github_id)
    .then((res) => {

      setTimeout(()=> {
        getComment(res!)
        .then(() => {
          setIsLoading(false);
        });
      }, 100);
      
    });
    
  }, [charaGit]);

  return { charaGit, isLoading, comment, init };
}
