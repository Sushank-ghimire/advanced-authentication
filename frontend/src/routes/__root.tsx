import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import MainLayout from "../Layouts/MainLayout";
import NotFoundPage from "../components/NotFound";

export const Route = createRootRoute({
  component: () => (
    <>
      <MainLayout>
        <Outlet />
      </MainLayout>
      <TanStackRouterDevtools />
    </>
  ),
  notFoundComponent: () => {
    return (
      <MainLayout>
        <NotFoundPage />
      </MainLayout>
    );
  },
});
