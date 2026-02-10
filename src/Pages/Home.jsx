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
import { useRef } from "react";

const Home = ({ theme, setTheme }) => {
  const servicesRef = useRef(null);
  const workRef = useRef(null);
  const contactUsRef = useRef(null);

  const scrollTo = (ref) => {
    ref?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar
        theme={theme}
        setTheme={setTheme}
        scrollTo={scrollTo}
        refs={{
          servicesRef,
          workRef,
          contactUsRef,
        }}
      />
      <Hero />
      <TrustedBy />
      <Challenges />
      <div ref={servicesRef}>
        <Services />
      </div>
      <div ref={workRef} >
        <OurWork />
      </div>
      <Teams />
      <div ref={contactUsRef} >
        <ContactUs />
      </div>
      <GetStart />
      <Footer theme={theme} />
    </>
  );
};

export default Home;
