/* 
 @authors:
 Abdul Wahhab Alfaghiri Al Anzi   01524445
 Nouzad Mohammad                  00820679
*/
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
