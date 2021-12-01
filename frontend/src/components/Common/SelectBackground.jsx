import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Steps from "./Steps";

import { fetchBimg } from "../../reducks/backgroundImg/operations";
import { getBimg } from "../../reducks/backgroundImg/selectors";

function SelectBackground({ setStep, setInputBackgroundId }) {
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();
  const bimg = getBimg(selector);

  useEffect(() => {
    dispatch(fetchBimg());
    console.log(bimg);
  }, []);

  return (
    <div id="selectBg">
      <main>
        <Steps />

        <div class="choose">
          <p>Choose your background Image</p>
        </div>
        <div class="flex-2">
          {bimg["results"] &&
            bimg["results"].map((image) => (
              <div className="bgd" key={image.id}>
                <img
                  src={image.image}
                  onClick={() => setInputBackgroundId(image.id)}
                  alt={image.name}
                />
              </div>
            ))}
        </div>
      </main>

      <footer>
        <div class="btn-1">
          <button onClick={() => setStep(2)} class="next">
            Next
          </button>
        </div>
        <div class="btn-2">
          <a href="/" class="back">
            Back
          </a>
        </div>
      </footer>
    </div>
  );
}

export default SelectBackground;
