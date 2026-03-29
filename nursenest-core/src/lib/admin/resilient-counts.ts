/**
 * Admin diagnostics: never throw — return zero + warning for partial outages.
 */
export async function safePrismaCount(
  label: string,
  run: () => Promise<number>,
): Promise<{ value: number; warning?: string }> {
  try {
    return { value: await run() };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { value: 0, warning: `${label}: ${msg.slice(0, 280)}` };
  }
}
