import React, { useState } from 'react';
import { Menu, TouchableRipple } from 'react-native-paper';
import { View } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import NormalText from './NormalText';

interface ValueOptionsProps {
  pots: number[];
  value: number;
}

const ValueOptions: React.FC<ValueOptionsProps> = ({ pots, value }) => {
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);

  const renderSelectedItem = () => {
    const i = pots[selectedItem];
    return `${i}x de R$${(value / i).toFixed(2).replace('.', ',')}`;
  };

  const renderAnchor = () => (
    <TouchableRipple
      onPress={() => setVisible(true)}
    >
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <NormalText>{renderSelectedItem()}</NormalText>
        <MaterialIcon name="arrow-drop-down" />
      </View>
    </TouchableRipple>
  );

  const closeMenu = () => setVisible(false);

  const handleClickItem = (index: number) => {
    setSelectedItem(index);
    closeMenu();
  };

  const renderOptions = () => pots.map((i, indexI) => (
    <Menu.Item
      key={indexI}
      title={`${i}x de R$${(value / i).toFixed(2).replace('.', ',')}`}
      onPress={() => handleClickItem(indexI)}
    />
  ));

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={renderAnchor()}
      >
        {renderOptions()}
      </Menu>
    </View>
  );
};

export default ValueOptions;
