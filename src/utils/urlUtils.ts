import axios from "axios";

const GITHUB_URL = 'https://github.com';
const GITHUB_API_URL = 'https://api.github.com';


export const isURL200 = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url);
    return response.status === 200;
  } catch (error) {
    console.error('Error checking URL:', error);
    return false;
  }
}

export const checkUserExists = (username: string) => {
  return axios.get(`${GITHUB_API_URL}/users/${username}`)
  .then(() => true)
  .catch(() => false);
}


export const contributionsURL = (user: string): string => {
  return (`https://github.com/users/${user}/contributions`);
}
export const githubURL = (user: string): string => {
  return (`${GITHUB_URL}/${user}`);
}

