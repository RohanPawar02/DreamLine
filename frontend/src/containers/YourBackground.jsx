import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUimages } from "../reducks/userbackground/selectors";
import { fetchUimages } from "../reducks/userbackground/operations";
import Preview from "../components/Common/Preview";
import Header from "../components/Common/Header";

function YourBackground() {
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();
  const uimages = getUimages(selector);
  const user = JSON.parse(localStorage.getItem("PROJECT_LOGIN_USER_KEY"));
  const [showPreview, setShowPreview] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null);

  useEffect(() => {
    dispatch(fetchUimages(user.token));
    console.log("uimage:");
    console.log(uimages);
    console.log("user:");
    console.log(user);
  }, []);

  const clickImage = (imageId) => {
    setSelectedImageId(imageId);
    setShowPreview(true);
  };

  return (
    <>
      <Header />
      <div id="Yourbackground" class="yb-bg">
        <div class="yb-body">
          <main class="yb-main">
            <div class="YB-header">
              <p>Your Backgrounds</p>
            </div>

            <div class="scrolling-wrapper">
              {uimages["results"] &&
                uimages["results"].map((image) => (
                  <div class="card" key={image.id}>
                    <img src={image.generated_background} alt=""></img>
                    <div class="link-panel">
                      <span
                        id="preview-btn"
                        onClick={() => clickImage(image.id)}
                      >
                        Preview |{" "}
                      </span>
                      <a
                        href={image.generated_background}
                        download={image.name}
                        target="_blank"
                        rel="noreferrer"
                        class="DL-btn"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </main>
        </div>
      </div>
      {showPreview && (
        <Preview
          setShowPreview={setShowPreview}
          selectedImageId={selectedImageId}
        />
      )}
    </>
  );
}
export default YourBackground;
