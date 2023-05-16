import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DeliveryForm from "./DeliveryForm";

describe("DeliveryForm", () => {
  it("renders a form", () => {
    render(<DeliveryForm />);
    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("renders a name input", () => {
    render(<DeliveryForm />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });

  it("renders a phone number input", () => {
    render(<DeliveryForm />);
    expect(screen.getByLabelText("Phone Number")).toBeInTheDocument();
  });

  it("renders a submit button", () => {
    render(<DeliveryForm />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("submits the form", async () => {
    render(<DeliveryForm />);
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Test Name" },
    });
    fireEvent.change(screen.getByLabelText("Phone Number"), {
      target: { value: "1234567890" },
    });
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() =>
      expect(screen.getByText("Success!")).toBeInTheDocument()
    );
  });
});
