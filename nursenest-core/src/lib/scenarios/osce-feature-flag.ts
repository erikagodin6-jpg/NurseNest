/** Public env gates marketing OSCE tiles + in-app nav entry; scenario routes still render a gated upsell when false. */
export function isOsceScenariosPublicEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_OSCE_SCENARIOS === "true";
}
