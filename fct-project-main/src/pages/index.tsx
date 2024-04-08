import Layout from "../components/Frontend/layout";
import Testimonial from "../components/Frontend/testimonial";
import Banner from "../components/Frontend/banner";
import Gallery from "../components/Frontend/gallery";
import { motion } from 'framer-motion'
import SelectSign from "@/components/Frontend/selectSign";
import ZodiacDisplay from "@/components/Frontend/zodiacDisplay";
import DisplayRestaurants from "@/components/Frontend/displayRestaurants";
import { useEffect, useState } from "react";
import { jwtVerify } from 'jose';
import cookie from 'cookie-cutter';
import { useAuth } from "@/Context/userAuth";
import SentimentBanner from "@/components/Frontend/sentimentBanner";
import axios from 'axios';



const Home: React.FC = () => {

  const { addUser, user } = useAuth();
  console.log("user", user?.id)

  console.log("user", user?.subscribed)

  const [updateUser, setUpdateUser] = useState({});

  useEffect(()=> {
    if (!user?.id) {
      return;
    }
    fetchUsers();
  }, [user?.id]);

  const fetchUsers = async () => {
    try {
      const userState = await axios.get(`http://localhost:3000/getUsers/${user.id}`)
      const person : String = userState.data;
      setUpdateUser(person);
    } catch (error) {
      console.error('Error with fetching users:', error);
    }
  }

  console.log(">>", updateUser)




  const fetchDataOnLoad = async () => {

    const token = cookie.get('authToken');

    if (!token) {
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
        {user && <SentimentBanner userInfo={updateUser} />}
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
