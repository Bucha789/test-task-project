import { createRoot } from "react-dom/client";
import { Router } from "./router";
import { Provider } from "react-redux";
import { store } from "./store";
//using bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
//using custom css
import './index.css';

const node = document.getElementById("root");

if (node) {
  createRoot(node).render(
    <Provider store={store}>
      <Router />
    </Provider>
  );
}