import { Drawer, Button, Empty } from "antd";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCart } from "src/app/providers/CartProvider";
import { ROUTES } from "src/consts/routes";
import { formatPrice } from "src/utils/formatPrice";
import { getProductName, getProductDescription } from "src/utils/productLocale";
import type { CartSidebarProps } from "./types";
import styles from "./styles.module.css";

const DEFAULT_CURRENCY = "AMD";

const CartSidebar: React.FC<CartSidebarProps> = ({ open, onClose }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, setOpenSidebar } = useCart();

  const lang = i18n.language;
  const totalAmount = items.reduce((sum, i) => sum + (i.price ?? 0) * i.quantity, 0);

  const handleCheckout = () => {
    onClose();
    setOpenSidebar(false);
    navigate(ROUTES.CHECKOUT);
  };

  return (
    <Drawer
      title={<span className={styles.title}>{t("cart.title")}</span>}
      placement="right"
      onClose={onClose}
      open={open}
      size={400}
      classNames={{ wrapper: styles.drawer }}
      closable={{ placement: "end" }}
      destroyOnClose
    >
      <div className={styles.list}>
        {items.length === 0 ? (
          <div className={styles.emptyWrap}>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={t("cart.empty")}
              className={styles.empty}
            >
              <Button
                type="primary"
                onClick={() => {
                  onClose();
                  setOpenSidebar(false);
                  navigate(ROUTES.CATALOG);
                }}
              >
                {t("cart.continueShopping")}
              </Button>
            </Empty>
          </div>
        ) : (
          items.map((item) => {
            const name = getProductName(item, lang);
            const description = getProductDescription(item, lang);
            const imgUrl = item.mainImageUrl ?? undefined;
            return (
              <div key={item.id} className={styles.item}>
                <div className={styles.imageWrap}>
                  {imgUrl ? (
                    <img
                      src={encodeURI(imgUrl)}
                      alt={name}
                      className={styles.image}
                    />
                  ) : (
                    <div className={styles.image} />
                  )}
                </div>
                <div className={styles.itemBody}>
                  <span className={styles.itemName}>{name}</span>
                  {description ? (
                    <span className={styles.itemDesc}>{description}</span>
                  ) : null}
                  <div className={styles.itemMeta}>
                    <div className={styles.quantityControls}>
                      <Button
                        type="text"
                        icon={<MinusOutlined />}
                        onClick={() =>
                          updateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                        disabled={item.quantity <= 1}
                        className={styles.quantityBtn}
                        aria-label={t("product.quantityDecrease")}
                      />
                      <span className={styles.quantityValue}>
                        {item.quantity}
                      </span>
                      <Button
                        type="text"
                        icon={<PlusOutlined />}
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className={styles.quantityBtn}
                        aria-label={t("product.quantityIncrease")}
                      />
                    </div>
                    <span className={styles.itemPrice}>
                      {formatPrice(
                        (item.price ?? 0) * item.quantity,
                        DEFAULT_CURRENCY,
                        lang,
                      )}
                    </span>
                    <Button
                      type="text"
                      size="small"
                      icon={<DeleteOutlined />}
                      onClick={() => removeItem(item.id)}
                      aria-label={t("cart.remove")}
                    />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {items.length > 0 && (
        <div className={styles.footer}>
          <div className={styles.totalRow}>
            <span className={styles.totalLabel}>{t("cart.total")}</span>
            <span className={styles.totalValue}>
              {formatPrice(totalAmount, DEFAULT_CURRENCY, lang)}
            </span>
          </div>
          <Button
            type="primary"
            size="large"
            block
            className={styles.checkoutBtn}
            onClick={handleCheckout}
          >
            {t("cart.checkout")}
          </Button>
        </div>
      )}
    </Drawer>
  );
};

export default CartSidebar;
