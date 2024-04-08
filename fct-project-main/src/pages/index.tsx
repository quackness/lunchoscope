import Layout from "../components/Frontend/layout";
import Testimonial from "../components/Frontend/testimonial";
import Banner from "../components/Frontend/banner";
import Gallery from "../components/Frontend/gallery";
import { motion } from 'framer-motion'
import SelectSign from "@/components/Frontend/selectSign";
import ZodiacDisplay from "@/components/Frontend/zodiacDisplay";
import DisplayRestaurants from "@/components/Frontend/displayRestaurants";
import { useEffect } from "react";
import { jwtVerify } from 'jose';
import cookie from 'cookie-cutter';
import { useAuth } from "@/Context/userAuth";

const Home: React.FC = () => {

  const { addUser } = useAuth();

  const fetchDataOnLoad = async () => {

    const token = cookie.get('authToken');

    if (!token || token == 'expired') {
      return;
    }

    const decode = await jwtVerify(token, new TextEncoder().encode('testpassword'))

    const user = decode.payload;
    if (decode.payload) {
      addUser(user);
    }

  }

  useEffect(() => {

    fetchDataOnLoad();


  }, [])

  return (

    <Layout>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
      >
        <Banner />
      </motion.div>
      <SelectSign />
      <ZodiacDisplay latitude={0} longitude={0} sign={""} />
      {/* <Gallery /> */}
      {/* <DisplayRestaurants /> */}
    </Layout>
  );
};
export default Home;
