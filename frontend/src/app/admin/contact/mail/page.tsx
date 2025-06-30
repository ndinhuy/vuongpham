import { EmailContacts } from "@app/components";
import { FC } from "react";

type ContactMailPageProps = {};

const ContactMailPage: FC<ContactMailPageProps> = ({}: ContactMailPageProps) => {
  return <EmailContacts />;
};

export default ContactMailPage;
