import { createLazyFileRoute } from "@tanstack/react-router";
import MainLayout from "../../Layouts/MainLayout";
import SignUp from "../../components/SignUp";

export const Route = createLazyFileRoute("/signup/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MainLayout>
      <SignUp />
    </MainLayout>
  );
}
