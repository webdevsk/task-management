import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import "@fontsource-variable/inter"
import App from "./app/App.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
)

