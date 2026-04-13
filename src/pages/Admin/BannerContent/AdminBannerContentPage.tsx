import { useState, useEffect, useCallback } from "react";
import {
  Typography,
  Flex,
  App,
  Upload,
  Card,
  Tag,
  Button,
  Skeleton,
  type UploadProps,
} from "antd";
import { UploadOutlined, ReloadOutlined } from "@ant-design/icons";
import { adminBannerContentApi } from "src/api/adminBannerContent";
import { getBannerContent } from "src/api/bannerContent";
import type { BannerContent } from "src/types/banner";
import BannerContentMedia from "src/components/BannerContentMedia";
import styles from "./styles.module.css";

const { Text } = Typography;

const AdminBannerContentPage: React.FC = () => {
  const { message } = App.useApp();
  const [lastResult, setLastResult] = useState<BannerContent | null>(null);
  const [uploading, setUploading] = useState(false);
  const [live, setLive] = useState<BannerContent | null>(null);
  const [liveLoading, setLiveLoading] = useState(true);

  const refreshLive = useCallback(() => {
    setLiveLoading(true);
    return getBannerContent()
      .then((res) => {
        if (res?.url?.trim()) setLive(res);
        else setLive(null);
      })
      .catch(() => setLive(null))
      .finally(() => {
        setLiveLoading(false);
      });
  }, []);

  useEffect(() => {
    void refreshLive();
  }, [refreshLive]);

  const customRequest: UploadProps["customRequest"] = (options) => {
    const { file, onSuccess, onError } = options;
    const raw = file as File | { originFileObj?: File };
    const blob =
      raw instanceof File ? raw : raw.originFileObj instanceof File ?
        raw.originFileObj
      : null;
    if (!blob) {
      onError?.(new Error("Invalid file"));
      return;
    }
    setUploading(true);
    adminBannerContentApi
      .upload(blob)
      .then((res) => {
        setLastResult(res);
        onSuccess?.(res);
        void message.success("Banner media uploaded");
        void refreshLive();
      })
      .catch(() => {
        onError?.(new Error("Upload failed"));
        void message.error("Upload failed");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  return (
    <Flex vertical gap="large" className={styles.root}>
      <Card size="small">
        <Button
          type="text"
          icon={<ReloadOutlined />}
          loading={liveLoading}
          onClick={() => void refreshLive()}
        >
          Refresh
        </Button>
        <div className={styles.previewBlock}>
          {liveLoading ?
            <Skeleton active paragraph={{ rows: 2 }} />
          : live?.url?.trim() ?
            <Flex vertical gap="small">
              <Flex align="center" gap="small" wrap="wrap">
                <Tag color={live.isVideo ? "blue" : "green"}>
                  {live.isVideo ? "Video" : "Image"}
                </Tag>
              </Flex>
              <div className={styles.previewFrame}>
                <BannerContentMedia
                  url={live.url}
                  isVideo={live.isVideo}
                  showVideoControls
                />
              </div>
              <Text
                copyable={{ text: live.url, tooltips: ["Copy URL", "Copied"] }}
                className={styles.urlLink}
              >
                Copy public banner URL
              </Text>
            </Flex>
          : <Text type="secondary">
              No banner URL from GET /v1/banner-content.
            </Text>
          }
        </div>
      </Card>

      <Upload
        accept="image/*,video/*"
        maxCount={1}
        showUploadList={false}
        customRequest={customRequest}
        disabled={uploading}
      >
        <Button icon={<UploadOutlined />} loading={uploading}>
          Select image or video
        </Button>
      </Upload>
      {lastResult && (
        <Card size="small">
          <Flex vertical gap="small">
            <Flex align="center" gap="small" wrap="wrap">
              <Tag color={lastResult.isVideo ? "blue" : "green"}>
                {lastResult.isVideo ? "Video" : "Image"}
              </Tag>
            </Flex>
            <Text
              copyable={{
                text: lastResult.url,
                tooltips: ["Copy URL", "Copied"],
              }}
              className={styles.urlLink}
            >
              Copy uploaded URL
            </Text>
          </Flex>
        </Card>
      )}
    </Flex>
  );
};

export default AdminBannerContentPage;
