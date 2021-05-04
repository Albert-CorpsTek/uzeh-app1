import React, {useState} from 'react';
import CardComponent, {CardContent, StyledCardCover} from './Card';
import Container from './Container';
import {ActivityIndicator, IconButton, Portal, Text, TouchableRipple} from 'react-native-paper';
import {colors} from 'src/theme';
import {View, Modal, Image} from 'react-native';

type CardSliderProps = {
  loading: boolean;
  covers: Array<{
    image_id: number;
    url: string;
  }>;
};

const CardSlider: React.FC<CardSliderProps> = ({loading, covers, children}) => {
  const [actualCover, setActualCover] = useState(0);
  const [visible, setVisible] = useState(false);
  const renderDots = () => {
    if (!covers) {
      return null;
    }
    return (
      <View
        style={{
          position: 'absolute',
          left: '50%',
          translateX: -(covers.length * 18) / 2,
          top: 168,
        }}>
        {covers.map((i, index) => (
          <IconButton
            key={i.image_id}
            icon="brightness-1"
            color={index === actualCover ? 'white' : 'transparent'}
            size={8}
            style={{
              position: 'absolute',
              left: 0 + index * 18,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
            }}
          />
        ))}
      </View>
    );
  };

  const goRight = () => {
    if (!covers) {
      return;
    }

    if (actualCover === covers.length - 1) {
      return;
    } else {
      setActualCover(p => p + 1);
    }
  };

  const goLeft = () => {
    if (!covers) {
      return;
    }

    if (actualCover === 0) {
      return;
    } else {
      setActualCover(p => p - 1);
    }
  };

  const renderCover = () => {
    if (loading) {
      return (
        <Container padding={60} horizontal vertical>
          <ActivityIndicator color={colors.surface} />
        </Container>
      );
    }

    if (covers[actualCover] === undefined) {
      return null;
    }

    return (
      <>
        <StyledCardCover source={{uri: covers[actualCover].url}} style={{ width: '100%' }} />
        {actualCover !== 0 && (
          <IconButton
            style={{
              position: 'absolute',
              left: 0,
              top: 80,
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
            }}
            size={25}
            icon="arrow-left"
            onPress={goLeft}
          />
        )}
        {actualCover < covers.length - 1 && (
          <IconButton
            style={{
              position: 'absolute',
              right: 0,
              top: 80,
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
            }}
            size={25}
            icon="arrow-right"
            onPress={goRight}
          />
        )}
        {/*renderDots()*/}
      </>
    );
  };

  return (
    <>
      <TouchableRipple onPress={() => setVisible(true)}>
        <CardComponent>
          <CardContent>
            {renderCover()}
            {children}
          </CardContent>
        </CardComponent>
      </TouchableRipple>
      <Portal>
        <Modal 
          visible={visible} 
          transparent={true} 
          onRequestClose={() => setVisible(false)} 
          onDismiss={() => setVisible(false)}
        >
          {typeof covers[actualCover] !== 'undefined' && <View 
            style={{
              flex: 1, 
              justifyContent: 'center', 
              alignItems: 'center', 
              backgroundColor: 'rgba(52, 52, 52, 0.5)',
            }}
          >
            <Image 
              source={{uri: covers[actualCover].url}} 
              style={{
                width: '80%', 
                height: '80%', 
                backgroundColor: 'rgba(52, 52, 52, 0.0)',
              }} 
              resizeMode="contain"
            />
          </View>}
        </Modal>
      </Portal>
    </>
  );
};

export default CardSlider;
