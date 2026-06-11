import { PinnedFocus } from "@/components/motion";
import { scrollStatements } from "@/data/siteData";

export function PinnedSection() {
  return <PinnedFocus items={scrollStatements} />;
}
