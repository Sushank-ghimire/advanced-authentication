import { createLazyFileRoute } from "@tanstack/react-router";
import useTitle from "../hooks/useTitle";

export const Route = createLazyFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  useTitle({ title: "Home page title" });
  return <div className="h-screen w-screen text-4xl font-bold">Hello "/"!</div>;
}
