import axios from "axios";
import { CharaGit, selectAllGitId, updateCharaGitStatus } from "../services/CharaGItService.js";
import { checkUserExists, contributionsURL } from "../utils/urlUtils.js";
import { JSDOM } from 'jsdom';

const getYesterdayString = () => {
  const utc = new Date(Date.now());
  //日本時間を取得
  utc.setHours( utc.getHours() + 9 );
  //昨日
  utc.setDate( utc.getDate() - 1 );
  // スウェーデンの日付形式（YYYY-MM-DD）を利用
  const result = utc.toLocaleDateString("sv-SE");
  return result;
}

const yesterdayString = getYesterdayString();

/**
 * バッチ処理
 */
export const AllContributionScraper = async() => {
  const charaGits = await selectAllGitId();
  
  charaGits.forEach(async(charaGit) => {
    if(await checkUserExists(charaGit.github_id)){
      executeScrapeLastDay(charaGit);
    }else {
      console.error("user not exist: " + charaGit.github_id);
    }
  })
}

/**
 * IDから昨日を取得
 */
const executeScrapeLastDay = async (cg: CharaGit) => {
  try {
    const axiosResponse = await axios.get(contributionsURL(cg.github_id));

    const dom = new JSDOM(axiosResponse.data);
    const document = dom.window.document;

    const elements = document.querySelectorAll(`[data-date="${yesterdayString}"]`);

    if (elements.length > 0) {
      elements.forEach(element => {
        const contributionLevel = element?.getAttribute('data-level') ?? 0;
        
        const level = Number.isInteger(contributionLevel) ? Number(contributionLevel) : 0;

        const updatedStatus = calcStatus({status: cg.status, level});

        updateCharaGitStatus({
          id: cg.id,
          status: updatedStatus
        });
      });
    }

  } catch (error) {
    console.error("★スクレイピングでエラー");
    console.error(error);
  }
}

const calcStatus = (props: {status: number, level: number}) => {
  const dailyPenalty = props.status - 1;
  const dailyBonus = dailyPenalty + props.level;
  return dailyBonus;
}