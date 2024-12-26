import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="md:container w-[90vw] mx-auto h-full md:w-full text-xl md:text-2xl p-4">
      Hello World
    </section>
  );
}
