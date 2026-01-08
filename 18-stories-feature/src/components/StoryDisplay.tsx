import { useEffect } from "react";
import type { StoryType } from "../types/types"

import './StoryDisplay.css'

type Props = {
  indexOfOpenedStory: number, 
  stories: StoryType[],
  setIndexOfOpenedStory: React.Dispatch<React.SetStateAction<number>>,
  setOpenedStory: React.Dispatch<React.SetStateAction<string>>
}

export default function StoryDisplay ({indexOfOpenedStory , stories, setIndexOfOpenedStory, setOpenedStory} : Props){

            function leftImageSelect() {
             setIndexOfOpenedStory((prev) => (prev > 0 ? prev - 1 : prev));
        }

        function rightImageSelect() {
             setIndexOfOpenedStory((prev) => (prev < stories.length - 1 ? prev + 1 : prev));
        }

       function handleCloseStory(){
        setOpenedStory("")
        setIndexOfOpenedStory(-1)
       }

  useEffect(() => {
    if (indexOfOpenedStory < 0) return;
    if (!stories[indexOfOpenedStory]) return;

    const t = window.setTimeout(() => {
      if (indexOfOpenedStory >= stories.length - 1) {
        handleCloseStory();
      } else {
        setIndexOfOpenedStory((prev) => prev + 1);
      }
    }, 3000);

    return () => window.clearTimeout(t);
  }, [indexOfOpenedStory, stories.length]); 

  const current = stories[indexOfOpenedStory];
  if (!current) return null;

    return (
        <div className="story-display">
            <div  onClick={leftImageSelect} className="left-image-select"></div>
            <div  onClick={rightImageSelect} className="right-image-select"></div>
             <div className="progress-bar">
                {stories.map((_, index) => {
                    const isPast = index < indexOfOpenedStory;
                    const isCurrent = index === indexOfOpenedStory;

                    return (
                    <div key={index} className="image-bar">
                        <div
                        className={`image-bar-fill ${isPast ? "done" : ""} ${isCurrent ? "anim" : ""}`}
                        key={isCurrent ? indexOfOpenedStory : `static-${index}`}
                        />
                    </div>
                    );
                })}
                </div>
            <img src={stories[indexOfOpenedStory].imageBase64}></img>
            <button className="close-display-button" onClick={handleCloseStory}>X</button>
        </div>
    )
}