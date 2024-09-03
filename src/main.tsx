import { createRoot } from "react-dom/client";
//using bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
//using custom css
import './index.css';
import { Router } from "./router";

const node = document.getElementById("root");

if (node) {
  createRoot(node).render(<Router/>);
}