import 'dotenv/config';
import { ContributionScraper } from '../driver/ContributionScraper';

const main = () => {
  ContributionScraper();
};

console.log('バッチ処理を実行開始');
main();
console.log('バッチ処理を終了');

export { main };