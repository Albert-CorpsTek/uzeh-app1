import React, { useState, useEffect } from 'react';
import {
  Menu, TouchableRipple, Text, IconButton,
} from 'react-native-paper';
import { View } from 'react-native';
import { colors } from 'src/theme';
import GlobalContext from 'src/context';
import { useStateLink } from '@hookstate/core';
import Container from './Container';

interface Props {
  selectedCategory: 'default' | number;
  selectedSubcategory?: 'default' | number;
  onChangeCategory: (value: 'default' | number) => void;
  onChangeSubcategory: (value: 'default' | number) => void;
}

const CategoriesVucoVuco: React.FC<Props> = ({
  selectedCategory,
  selectedSubcategory,
  onChangeCategory,
  onChangeSubcategory,
}) => {
  const {
    category_Vucovuco: {
      categoriesVucovucoRef,
      fetchCategoriesVucovuco,
      fetchSubcategory,
    },
  } = GlobalContext;
  const [isCategoryMenuVisible, setIsCategoryMenuVisible] = useState(false);
  const [isSubcategoryMenuVisible, setIsSubcategoryMenuVisible] = useState(false);

  const categoriesVucovuco = useStateLink(categoriesVucovucoRef);

  useEffect(() => {
    (async () => {
      if (!categoriesVucovuco.value === true) {
        await fetchCategoriesVucovuco();
        await fetchSubcategory(selectedCategory);
      }
    })();
  }, []);

  if (!categoriesVucovuco.value) {
    return <Text>Carregando...</Text>;
  }

  const renderCategoriesVucovuco = () => categoriesVucovuco.value?.map((i) => (
    <Menu.Item
      key={i.id}
      title={i.name}
      onPress={async () => {
        onChangeCategory(i.id);
        await fetchSubcategoryVucovuco(i.id);
        onChangeSubcategory('default');
        setIsCategoryMenuVisible(false);
      }}
      icon={i.url_icon ?? undefined}
      theme={{
        colors: {
          text: colors.black,
        },
      }}
    />
  ));

  const renderSubcategories = () => {
    const foundCategory = categoriesVucovuco.value?.find((i) => i.id === selectedCategory);
    if (!foundCategory || !foundCategory.children) {
      return null;
    }

    return foundCategory.children.map((i) => (
      <Menu.Item
        key={i.id}
        title={i.name}
        onPress={() => {
          onChangeSubcategory(i.id);
          setIsSubcategoryMenuVisible(false);
        }}
        theme={{
          colors: {
            text: colors.black,
          },
        }}
      />
    ));
  };

  const renderSelectedCategoryIcon = () => {
    const foundCategory = categoriesVucovuco.value?.find((i) => i.id === selectedCategory);
    if (!foundCategory) {
      return null;
    }

    return foundCategory.url_icon && <IconButton icon={foundCategory.url_icon} />;
  };

  const renderSelectedCategoryLabel = () => {
    const foundCategory = categoriesVucovuco.value?.find((i) => i.id === selectedCategory);
    if (!foundCategory) {
      return null;
    }

    return foundCategory.name;
  };

  const renderSelectedSubcategoryLabel = () => {
    const foundCategory = categoriesVucovuco.value?.find((i) => i.id === selectedCategory);
    if (!foundCategory) {
      return null;
    }

    if (
      foundCategory.subCategoryLoading === true
    ) {
      return <Text>Carregando...</Text>;
    }

    if (
      foundCategory.children === undefined
      || selectedSubcategory === undefined
    ) {
      return null;
    }

    const foundSubcategory = foundCategory.children.find((i) => i.id === selectedSubcategory);
    if (!foundSubcategory) {
      return null;
    }

    return foundSubcategory.name;
  };

  return (
    <Container>
      <Menu
        visible={isCategoryMenuVisible}
        onDismiss={() => setIsCategoryMenuVisible(false)}
        anchor={(
          <TouchableRipple
            onPress={() => setIsCategoryMenuVisible(true)}
          >
            <Container
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: 15,
              }}
              >
                {renderSelectedCategoryIcon()}
                <Text>
                  {renderSelectedCategoryLabel()}
                </Text>
              </View>
              <IconButton icon="menu-down" />
            </Container>
          </TouchableRipple>
        )}
      >
        {renderCategoriesVucoVuco()}
      </Menu>
      <Menu
        visible={isSubcategoryMenuVisible}
        onDismiss={() => setIsSubcategoryMenuVisible(false)}
        anchor={(
          <TouchableRipple
            onPress={() => setIsSubcategoryMenuVisible(true)}
          >
            <Container
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: 15,
              }}
              >
                <Text>
                  {renderSelectedSubcategoryLabel()}
                </Text>
              </View>
              <IconButton icon="menu-down" />
            </Container>
          </TouchableRipple>
        )}
      >
        {renderSubcategories()}
      </Menu>
    </Container>
  );
};
export default CategoriesVucovuco;
