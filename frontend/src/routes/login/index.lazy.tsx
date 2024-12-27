import { createLazyFileRoute } from "@tanstack/react-router";
import MainLayout from "../../Layouts/MainLayout";

export const Route = createLazyFileRoute("/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <MainLayout>Hello Login</MainLayout>;
}
