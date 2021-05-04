import { View } from 'react-native';
import { Text } from 'react-native-paper';
import React, { useRef, useEffect } from 'react';
import { colors } from 'src/theme';
import GlobalContext from 'src/context';

interface PaginatorProps {
  actualPage: number;
  numberOfItems: number;
  sizeOfEachPage: number;
  onPageChange: (page: number) => void;
}

const {
  appbar: {
    moveToTop,
  },
} = GlobalContext;

const Paginator: React.FC<PaginatorProps> = ({
  actualPage,
  numberOfItems,
  sizeOfEachPage,
  onPageChange,
}) => {
  const timeoutId = useRef<number>();

  useEffect(() => () => {
    timeoutId.current && clearTimeout(timeoutId.current);
  });

  const numberOfPages = Math.ceil(numberOfItems / sizeOfEachPage);

  return numberOfPages > 1 ? (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
      }}
    >
      {[...new Array(numberOfPages)].map((_, index) => (
        <Text
          key={index}
          style={{
            fontSize: 20,
            fontFamily: 'Manjari-Bold',
            color: index === actualPage ? colors.orange : colors.darkGray,
          }}
          onPress={() => {
            moveToTop();
            timeoutId.current = setTimeout(() => onPageChange(index), 100);
          }}
        >
          {index + 1}
        </Text>
    ))}
    </View>
  ) : null;
};

export default Paginator;
