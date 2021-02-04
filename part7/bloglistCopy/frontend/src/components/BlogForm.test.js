import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import BlogForm from "./BlogForm";

describe("<BlogForm/>", () => {
  test("calling eventHandler when blog is created", () => {
    const createNewBlog = jest.fn();
    const component = render(<BlogForm createNewBlog={createNewBlog} />);

    const title = component.container.querySelector("#title");
    const author = component.container.querySelector("#author");
    const url = component.container.querySelector("#url");
    const form = component.container.querySelector(".form");
    fireEvent.change(title, {
      target: { value: "Solving ESLint and Prettier’s battle for supremacy" },
    });
    fireEvent.change(author, {
      target: { value: "David Kezi" },
    });
    fireEvent.change(url, {
      target: {
        value:
          "https://medium.com/@daveed_kz/eslint-and-prettier-battle-for-supremacy-f2657c9cf950",
      },
    });
    fireEvent.submit(form);
  });
});
