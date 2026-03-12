const imageExtensions = ['.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif'];

export async function resolve(specifier, context, nextResolve) {
  const ext = imageExtensions.find(e => specifier.endsWith(e));
  if (ext) {
    return {
      url: `data:text/javascript,export default ""`,
      shortCircuit: true,
    };
  }
  return nextResolve(specifier, context);
}
