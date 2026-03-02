/** Request body for POST /v1/contact (ContactUs) */
export type ContactUsRequest = {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phoneNumber: string | null;
  subject: string | null;
  message: string | null;
  isSubscription: boolean;
};
