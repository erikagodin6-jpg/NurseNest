import { generateRnLessons } from "./rn-lesson-generator";

async function main() {
  console.log("[Runner] Starting RN Lesson Library Generation...");
  const start = Date.now();

  try {
    const result = await generateRnLessons();
    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    
    console.log("\n========================================");
    console.log("  RN Lesson Library Generation Report");
    console.log("========================================");
    console.log(`  Lessons inserted:    ${result.lessonsInserted}`);
    console.log(`  Flashcards inserted: ${result.flashcardsInserted}`);
    console.log(`  Questions linked:    ${result.questionsLinked}`);
    console.log(`  Errors:              ${result.errors.length}`);
    console.log(`  Time elapsed:        ${elapsed}s`);
    console.log("========================================\n");
    
    if (result.errors.length > 0) {
      console.log("Errors:");
      result.errors.forEach((e, i) => console.log(`  ${i + 1}. ${e}`));
    }
    
    process.exit(0);
  } catch (err) {
    console.error("[Runner] Fatal error:", err);
    process.exit(1);
  }
}

main();
