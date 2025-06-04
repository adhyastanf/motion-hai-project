
import LandingContent from "./LayoutClient";

export const metadata = {
  title: "Hai Motion",
  description: "Every line, every step — make it count.",
};

export default function LandingLayout({ children }) {
  return <LandingContent>{children}</LandingContent>;
}
