import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import MainLayout from "../Layouts/MainLayout";

export const Route = createRootRoute({
  component: () => (
    <>
      <MainLayout>
        <Outlet />
      </MainLayout>
      <TanStackRouterDevtools />
    </>
  ),
});
