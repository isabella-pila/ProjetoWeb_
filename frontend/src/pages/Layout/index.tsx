// src/pages/Layout/index.tsx
import { Footer } from "../../components/Footer";
import { SMain } from "./styles";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <>
      <SMain>
        <Outlet />
      </SMain>
      <Footer />
    </>
  );
}
