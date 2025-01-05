import { supabase } from "./supabase";

const chara_git = 'chara_git';
const selectString = 'id, github_id, name, character, status';
const defaultStatus = 50;

export type CharaGit = {
  id: string;
  github_id: string;
  name: string;
  status: number;
  character: string;
}

const findCharaGitByGitId = async (git_id: string) => {
  const { data, error } = await supabase
    .from(chara_git)
    .select(selectString)
    .eq('github_id', git_id)
    .single();
  console.debug(data);

  if (error) console.error(error);

  if (data){
    const result: CharaGit = data;
    return result;
  } else {
    return undefined;
  }
}

export const selectCharaGit = async(git_id: string) => {
  return await findCharaGitByGitId(git_id);
}

export const registCharaGit = async (props: {git_id:string, name:string, character:string}) => {
  const { data, error } = await supabase
  .from(chara_git)
  .insert({
    github_id: props.git_id,
    name: props.name,
    status: defaultStatus,
    character: props.character ?? "cute"
  });
  return { data, error }
};

export const updateCharaGitByGitId = async (props: {git_id:string, name:string, character:string}) => {
  const { data, error } = await supabase
  .from(chara_git)
  .update({
    name: props.name,
    character: props.character
  })
  .eq("github_id", props.git_id);
  return { data, error }
};

export const isExistDBGitId = async (git_id: string): Promise<boolean> => {
  try{
    const result = await findCharaGitByGitId(git_id);
    if(result){
      return true;
    }
    return false;
  }catch(e){
    console.error(e);
    return false;
  }
}

export const selectAllGitId = async (): Promise<CharaGit[]> => {
  try{
    const { data } = await supabase
    .from(chara_git)
    .select(selectString);

    const result: CharaGit[] = data ?? [];

    return result;

  }catch(e){
    console.error(e);
    return [];
  }
}

export const updateCharaGitStatus = async (props: {id:string, status:number}) => {
  const { data, error } = await supabase
  .from(chara_git)
  .update({
    status: props.status
  })
  .eq("id", props.id);
  return { data, error }
};
