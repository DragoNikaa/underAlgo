import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Header from "../../app/components/Header/Header.tsx";
import Loader from "../../shared/components/Loader/Loader.tsx";

export default function MainLayout() {
  return (
    <>
      <Header />

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  );
}
