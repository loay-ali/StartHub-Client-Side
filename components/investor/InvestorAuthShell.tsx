// src/components/investor/InvestorAuthShell.tsx
//
// Shared split-screen layout for the Login, Register, and Verify Email
// steps of the investor flow — benefits slider on the left, form
// content (passed as children) on the right.
import type { ReactNode } from "react";
import InvestorAuthSlider from "./InvestorAuthSlider";
import styles from "./investor.module.css";

export default function InvestorAuthShell({ children }: { children: ReactNode }) {
  return (
    <div className={styles.authShell}>
      <InvestorAuthSlider />
      {children}
    </div>
  );
}