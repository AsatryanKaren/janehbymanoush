import { useEffect, useState, useCallback, useRef } from "react";
import { Form, App } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import { useParams, useNavigate } from "react-router-dom";
import { useAdminTranslation } from "src/pages/Admin/useAdminTranslation";
import { adminProductsApi } from "src/api/adminProducts";
import { ROUTES } from "src/consts/routes";
import { useAdminCategories } from "src/app/providers/AdminCategoriesProvider";
import type { ProductDetailsPublic, ProductImage } from "src/types/product";
import type { CategoryItem } from "src/types/category";
import {
  productToFormValues,
  PRODUCT_EDIT_DEFAULTS,
  type ProductFormValues,
} from "./types";
import { getApiErrorMessage } from "src/utils/apiError";
import {
  productValuesToFormData,
  productValuesToUpdateFormData,
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
  /** Index in productImageFileList of the new file chosen as main; -1 = no new file is main (edit: use existing via mainProductImageId). */
  const [mainProductImageIndex, setMainProductImageIndex] = useState(0);
  /** Id of existing product image set as main (edit mode). */
  const [mainProductImageId, setMainProductImageId] = useState<string | null>(
    null,
  );
  const productImageFileListLengthRef = useRef(0);
  /** Existing product image ids user clicked delete on (from BE). Sent on submit as deletedImageIds. New images removed from upload are just not sent. */
  const [deletedProductImageIds, setDeletedProductImageIds] = useState<string[]>(
    [],
  );
  /** Existing story image ids user clicked delete on (from BE). Sent on submit as deletedStoryImageIds. New story images removed are just not sent. */
  const [deletedStoryImageIds, setDeletedStoryImageIds] = useState<string[]>([]);

  const create = isCreateMode(id);

  const categoryOptions = categories.map((c) => ({
    label: categoryLabel(c),
    value: c.id,
  }));

  useEffect(() => {
    if (create) return;
    setLoading(true);
    setDeletedProductImageIds([]);
    setDeletedStoryImageIds([]);
    adminProductsApi
      .getById(id!)
      .then((loaded) => {
        setProduct(loaded);
        form.setFieldsValue(productToFormValues(loaded));
        const mainImg = (loaded.images ?? []).find((i) => i.isMain);
        setMainProductImageId(mainImg?.id ?? loaded.images?.[0]?.id ?? null);
        setMainProductImageIndex(-1);
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
        const newFiles = productImageFileList
          .map((f) => f.originFileObj ?? f)
          .filter((f) => f instanceof File) as File[];
        const mainFileItem = productImageFileList[mainProductImageIndex];
        const mainFile =
          mainFileItem != null
            ? (mainFileItem.originFileObj ?? mainFileItem)
            : null;
        const mainFileResolved =
          mainFile instanceof File ? mainFile : null;
        const remainingExistingIds = (product?.images ?? []).map((i) => i.id).filter(
          (imageId) => !deletedProductImageIds.includes(imageId),
        );
        const hasNewMain = mainFileResolved != null;
        const effectiveMainExistingId =
          !hasNewMain &&
          mainProductImageId != null &&
          remainingExistingIds.includes(mainProductImageId)
            ? mainProductImageId
            : null;
        const mainProductImageFileToSend = hasNewMain ? mainFileResolved : null;
        const otherNewFiles =
          mainProductImageFileToSend != null
            ? newFiles.filter((f) => f !== mainProductImageFileToSend)
            : newFiles;
        const storyFilesToSend = storyImageFileList
          .map((f) => f.originFileObj ?? f)
          .filter((f) => f instanceof File) as File[];
        const formData = productValuesToUpdateFormData({
          values,
          newProductImageFiles: otherNewFiles,
          mainProductImageFile: mainProductImageFileToSend,
          mainExistingImageId: effectiveMainExistingId,
          deletedImageIds: [...deletedProductImageIds],
          deletedStoryImageIds: [...deletedStoryImageIds],
          storyImageFiles: storyFilesToSend,
        });
        await adminProductsApi.update(id!, formData);
        void message.success(t("admin.updateSuccess"));
        navigate(ROUTES.ADMIN_PRODUCTS);
      }
    } catch (err) {
      const apiMessage = getApiErrorMessage(err);
      void message.error(
        apiMessage ?? (create ? t("admin.createFailed") : t("admin.updateFailed")),
      );
    } finally {
      setSubmitting(false);
    }
  };

  /** Delete existing product image (id from BE). On submit we send this id in deletedImageIds. */
  const handleDeleteProductImage = useCallback((_productId: string, imageId: string) => {
    setDeletedProductImageIds((prev) =>
      prev.includes(imageId) ? prev : [...prev, imageId],
    );
    if (mainProductImageId === imageId) {
      const remaining = (product?.images ?? [])
        .filter((img) => img.id !== imageId && !deletedProductImageIds.includes(img.id));
      setMainProductImageId(remaining[0]?.id ?? null);
    }
  }, [mainProductImageId, product?.images, deletedProductImageIds]);

  /** Delete existing story image (id from BE). On submit we send this id in deletedStoryImageIds. */
  const handleDeleteStoryImage = useCallback((_productId: string, imageId: string) => {
    setDeletedStoryImageIds((prev) =>
      prev.includes(imageId) ? prev : [...prev, imageId],
    );
  }, []);

  const setProductImageFileListWithMain = useCallback(
    (fileList: UploadFile[]) => {
      const prevLength = productImageFileListLengthRef.current;
      productImageFileListLengthRef.current = fileList.length;
      setProductImageFileList(fileList);
      if (create) {
        setMainProductImageIndex((prev) =>
          prev >= fileList.length ? Math.max(0, fileList.length - 1) : prev,
        );
      } else {
        if (fileList.length > prevLength) {
          setMainProductImageIndex(-1);
        } else {
          setMainProductImageIndex((prev) =>
            prev >= fileList.length ? -1 : prev,
          );
        }
      }
    },
    [create],
  );

  /** Existing product images still shown (not deleted by user). */
  const remainingProductImages = (product?.images ?? []).filter(
    (img: ProductImage) => !deletedProductImageIds.includes(img.id),
  );
  /** Existing story images still shown (not deleted by user). */
  const remainingStoryImages = (product?.storyImages ?? []).filter(
    (img) => !deletedStoryImageIds.includes(img.id),
  );

  /** Set main to an existing image (or null); clears any new-file main so only one favorite. */
  const setMainToExistingImage = useCallback((imageId: string | null) => {
    setMainProductImageId(imageId);
    setMainProductImageIndex(-1);
  }, []);
  /** Set main to a new file by index; clears any existing main so only one favorite. */
  const setMainToNewFileIndex = useCallback((idx: number) => {
    setMainProductImageIndex(idx);
    if (idx >= 0) setMainProductImageId(null);
  }, []);

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
    setMainProductImageIndex: setMainToNewFileIndex,
    mainProductImageId,
    setMainProductImageId: setMainToExistingImage,
    deletedProductImageIds,
    deletedStoryImageIds,
    remainingProductImages,
    remainingStoryImages,
    handleSubmit,
    handleDeleteProductImage,
    handleDeleteStoryImage,
    initialValues: PRODUCT_EDIT_DEFAULTS,
    navigateToProducts: () => navigate(ROUTES.ADMIN_PRODUCTS),
  };
  return out;
};

export type UseProductEditFormReturn = ReturnType<typeof useProductEditForm>;
