import { createRoot } from "react-dom/client";
import { App } from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';

const node = document.getElementById("root");

if (node) {
  createRoot(node).render(<App />);
}