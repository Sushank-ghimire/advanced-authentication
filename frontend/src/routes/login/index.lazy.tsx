import { createLazyFileRoute, Link } from "@tanstack/react-router";
import MainLayout from "../../Layouts/MainLayout";
import LoginForm from "../../components/LoginForm";
import { motion } from "framer-motion";

export const Route = createLazyFileRoute("/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MainLayout>
      <div className="w-full min-h-screen flex justify-center items-center pt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
              Welcome Back
            </h2>
            <LoginForm />
          </div>
          <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{" "}
              <Link href="/signup" className="text-green-400 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
