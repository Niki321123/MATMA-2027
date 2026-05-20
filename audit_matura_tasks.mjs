globalThis.window = globalThis;
await import("./js/data/matura_tasks.js");

const tasks = window.MaturaTasks.getAll();
const patterns = [
  /\( \)/,
  /= ,/,
  /cid:/,
  /||||||||/,
  /Zadanie \d+\. \(0/,
  /a = ,/,
];

const bad = [];
for (const task of tasks) {
  const hits = patterns.filter((pattern) => pattern.test(task.statement)).map(String);
  if (hits.length || task.statement.length < 60) {
    bad.push({
      id: task.id,
      year: task.year,
      number: task.number,
      category: task.categoryName,
      hits,
      statement: task.statement.slice(0, 360),
    });
  }
}

console.log("total", tasks.length, "bad-ish", bad.length);
for (const item of bad) {
  console.log(`\n${item.id} ${item.hits.join(" | ")}`);
  console.log(item.statement);
}
