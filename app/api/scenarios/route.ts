import { NextResponse } from "next/server";
import type { ScenarioDefinition } from "../../data/scenarios";
import { readScenarios } from "../../data/scenario-store";

export async function GET() {
  try {
    const scenarios = (await readScenarios()) as ScenarioDefinition[];
    return NextResponse.json(
      scenarios.map(({ id, title, difficulty }) => ({ id, title, difficulty, patient: "Пациент" })),
    );
  } catch (error) {
    console.error("Failed to read scenarios", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to read scenarios" }, { status: 500 });
  }
}
