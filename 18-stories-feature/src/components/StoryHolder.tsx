import { useEffect, useState } from "react";
import StoryCreator from "./StoryCreator";
import "./StoryHolder.css";
import Story from "./Story";
import type { StoryType } from "../types/types";
import StoryDisplay from "./StoryDisplay";

export default function StoryHolder() {
  const [stories, setStories] = useState<StoryType[]>(() => {
    const stored = localStorage.getItem("stories");
    return stored ? JSON.parse(stored) : [];
  });

  const [openedStory, setOpenedStory] = useState<string>("");
  const [indexOfOpenedStory, setIndexOfOpenedStory] = useState<number>(-1);

  useEffect(() => {
    const storySelected = stories.findIndex((story) => {
      return story.id === openedStory;
    });
    setIndexOfOpenedStory(storySelected);
  }, [openedStory, stories]);

  return (
    <>
      {indexOfOpenedStory > -1 ? (
        <StoryDisplay
          indexOfOpenedStory={indexOfOpenedStory}
          stories={stories}
          setIndexOfOpenedStory={setIndexOfOpenedStory}
          setOpenedStory={setOpenedStory}
        />
      ) : (
        <div className="story-holder">
          <StoryCreator setStories={setStories} />
          <div className="stories">
            {stories.map((story) => (
              <Story
                key={story.id}
                story={story}
                setOpenedStory={setOpenedStory}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
