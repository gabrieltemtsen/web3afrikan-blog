import { useEffect } from "react";
import { useRouter } from "next/router";

const RedirectPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/articles");
  }, []);

  return null;
};

export default RedirectPage;