import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import Provider from "../context/Provider";

const Layout = ({ children }) => {
  return (
    <div>
      <Provider>
        <Header />
        {children}
        <Footer />
      </Provider>
    </div>
  );
};

export default Layout;
