import React, { Fragment } from "react";
import Fade from "react-reveal/Fade";
export default function About() {
  return (
    <Fragment>
      <Fade bottom cascade={true}>
      <div className="artistBigContainer">
        <div className="artistImage2">
          <img
           
            src={
              "https://live.staticflickr.com/65535/50363139263_cc4552a7e0.jpg"
            }
          />
        </div>
        <div className="bioContainer">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione non
            voluptas alias sint qui dolore illo corrupti tempore quis, unde
            voluptatibus, officia, iure repellat aspernatur sit voluptatum
            assumenda deserunt corporis?
          </p>
        </div>
      </div>
      </Fade>
    </Fragment>
  );
}
