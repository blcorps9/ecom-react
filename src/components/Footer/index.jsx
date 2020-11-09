import React from "react";
// import { withRouter } from "react-router-dom";

import Hr from "../Hr";
import Brands from "./Brands";
import CopyRights from "./CopyRights";
import PaymentCards from "../PaymentCards";
import InfoSection from "./InfoSection";

import { SITE_NAME, BRANDS, PAYMENT_CARDS } from "../../config";

export default function Footer({ onNavigateTo }) {
  return (
    <div className="app-footer">
      <Brands brands={BRANDS} />
      <Hr style={{ backgroundColor: "#fff" }} />
      <InfoSection onNavigateTo={onNavigateTo} />
      <Hr style={{ backgroundColor: "#fff" }} />
      <div className="footer-bottom">
        <CopyRights siteName={SITE_NAME} />
        <PaymentCards cards={PAYMENT_CARDS} />
      </div>
    </div>
  );
}

// export default withRouter(Footer);
