import React, {useState} from 'react';
import {Menu, TouchableRipple, Text, IconButton} from 'react-native-paper';
import Container from 'components/Container';
import {View} from 'react-native';
import NormalText from 'components/NormalText';
import CustomTextInput from 'components/CustomTextInput';
import { colors } from 'src/theme';

type Item = {
  key: string;
  label: string;
};

type SelectProps = {
  items: Item[];
  onChange: (key: string) => void;
  value: string;
};

const Select: React.FC<SelectProps> = ({items, onChange, value, editable = true}) => {
  const [isCategoryMenuVisible, setIsCategoryMenuVisible] = useState(false);

  const renderSelectedCategoryLabel = () =>
    items.find((i) => i.key === value)?.label;

  const renderItems = () =>
    items.map((i) => (
      <TouchableRipple
        key={i.key}
        rippleColor="gray"
        onPress={() => {
          onChange(i.key);
          setIsCategoryMenuVisible(false);
        }}>
        <Container
          vertical
          horizontal
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'nowrap',
          }}>
          {/* {i.url_icon && (
            <HandleImageIcon
              backgroundColor={backgroundColorMenu}
              nameOrUri={i.url_icon}
              size={30}
            />
          )} */}
          <NormalText
            style={{
              flexGrow: 1,
              width: '100%',
            }}>
            {i.label}
          </NormalText>
        </Container>
      </TouchableRipple>
    ));

  return (
    <Menu
      contentStyle={{
        alignSelf: 'flex-start',
        maxWidth: '80%',
        flex: 1,
      }}
      visible={isCategoryMenuVisible}
      onDismiss={() => setIsCategoryMenuVisible(false)}
      anchor={
        <TouchableRipple 
          onPress={() => {
            if (editable) {
              setIsCategoryMenuVisible(true);
            }
          }}>
          <Container
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: colors.lightGreen,
              opacity: editable ? undefined : 0.2
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: 15,
              }}>
              {/* {renderSelectedCategoryIcon()} */}
              <Text>{renderSelectedCategoryLabel()}</Text>
            </View>
            <IconButton icon="menu-down" />
          </Container>
        </TouchableRipple>
      }>
      {renderItems()}
    </Menu>
  );
};

export default Select;
