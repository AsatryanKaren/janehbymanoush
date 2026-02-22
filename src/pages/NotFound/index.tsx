import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES } from "src/consts/routes";

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Result
      status="404"
      title={t("notFound.code")}
      subTitle={t("notFound.message")}
      extra={
        <Link to={ROUTES.HOME}>
          <Button type="primary" size="large">
            {t("notFound.backHome")}
          </Button>
        </Link>
      }
    />
  );
};

export default NotFoundPage;
