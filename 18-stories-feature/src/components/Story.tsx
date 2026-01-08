import type { StoryType } from '../types/types'
import './Story.css'


type Props = {
  story: StoryType;
  setOpenedStory: React.Dispatch<React.SetStateAction<string>>;
};

export default function Story({ story, setOpenedStory }: Props) {


     function handleClickStory(){
        setOpenedStory(story.id)
    }

    return (
        <div onClick={handleClickStory} className="story-preview">
            <img src={story.imageBase64}></img>
        </div>
    )
}