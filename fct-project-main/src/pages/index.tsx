import Layout from "../components/Frontend/layout";
import Testimonial from "../components/Frontend/testimonial";
import Banner from "../components/Frontend/banner";

import Gallery from "../components/Frontend/gallery";
import { motion } from 'framer-motion'
import SelectSign from "@/components/Frontend/selectSign";
import ZodiacDisplay from "@/components/Frontend/zodiacDisplay";

const Home: React.FC = () => {
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
      <ZodiacDisplay />
      <Gallery />
      <Testimonial />
    </Layout>
  );
};
export default Home;
