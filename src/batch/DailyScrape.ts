import { AllContributionScraper } from "../driver/ContributionScraper.js";

console.log('バッチ処理を実行開始');
AllContributionScraper()
.then(() => {
  console.log('バッチ処理を終了');
});