// import {redirect} from "next/navigation";
import Footer from "@/components/footer";
import {Header} from "@/components/header/header";

export default function Home() {
  // redirect("/products");
  return (
    <>
      <Header /> <Footer />
    </>
  );
}
