import React from "react";
import Base from "./Base"


const About = () => {
  return (
    <div>
    <div className="">
        <img src="./cover.jpg" style={{width: "100%", height: "500px"}}/>
      <div className="aboutFooter">
      <h1 className="aboutH1">WHO WE ARE?</h1>
      <p>
        At Bolt, we believe style shouldn't demand a huge investment
        of time or money. Style should be comfortable, accessible and easy to
        achieve. That's why our footwear feels as good as it looks, effortlessly
        taking you from the boardroom to the restaurant, to the park with your
        family. We strive to ensure your shopping experience is easy on your
        wallet, and your schedule, by delivering fashion and value to everyone
        in your household.
      </p>
      <p>Bolt. Great brands. Smart Prices.</p>
      <h1 className="aboutH1">ABOUT DESIGNER BRANDS</h1>
      <p>
        Bolt is one of North America’s largest designers, producers and
        retailers of footwears.
      </p>
      <p>
        Our primary concept, our company, offers brand name and
        designer dress, casual and athletic footwear and accessories. The
        Company started to help people to find the right shoes for their needs.
      </p>
      </div>
      </div>
      <Base/>
    </div>
  );
};

export default About;
