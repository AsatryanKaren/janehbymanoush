import {
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Button,
  Space,
  Flex,
  Upload,
  Image,
  Card,
  Row,
  Col,
  Divider,
} from "antd";
import {
  DeleteOutlined,
  PlusOutlined,
  StarFilled,
  StarOutlined,
} from "@ant-design/icons";
import { useAdminTranslation } from "src/pages/Admin/useAdminTranslation";
import type { ProductImage, StoryImageDto } from "src/types/product";
import type { UseProductEditFormReturn } from "./useProductEditForm";
import type { ProductImagesUploadProps } from "./types";
import styles from "./ProductEditFormContent.module.css";

type ProductEditFormContentProps = UseProductEditFormReturn;

const GENDER_OPTIONS = [
  { label: "Women", value: 0 },
  { label: "Men", value: 1 },
];

/** Accepted image types for product and story uploads: PNG, JPG, WEBP, GIF, AVIF, SVG, BMP */
const ACCEPT_IMAGES =
  "image/png,image/jpeg,image/jpg,image/webp,image/gif,image/avif,image/svg+xml,image/bmp";

const FormSection: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <Card size="small" title={title} style={{ marginBottom: 16 }}>
    {children}
  </Card>
);

export const ProductEditFormContent = (
  props: ProductEditFormContentProps,
): React.ReactElement => {
  const {
    submitting,
    create,
    product,
    categoryOptions,
    productImageFileList,
    setProductImageFileListWithMain,
    storyImageFileList,
    setStoryImageFileList,
    mainProductImageIndex,
    setMainProductImageIndex,
    handleDeleteProductImage,
    handleDeleteStoryImage,
    navigateToProducts,
  } = props;
  const { t } = useAdminTranslation();

  return (
    <>
      <FormSection title={t("admin.productForm.sectionBasic")}>
        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item name="nameHy" label={t("admin.productName") + " (HY)"}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              name="nameEn"
              label={t("admin.productName") + " (EN)"}
              rules={[{ required: true, message: t("admin.productNameRequired") }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item name="nameRu" label={t("admin.productName") + " (RU)"}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="slug"
              label={t("admin.slug")}
              rules={[{ required: true, message: t("admin.slugRequired") }]}
            >
              <Input placeholder="e.g. silver-ring-gavith" />
            </Form.Item>
          </Col>
        </Row>
      </FormSection>

      <FormSection title={t("admin.productForm.sectionDescription")}>
        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item name="descriptionHy" label={t("admin.description") + " (HY)"}>
              <Input.TextArea autoSize={{ minRows: 3, maxRows: 12 }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item name="descriptionEn" label={t("admin.description") + " (EN)"}>
              <Input.TextArea autoSize={{ minRows: 3, maxRows: 12 }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item name="descriptionRu" label={t("admin.description") + " (RU)"}>
              <Input.TextArea autoSize={{ minRows: 3, maxRows: 12 }} />
            </Form.Item>
          </Col>
        </Row>
      </FormSection>

      <FormSection title={t("admin.productForm.sectionStory")}>
        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item name="storyHy" label={t("admin.story") + " (HY)"}>
              <Input.TextArea autoSize={{ minRows: 2, maxRows: 8 }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item name="storyEn" label={t("admin.story") + " (EN)"}>
              <Input.TextArea autoSize={{ minRows: 2, maxRows: 8 }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item name="storyRu" label={t("admin.story") + " (RU)"}>
              <Input.TextArea autoSize={{ minRows: 2, maxRows: 8 }} />
            </Form.Item>
          </Col>
        </Row>
      </FormSection>

      <FormSection title={t("admin.productForm.sectionSelling")}>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item name="gender" label={t("admin.gender")} rules={[{ required: true }]}>
              <Select options={GENDER_OPTIONS} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              name="category"
              label={t("admin.category")}
              rules={[{ required: true, message: t("admin.categoryRequired") }]}
            >
              <Select
                options={categoryOptions}
                placeholder={t("admin.categoryRequired")}
                loading={categoryOptions.length === 0}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              name="price"
              label={t("admin.price")}
              rules={[{ required: true, message: t("admin.priceRequired") }]}
            >
              <InputNumber min={0} precision={2} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
      </FormSection>

      <FormSection title={t("admin.productForm.sectionImages")}>
      {create && (
        <div className={styles.imagesSection}>
          <Flex vertical gap="large">
            <Form.Item
              label={t("admin.productImages")}
              tooltip={t("admin.productImagesTooltip")}
              style={{ marginBottom: 0 }}
            >
              <div className={styles.productImagesBlock} style={{ display: "block", marginBottom: 24 }}>
                <ProductImagesUpload
                fileList={productImageFileList}
                onFileListChange={setProductImageFileListWithMain}
                mainIndex={mainProductImageIndex}
                onMainIndexChange={setMainProductImageIndex}
                t={t}
                maxCount={10}
              />
              </div>
            </Form.Item>
            <Divider style={{ margin: "8px 0" }} />
            <Form.Item
              label={t("admin.storyImages")}
              tooltip={t("admin.storyImagesTooltip")}
              style={{ marginBottom: 0 }}
            >
              <div className={styles.storyImagesBlock} style={{ width: "100%" }}>
                <Upload
                  listType="picture-card"
                  fileList={storyImageFileList}
                  onChange={({ fileList }) => setStoryImageFileList(fileList)}
                  beforeUpload={() => false}
                  accept={ACCEPT_IMAGES}
                  maxCount={1}
                  style={{ width: "100%" }}
                >
                  {storyImageFileList.length >= 1 ? null : (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>{t("admin.uploadStoryImages")}</div>
                    </div>
                  )}
                </Upload>
              </div>
            </Form.Item>
          </Flex>
        </div>
      )}

      {!create && product && (
        <div className={styles.imagesSection}>
          <Flex vertical gap="large">
            <Form.Item
              label={t("admin.productImages")}
              tooltip={t("admin.productImagesTooltip")}
              style={{ marginBottom: 0 }}
            >
              <div className={styles.productImagesBlock} style={{ display: "block", marginBottom: 24 }}>
                <Flex gap="small" wrap>
                {(product.images ?? []).map((img: ProductImage) => (
                  <Flex key={img.id} vertical align="center" gap={4}>
                    <div style={{ position: "relative" }}>
                      <Image
                        src={img.url ?? undefined}
                        alt=""
                        width={80}
                        height={80}
                        style={{ objectFit: "cover" }}
                      />
                      {img.isMain && (
                        <StarFilled
                          style={{
                            position: "absolute",
                            top: 4,
                            right: 4,
                            color: "#faad14",
                            fontSize: 16,
                          }}
                          title={t("admin.setAsMain")}
                        />
                      )}
                    </div>
                    <Button
                      type="text"
                      size="small"
                      danger
                      icon={<DeleteOutlined />}
                      title={t("admin.delete")}
                      onClick={() =>
                        handleDeleteProductImage(product.id, img.id)
                      }
                    />
                  </Flex>
                ))}
                <ProductImagesUpload
                  fileList={productImageFileList}
                  onFileListChange={setProductImageFileListWithMain}
                  mainIndex={mainProductImageIndex}
                  onMainIndexChange={setMainProductImageIndex}
                  t={t}
                  showUploadList={{ showPreviewIcon: false }}
                  maxCount={10}
                />
                </Flex>
              </div>
            </Form.Item>
            <Divider style={{ margin: "8px 0" }} />
            <Form.Item
            label={t("admin.storyImages")}
            tooltip={t("admin.storyImagesTooltip")}
            style={{ marginBottom: 0 }}
          >
              <div className={styles.storyImagesBlock} style={{ width: "100%" }}>
                <Flex gap="small" wrap align="start">
                {(product.storyImages ?? []).map((img: StoryImageDto) => (
                  <Flex key={img.id} vertical align="center" gap={4}>
                    <Image
                      src={img.url ?? undefined}
                      alt=""
                      width={80}
                      height={80}
                      style={{ objectFit: "cover" }}
                    />
                    <Button
                      type="text"
                      size="small"
                      danger
                      icon={<DeleteOutlined />}
                      title={t("admin.delete")}
                      onClick={() =>
                        handleDeleteStoryImage(product.id, img.id)
                      }
                    />
                  </Flex>
                ))}
                <Upload
                  listType="picture-card"
                  fileList={storyImageFileList}
                  onChange={({ fileList }) => setStoryImageFileList(fileList)}
                  beforeUpload={() => false}
                  accept={ACCEPT_IMAGES}
                  maxCount={1}
                  showUploadList={{ showPreviewIcon: false }}
                  style={{ width: "100%" }}
                >
                  {storyImageFileList.length >= 1 ? null : (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>
                        {t("admin.uploadStoryImages")}
                      </div>
                    </div>
                  )}
                </Upload>
              </Flex>
            </div>
          </Form.Item>
          </Flex>
        </div>
      )}
      </FormSection>

      <FormSection title={t("admin.productForm.sectionStatus")}>
        <Row gutter={16}>
          <Col xs={24} sm={8}>
            <Form.Item
              name="isActive"
              label={t("admin.inStock")}
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              name="inStock"
              label={t("admin.inStockAvailable")}
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item name="isNew" label={t("admin.isNew")} valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
        </Row>
      </FormSection>

      <Divider />
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" loading={submitting}>
            {t("admin.saveChanges")}
          </Button>
          <Button onClick={navigateToProducts}>{t("admin.cancel")}</Button>
        </Space>
      </Form.Item>
    </>
  );
};

const ProductImagesUpload = ({
  fileList,
  onFileListChange,
  mainIndex,
  onMainIndexChange,
  t,
  showUploadList,
  maxCount = 10,
}: ProductImagesUploadProps): React.ReactElement => (
    <Upload
      listType="picture-card"
      fileList={fileList}
      onChange={({ fileList: next }) => onFileListChange(next)}
      beforeUpload={() => false}
      accept={ACCEPT_IMAGES}
      multiple
      maxCount={maxCount}
      showUploadList={showUploadList}
      itemRender={(originNode, file, fileList) => {
        const idx = fileList.findIndex((f) => f.uid === file.uid);
        const isMain = idx === mainIndex;
        return (
          <div style={{ position: "relative" }}>
            {originNode}
            <Button
              type="text"
              icon={
                isMain ? (
                  <StarFilled style={{ color: "#faad14" }} />
                ) : (
                  <StarOutlined />
                )
              }
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onMainIndexChange(idx);
              }}
              title={t("admin.setAsMain")}
              style={{
                position: "absolute",
                top: 4,
                right: 4,
                zIndex: 1,
              }}
              aria-label={t("admin.setAsMain")}
            />
          </div>
        );
      }}
    >
      {fileList.length >= maxCount ? null : (
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>{t("admin.uploadImages")}</div>
        </div>
      )}
    </Upload>
);
