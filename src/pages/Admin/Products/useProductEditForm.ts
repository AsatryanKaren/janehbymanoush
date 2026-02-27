import { useEffect, useState } from "react";
import { Form, App } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import { useParams, useNavigate } from "react-router-dom";
import { useAdminTranslation } from "src/pages/Admin/useAdminTranslation";
import { adminProductsApi } from "src/api/adminProducts";
import { ROUTES } from "src/consts/routes";
import { useAdminCategories } from "src/app/providers/AdminCategoriesProvider";
import type { ProductDetailsPublic } from "src/types/product";
import type { CategoryItem } from "src/types/category";
import {
  productToFormValues,
  formValuesToCreateRequest,
  PRODUCT_EDIT_DEFAULTS,
  type ProductFormValues,
} from "./types";
import {
  productValuesToFormData,
  buildProductImagesFormData,
  buildStoryImagesFormData,
} from "./utils";

const isCreateMode = (id: string | undefined): boolean =>
  id === undefined || id === "new";

const categoryLabel = (c: CategoryItem): string => {
  const title = c.titleEn ?? c.titleHy ?? c.titleRu ?? c.title ?? c.id;
  if (c.collectionName?.trim()) return `${title} (${c.collectionName})`;
  return title;
};

export const useProductEditForm = () => {
  const { t } = useAdminTranslation();
  const { message } = App.useApp();
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { categories } = useAdminCategories();

  const [form] = Form.useForm<ProductFormValues>();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [productImageFileList, setProductImageFileList] = useState<UploadFile[]>(
    [],
  );
  const [storyImageFileList, setStoryImageFileList] = useState<UploadFile[]>([]);
  const [product, setProduct] = useState<ProductDetailsPublic | null>(null);
  const [mainProductImageIndex, setMainProductImageIndex] = useState(0);

  const create = isCreateMode(id);

  const categoryOptions = categories.map((c) => ({
    label: categoryLabel(c),
    value: c.id,
  }));

  useEffect(() => {
    if (create) return;
    setLoading(true);
    adminProductsApi
      .getById(id!)
      .then((loaded) => {
        setProduct(loaded);
        form.setFieldsValue(productToFormValues(loaded));
      })
      .catch(() => {
        void message.error(t("admin.loadFailed"));
      })
      .finally(() => setLoading(false));
  }, [id, create, form, message, t]);

  const handleSubmit = async (values: ProductFormValues) => {
    setSubmitting(true);
    try {
      if (!values.category) {
        void message.error(t("admin.categoryRequired"));
        setSubmitting(false);
        return;
      }

      if (create) {
        const formData = productValuesToFormData(
          values,
          productImageFileList,
          storyImageFileList,
          mainProductImageIndex,
        );
        await adminProductsApi.create(formData);
        void message.success(t("admin.createSuccess"));
        navigate(ROUTES.ADMIN_PRODUCTS);
      } else {
        const body = formValuesToCreateRequest(values);
        await adminProductsApi.update(id!, body);
        if (productImageFileList.length > 0) {
          const fd = buildProductImagesFormData(
            productImageFileList,
            mainProductImageIndex,
          );
          await adminProductsApi.putImages(id!, fd);
        }
        if (storyImageFileList.length > 0) {
          const fd = buildStoryImagesFormData(storyImageFileList);
          await adminProductsApi.putStoryImages(id!, fd);
        }
        void message.success(t("admin.updateSuccess"));
        navigate(ROUTES.ADMIN_PRODUCTS);
      }
    } catch {
      void message.error(
        create ? t("admin.createFailed") : t("admin.updateFailed"),
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProductImage = async (productId: string, imageId: string) => {
    await adminProductsApi.deleteImage(productId, imageId);
    const next = await adminProductsApi.getById(productId);
    setProduct(next);
  };

  const handleDeleteStoryImage = async (productId: string, imageId: string) => {
    await adminProductsApi.deleteStoryImage(productId, imageId);
    const next = await adminProductsApi.getById(productId);
    setProduct(next);
  };

  const setProductImageFileListWithMain = (fileList: UploadFile[]) => {
    setProductImageFileList(fileList);
    setMainProductImageIndex((prev) =>
      prev >= fileList.length ? Math.max(0, fileList.length - 1) : prev,
    );
  };

  const out = {
    form,
    loading,
    submitting,
    create,
    product,
    categoryOptions,
    productImageFileList,
    setProductImageFileList,
    setProductImageFileListWithMain,
    storyImageFileList,
    setStoryImageFileList,
    mainProductImageIndex,
    setMainProductImageIndex,
    handleSubmit,
    handleDeleteProductImage,
    handleDeleteStoryImage,
    initialValues: PRODUCT_EDIT_DEFAULTS,
    navigateToProducts: () => navigate(ROUTES.ADMIN_PRODUCTS),
  };
  return out;
};

export type UseProductEditFormReturn = ReturnType<typeof useProductEditForm>;
