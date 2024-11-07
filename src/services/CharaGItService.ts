import { supabase } from "./supabase";

const chara_git = 'chara_git';
const selectCharaGit = 'id, github_id, name, charactor, status';

const findCharaGitByGitId = async (git_id: string) => {
  const { data, error } = await supabase
    .from(chara_git)
    .select(selectCharaGit)
    .eq('github_id', git_id)
    .single();
  console.debug(data);
  return {data, error};
}

export const registCharaGit = async (props: {git_id:string, name:string, charactor:string}) => {
  const { data, error } = await supabase
  .from(chara_git)
  .insert({
    github_id: props.git_id,
    name: props.name,
    charactor: props.charactor
  });
  return { data, error }
};

export const updateCharaGitByGitId = async (props: {git_id:string, name:string, charactor:string}) => {
  const { data, error } = await supabase
  .from(chara_git)
  .update({
    name: props.name,
    charactor: props.charactor
  })
  .eq("github_id", props.git_id);
  return { data, error }
};

export const isExistGitId = async (git_id: string): Promise<boolean> => {
  try{
    const {data} = await findCharaGitByGitId(git_id);
    if(data){
      return true;
    }
    return false;
  }catch(e){
    return false;
  }
}