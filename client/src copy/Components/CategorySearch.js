import React from "react";
import Fade from "react-reveal/Fade";

export default function CategorySearch(props) {
  /* const goToHome = () => {
    props.history.push(`/category?name=home`);
  }; */
  const goToFashion = () => {
    props.history.push(`/category?name=fashion`);
  };
  const goToOutdoor = () => {
    props.history.push(`/category?name=outdoors`);
  };
  const goToProjects = () => {
    props.history.push(`/category?name=projects`);
  };
  const goToSouls = () => {
    props.history.push(`/category?name=souls`);
  };

  return (
    <Fade bottom cascade={true}>
      <div className="authContainer">
        <div className="form1">
          <div className="categoryContainer">
            <div>
              {/* <div style={{ marginTop: "20%", width: "100%" }}>
                {" "}
                <button style={{ width: "80%" }} onClick={goToHome}>
                  <h3>Home</h3>
                </button>
              </div> */}
              <div style={{ marginTop: "20%", width: "100%" }}>
                {" "}
                <button style={{ width: "80%" }} onClick={goToFashion}>
                  <h3>Fashion</h3>
                </button>
              </div>
              <div style={{ marginTop: "20%", width: "100%" }}>
                {" "}
                <button style={{ width: "80%" }} onClick={goToOutdoor}>
                  <h3>Outdoors</h3>
                </button>
              </div>
              <div style={{ marginTop: "20%", width: "100%" }}>
                {" "}
                <button style={{ width: "80%" }} onClick={goToProjects}>
                  <h3>Projects</h3>
                </button>
              </div>
              <div style={{ marginTop: "20%", width: "100%" }}>
                {" "}
                <button style={{ width: "80%" }} onClick={goToSouls}>
                  <h3>Souls In A Box</h3>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}
