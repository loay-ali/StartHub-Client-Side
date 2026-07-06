import {
  buildLocalizedPath,
  getActiveLanguage,
  getCurrentLocale,
  LANGUAGES,
  shouldCloseDropdown,
} from "./languageSwitcher.logic";

import { describe, expect, it } from "vitest";

describe("getCurrentLocale", () => {
  it("returns en", () => {
    expect(getCurrentLocale("/en/dashboard")).toBe("en");
  });

  it("returns ar", () => {
    expect(getCurrentLocale("/ar/dashboard")).toBe("ar");
  });

  it("returns fr", () => {
    expect(getCurrentLocale("/fr/dashboard")).toBe("fr");
  });

  it("falls back to en", () => {
    expect(getCurrentLocale("/dashboard")).toBe("en");
  });

  it("falls back for unknown locale", () => {
    expect(getCurrentLocale("/es/dashboard")).toBe("en");
  });

  it("handles empty pathname", () => {
    expect(getCurrentLocale("")).toBe("en");
  });
});

describe("getActiveLanguage", () => {
  it("returns English", () => {
    expect(getActiveLanguage("/en").nativeLabel).toBe("EN");
  });

  it("returns Arabic", () => {
    expect(getActiveLanguage("/ar").nativeLabel).toBe("AR");
  });

  it("returns French", () => {
    expect(getActiveLanguage("/fr").nativeLabel).toBe("FR");
  });

  it("falls back to first language", () => {
    expect(getActiveLanguage("/es", LANGUAGES)).toEqual(LANGUAGES[0]);
  });
});

describe("buildLocalizedPath", () => {
  it("changes en to ar", () => {
    expect(
      buildLocalizedPath("/en/dashboard", "ar")
    ).toBe("/ar/dashboard");
  });

  it("changes ar to fr", () => {
    expect(
      buildLocalizedPath("/ar/dashboard", "fr")
    ).toBe("/fr/dashboard");
  });

  it("changes fr to en", () => {
    expect(
      buildLocalizedPath("/fr/dashboard", "en")
    ).toBe("/en/dashboard");
  });

  it("adds locale if missing", () => {
    expect(
      buildLocalizedPath("/dashboard", "en")
    ).toBe("/en/dashboard");
  });

  it("handles root path", () => {
    expect(
      buildLocalizedPath("/", "ar")
    ).toBe("/ar/");
  });
});

describe("shouldCloseDropdown", () => {
  it("returns true when dropdown is null", () => {
    expect(
      shouldCloseDropdown(null, document.body)
    ).toBe(true);
  });

  it("returns true when click target is null", () => {
    const div = document.createElement("div");

    expect(
      shouldCloseDropdown(div, null)
    ).toBe(true);
  });

  it("returns false when clicking inside dropdown", () => {
    const div = document.createElement("div");
    const child = document.createElement("button");

    div.appendChild(child);

    expect(
      shouldCloseDropdown(div, child)
    ).toBe(false);
  });

  it("returns true when clicking outside dropdown", () => {
    const div = document.createElement("div");
    const outside = document.createElement("div");

    expect(
      shouldCloseDropdown(div, outside)
    ).toBe(true);
  });
});