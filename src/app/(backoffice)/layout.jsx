import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
