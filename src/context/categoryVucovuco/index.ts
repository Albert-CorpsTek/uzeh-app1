import {createStateLink, useStateLinkUnmounted} from '@hookstate/core';
import request from 'util/request';

type Category = {
  id: 'default' | number;
  name: string;
  description_category?: string;
  url_icon?: string;
  children?: Array<{
    id: 'default' | number;
    name: string;
  }>;
  subCategoryLoading?: boolean;
};

const defaultCategoryVucovuco = {
  id: 'default',
  name: 'Selecionar...',
  subCategoryLoading: false,
  children: [],
} as Category;

const categoriesVucovucoRef = createStateLink<Category[] | undefined>(
  undefined,
);
let loading = true;

const categoriesVucovuco = useStateLinkUnmounted(categoriesVucovucoRef);

interface RequestCategory {
  result: Category[];
}

type RequestSubcategory = {
  result: {
    [s: string]: string;
  };
};

const fetchCategoriesVucovuco = async () => {
  if (loading === false) {
    return;
  }

  const {result} = await request.get<RequestCategory>(
    'categories_vucovuco/getAll',
  );
  const constructedCategories: Category[] = [
    defaultCategoryVucovuco,
    ...result,
  ];
  categoriesVucovuco.set(constructedCategories);
  loading = false;
};

const fetchSubcategory = async (category_id: 'default' | number) => {
  if (category_id === 'default' || !categoriesVucovuco.value) {
    return;
  }

  const fCategory = categoriesVucovuco.value.find(i => i.id === category_id);
  if (!fCategory || fCategory.children) {
    return;
  }

  categoriesVucovuco.set(prev => {
    if (!prev) {
      return undefined;
    }
    const foundCategory = prev.find(i => i.id === fCategory.id);
    if (!foundCategory) {
      return prev;
    }

    foundCategory.subCategoryLoading = true;

    return prev;
  });

  const {result} = await request.post<RequestSubcategory>(
    'subcategories/getCategoriesId',
    {
      category_id: category_id.toString(),
    },
  );

  categoriesVucovuco.set(prev => {
    if (!prev) {
      return undefined;
    }
    const foundCategory = prev.find(i => i.id === fCategory.id);
    if (!foundCategory) {
      return prev;
    }

    const subCategories: Required<Category>['children'] = [
      {
        id: 'default',
        name: 'Selecionar...',
      },
    ];

    Object.keys(result).forEach(i => {
      const num = Number(i);
      if (Number.isNaN(num)) {
        return;
      }

      subCategories.push({
        id: num,
        name: result[i],
      });
    });

    foundCategory.subCategoryLoading = false;
    foundCategory.children = subCategories;

    return prev;
  });
};

export default {
  categoriesVucovucoRef,
  fetchCategoriesVucovuco,
  fetchSubcategory,
};
