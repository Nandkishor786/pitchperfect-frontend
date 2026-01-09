import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import TrustedBy from "../Components/TrustedBy";
import Services from "../Components/Services";
import OurWork from "../Components/OurWork";
import Teams from "../Components/Teams";
import ContactUs from "../Components/ContactUs";
import Footer from "../Components/Footer";
import Challenges from "../Components/Challenges";
import GetStart from "../Components/GetStart";

const Home = ({ theme, setTheme }) => {
  return (
    <>  
      <Navbar theme={theme} setTheme={setTheme} />
      <Hero />
      <TrustedBy />
      <Challenges />
      <Services />
      <OurWork />
      <Teams />
      <GetStart />
      {/* <ContactUs /> */}
      <Footer theme={theme} />
    </>
  );
};

export default Home;
