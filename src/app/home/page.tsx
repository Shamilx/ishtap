"use client";

import { jost } from "@/fonts/fonts";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import React from "react";

function Page() {
  return (
    <div id="home">
      <div className="absolute w-full z-10">
        <Header />
      </div>

      <div id="main-content">
        <div id="info" style={{ fontFamily: `${jost.style.fontFamily}` }}>
          <p id="title">In your service from 2019</p>
          <p id="subtitle">We connect employers with employees.</p>
          <p id="lorem">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec
            luctus lectus. Maecenas consectetur efficitur odio ac lacinia.
            Vestibulum accumsan varius augue non condimentum. Morbi et mauris
            lorem. Sed rhoncus dictum sapien, at venenatis metus tincidunt eu.
            Integer consequat libero sit amet lorem viverra, vel ultrices tellus
            faucibus. Integer eget orci libero.
          </p>
        </div>

      </div>

      <div className="absolute w-full bottom-0 z-10">
          <Footer />
        </div>
    </div>
  );
}

export default Page;
