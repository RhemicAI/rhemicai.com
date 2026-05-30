import { describe, it, expect } from "vitest";
import { respVal } from "@/app/api/cal-webhook/route";

describe("respVal", () => {
  it("returns a plain string value as-is", () => {
    expect(respVal({ "lead-source": "consult-leak-calculator" }, "lead-source")).toBe(
      "consult-leak-calculator",
    );
  });

  it("extracts the value property from a Cal v2 object shape", () => {
    expect(
      respVal(
        { "clinic-website": { label: "Clinic Website", value: "https://example.com", isHidden: false } },
        "clinic-website",
      ),
    ).toBe("https://example.com");
  });

  it("returns empty string when key is missing", () => {
    expect(respVal({}, "missing-key")).toBe("");
  });

  it("returns empty string when object shape has no string value", () => {
    expect(respVal({ field: { label: "X" } }, "field")).toBe("");
  });

  it("returns empty string for null value", () => {
    expect(respVal({ field: null }, "field")).toBe("");
  });
});
