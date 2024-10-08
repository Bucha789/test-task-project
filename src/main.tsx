import { createRoot } from "react-dom/client";
import { Router } from "./router";
import { Provider } from "react-redux";
import { store } from "./store";
//using bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
//using custom css
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import './index.css';

//importing the dayjs plugin to have the relative time with dayjs like "2 hours ago"
dayjs.extend(relativeTime);

const node = document.getElementById("root");

if (node) {
  createRoot(node).render(
    <Provider store={store}>
      <Router />
    </Provider>
  );
}