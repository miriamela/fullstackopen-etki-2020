import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog/>", () => {
  let component;
  let mockHandler;
  let user;
  beforeEach(() => {
    user = "testUser";
    const blog = {
      title: "Solving ESLint and Prettier’s battle for supremacy",
      author: "David Kezi",
      url:
        "https://medium.com/@daveed_kz/eslint-and-prettier-battle-for-supremacy-f2657c9cf950",
      user: { user },
    };

    mockHandler = jest.fn();
    component = render(
      <Blog blog={blog} user={user} updateBlog={mockHandler} />
    );
  });
  test("render title and author", () => {
    const div = component.container.querySelector(".blog");
    expect(div).toHaveTextContent(
      "Solving ESLint and Prettier’s battle for supremacy, David Kezi"
    );
    const section = component.container.querySelector(".details");
    expect(section).toHaveStyle("display:none");
  });
  test("Showing url and likes when view button is clicked", () => {
    const button = component.getByText("view");
    fireEvent.click(button);
    const section = component.container.querySelector(".details");
    expect(section).not.toHaveStyle("display:none");
  });
  test("click on like button", () => {
    const button = component.getByText("like");
    fireEvent.click(button);
    fireEvent.click(button);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
