import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

interface CharaHealthLineProps {
  currentValue: number;
  maxValue: number;
  height?: string | number;
  width?: string | number;
  barColor?: string;
  backgroundColor?: string;
  showText?: boolean;
  label?: string;
}

const CharaHealthLineComponent: React.FC<CharaHealthLineProps> = ({
  currentValue,
  maxValue,
  height = '20px',
  width = '100%',
  barColor = 'green.400',
  backgroundColor = 'gray.200',
  showText = true,
  label = 'HP'
}) => {
  // 値をパーセンテージに変換（0〜100%）
  const percentage = Math.min(Math.max((currentValue / maxValue) * 100, 0), 100);
  
  // HPの状態によって色を変更
  const getBarColor = () => {
    if (percentage <= 20) return 'red.500'; // 20%以下: 赤
    if (percentage <= 50) return 'yellow.500'; // 50%以下: 黄色
    return barColor; // その他: 通常色（デフォルト緑）
  };

  return (
    <Flex width={width} direction="column">
      {label && (
        <Flex justify="space-between" mb="2px">
          <Text fontSize="xs" fontWeight="bold">{label}</Text>
          {showText && (
            <Text fontSize="xs">{`${currentValue} / ${maxValue}`}</Text>
          )}
        </Flex>
      )}
      <Box
        position="relative"
        height={height}
        bg={backgroundColor}
        borderRadius="md"
        overflow="hidden"
      >
        <Box
          position="absolute"
          left={0}
          top={0}
          height="100%"
          width={`${percentage}%`}
          bg={getBarColor()}
          transition="width 0.3s ease-in-out"
        />
      </Box>
    </Flex>
  );
};

export default CharaHealthLineComponent;
