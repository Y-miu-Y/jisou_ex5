import React from 'react';
import { Box } from '@chakra-ui/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Chart.jsのコンポーネントを登録
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// プロップスの型定義
type ChartType = 'line' | 'bar';

interface ChartComponentProps {
  type: ChartType;
  data: ChartData<any>; // 汎用的なデータ型を使用
  options?: ChartOptions<ChartType>;
  height?: string | number;
  width?: string | number;
}

const ChartComponent: React.FC<ChartComponentProps> = ({
  type = 'line',
  data,
  options,
  height = '400px',
  width = '100%'
}) => {
  const defaultOptions: ChartOptions<ChartType> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'データチャート',
      },
    },
  };

  const mergedOptions = { ...defaultOptions, ...options };

  return (
    <Box height={height} width={width}>
      {type === 'line' ? (
        <Line data={data} options={mergedOptions as ChartOptions<'line'>} />
      ) : (
        <Bar data={data} options={mergedOptions as ChartOptions<'bar'>} />
      )}
    </Box>
  );
};

export default ChartComponent;
