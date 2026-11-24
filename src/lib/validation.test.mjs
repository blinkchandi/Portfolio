import assert from "node:assert/strict";
import { validateContactForm } from "./validation.ts";

function makeForm(fields) {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) fd.set(k, v);
  return fd;
}

// 1. Valid payload trims inputs and fills defaults
{
  const res = validateContactForm(
    makeForm({
      name: "  Alice Dupont ",
      email: "alice@example.com ",
      message: "Bonjour, je souhaite créer un ERP comptable.",
    })
  );
  assert.equal(res.ok, true);
  assert.equal(res.honeypot, undefined);
  assert.equal(res.data.name, "Alice Dupont");
  assert.equal(res.data.email, "alice@example.com");
  assert.equal(res.data.projectType, "Non précisé");
}

// 2. Honeypot bot is flagged silently
{
  const res = validateContactForm(
    makeForm({
      website: "https://spam.invalid",
      name: "Bot",
      email: "bot@spam.invalid",
      message: "Buy cheap links now!",
    })
  );
  assert.deepEqual(res, { ok: true, honeypot: true });
}

// 3. Invalid email rejected
{
  const res = validateContactForm(
    makeForm({
      name: "Alice",
      email: "not-an-email",
      message: "Message assez long pour passer la taille min.",
    })
  );
  assert.equal(res.ok, false);
}

// 4. Too short message rejected
{
  const res = validateContactForm(
    makeForm({
      name: "Alice",
      email: "alice@example.com",
      message: "Salut",
    })
  );
  assert.equal(res.ok, false);
}

console.log("validation.test.mjs: all 4 assertions passed");
