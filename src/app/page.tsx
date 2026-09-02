import { Dashboard } from "@/app/components/Dashboard";
import { createSyntheticRegistry } from "@/lib/connectors/mock-connectors";
import { buildExecutiveSnapshot } from "@/lib/orchestrator";

export default async function Home() {
  const snapshot = await buildExecutiveSnapshot(createSyntheticRegistry());
  return <Dashboard snapshot={snapshot} />;
}
