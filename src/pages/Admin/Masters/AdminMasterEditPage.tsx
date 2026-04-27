import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { UploadFile } from "antd/es/upload/interface";
import {
  Form,
  Input,
  Button,
  Spin,
  Space,
  Typography,
  Flex,
  App,
  Card,
  Row,
  Col,
  Switch,
  Upload,
  Image,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useAdminTranslation } from "src/pages/Admin/useAdminTranslation";
import { adminMastersApi } from "src/api/adminMasters";
import { ROUTES } from "src/consts/routes";
import type { MasterFormValues } from "./types";
import { buildMasterFormData } from "./utils";
import styles from "./styles.module.css";

const { Title, Text } = Typography;
const { TextArea } = Input;

const FormSection: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <Card size="small" title={title} className={styles.sectionCard}>
    {children}
  </Card>
);

const isCreateMode = (id: string | undefined): boolean => id === undefined;

const AdminMasterEditPage: React.FC = () => {
  const { t } = useAdminTranslation();
  const { message } = App.useApp();
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm<MasterFormValues>();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageFileList, setImageFileList] = useState<UploadFile[]>([]);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);

  const create = isCreateMode(id);

  useEffect(() => {
    if (create) {
      form.setFieldsValue({ isActive: true });
      setExistingImageUrl(null);
      setImageFile(null);
      setImageFileList([]);
      return;
    }

    setLoading(true);
    setImageFile(null);
    setImageFileList([]);
    adminMastersApi
      .getAll()
      .then((res) => {
        const master = (res.items ?? []).find((m) => m.id === id);
        if (!master) {
          void message.error(t("admin.masters.notFound"));
          navigate(ROUTES.ADMIN_MASTERS);
          return;
        }
        setExistingImageUrl(master.imageUrl?.trim() || null);
        form.setFieldsValue({
          fullNameHy: master.fullNameHy ?? undefined,
          fullNameEn: master.fullNameEn ?? undefined,
          fullNameRu: master.fullNameRu ?? undefined,
          positionHy: master.positionHy ?? undefined,
          positionEn: master.positionEn ?? undefined,
          positionRu: master.positionRu ?? undefined,
          descriptionHy: master.descriptionHy ?? undefined,
          descriptionEn: master.descriptionEn ?? undefined,
          descriptionRu: master.descriptionRu ?? undefined,
          isActive: master.isActive,
        });
      })
      .catch(() => {
        void message.error(t("admin.loadFailed"));
      })
      .finally(() => setLoading(false));
  }, [id, create, form, message, navigate, t]);

  const handleSubmit = async (values: MasterFormValues) => {
    const hasName =
      values.fullNameHy?.trim() ||
      values.fullNameEn?.trim() ||
      values.fullNameRu?.trim();
    if (!hasName) {
      void message.error(t("admin.makers.nameAtLeastOneRequired"));
      return;
    }
    setSubmitting(true);
    const fd = buildMasterFormData({
      fullNameHy: values.fullNameHy,
      fullNameEn: values.fullNameEn,
      fullNameRu: values.fullNameRu,
      positionHy: values.positionHy,
      positionEn: values.positionEn,
      positionRu: values.positionRu,
      descriptionHy: values.descriptionHy,
      descriptionEn: values.descriptionEn,
      descriptionRu: values.descriptionRu,
      isActive: values.isActive ?? true,
      imageFile,
    });
    try {
      if (create) {
        await adminMastersApi.create(fd);
        void message.success(t("admin.createSuccess"));
      } else {
        await adminMastersApi.update(id!, fd);
        void message.success(t("admin.updateSuccess"));
      }
      navigate(ROUTES.ADMIN_MASTERS);
    } catch {
      void message.error(create ? t("admin.createFailed") : t("admin.updateFailed"));
    } finally {
      setSubmitting(false);
    }
  };

  if (!create && loading) {
    return (
      <Flex justify="center" align="center" className={styles.loadingMin}>
        <Spin size="large" />
      </Flex>
    );
  }

  return (
    <>
      <Title level={2}>
        {create ? t("admin.masters.add") : t("admin.masters.edit")}
      </Title>
      <Form<MasterFormValues>
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className={styles.formMax}
      >
        <FormSection title={t("admin.makers.sectionNamesAndRole")}>
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item
                name="fullNameHy"
                label={`${t("admin.makers.fieldName")} (HY)`}
              >
                <Input placeholder={t("admin.makers.fieldName")} />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="fullNameEn"
                label={`${t("admin.makers.fieldName")} (EN)`}
              >
                <Input placeholder={t("admin.makers.fieldName")} />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="fullNameRu"
                label={`${t("admin.makers.fieldName")} (RU)`}
              >
                <Input placeholder={t("admin.makers.fieldName")} />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="positionHy"
                label={`${t("admin.makers.fieldRole")} (HY)`}
              >
                <Input placeholder={t("admin.makers.fieldRole")} />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="positionEn"
                label={`${t("admin.makers.fieldRole")} (EN)`}
              >
                <Input placeholder={t("admin.makers.fieldRole")} />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="positionRu"
                label={`${t("admin.makers.fieldRole")} (RU)`}
              >
                <Input placeholder={t("admin.makers.fieldRole")} />
              </Form.Item>
            </Col>
          </Row>
        </FormSection>
        <FormSection title={t("admin.makers.sectionDescriptions")}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="descriptionHy"
                label={`${t("admin.makers.fieldDescription")} (HY)`}
              >
                <TextArea rows={4} placeholder={t("admin.makers.fieldDescription")} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="descriptionEn"
                label={`${t("admin.makers.fieldDescription")} (EN)`}
              >
                <TextArea rows={4} placeholder={t("admin.makers.fieldDescription")} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="descriptionRu"
                label={`${t("admin.makers.fieldDescription")} (RU)`}
              >
                <TextArea rows={4} placeholder={t("admin.makers.fieldDescription")} />
              </Form.Item>
            </Col>
          </Row>
        </FormSection>
        <FormSection title={t("admin.makers.sectionImage")}>
          <Text type="secondary" className={styles.imageHint}>
            {t("admin.makers.imageUploadHint")}
          </Text>
          {existingImageUrl && imageFileList.length === 0 && !create ? (
            <div className={styles.existingImageWrap}>
              <Image
                src={existingImageUrl}
                alt=""
                className={styles.existingImage}
                preview
              />
            </div>
          ) : null}
          <div className={styles.uploadBlock}>
            <Upload
              accept="image/*"
              maxCount={1}
              fileList={imageFileList}
              beforeUpload={() => false}
              onChange={({ fileList }) => {
                setImageFileList(fileList);
                const raw = fileList[0]?.originFileObj;
                setImageFile(raw instanceof File ? raw : null);
              }}
            >
              <Button icon={<UploadOutlined />}>
                {t("admin.makers.uploadImage")}
              </Button>
            </Upload>
          </div>
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item
                name="isActive"
                label={t("admin.columnActive")}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>
        </FormSection>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={submitting}>
              {t("admin.saveChanges")}
            </Button>
            <Button onClick={() => navigate(ROUTES.ADMIN_MASTERS)}>
              {t("admin.cancel")}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default AdminMasterEditPage;
