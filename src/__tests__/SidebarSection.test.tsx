import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import SidebarSection from "../../components/layout/sidebar/SidebarSection";

describe("SidebarSection", () => {
  it("should render section title", () => {
    render(<SidebarSection title="Features" />);

    expect(screen.getByText("Features")).toBeInTheDocument();
  });
  it("should render h2 element", () => {
    render(<SidebarSection title="Features" />);

    const heading = screen.getByRole("heading", {
      level: 2,
    });

    expect(heading).toBeInTheDocument();
  });
  it("should render correct title", () => {
    render(<SidebarSection title="Company" />);

    const heading = screen.getByRole("heading", {
      level: 2,
    });

    expect(heading).toHaveTextContent("Company");
  });
});
