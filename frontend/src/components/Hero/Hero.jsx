import React from "react";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";
import { motion } from "motion/react";

const hero = () => {
  return (
    // <motion.div
    //   initial={{ opacity: 0.8 }}
    //   animate={{ opacity: 1 }}
    //   exit={{ opacity: 0 }}
    //   transition={{ duration: 1.3 }}
    // >
    <>
      <Section1 />
      <Section2 />
      <Section4 />
      <Section3 />
    </>
    // </motion.div>
  );
};

export default hero;
