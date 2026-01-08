import { useState } from "react";
import type { StoryType } from "../types/types";
import { resizeImageFileToDataURL } from "../helpers/resize";
import './StoryCreator.css'


type Props = {
  setStories: React.Dispatch<React.SetStateAction<StoryType[]>>;
};

export default function StoryCreator({ setStories }: Props) {
  const [error, setError] = useState<string | null>(null);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);

    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    try {
      const resizedDataUrl = await resizeImageFileToDataURL(file, {
        maxWidth: 1080,
        maxHeight: 1920,
        mimeType: "image/jpeg",
        quality: 0.85,
      });

      const newStory: StoryType = {
        id: crypto.randomUUID(),
        imageBase64: resizedDataUrl,
        createdAt: Date.now(),
      };

      setStories((prev) => [newStory, ...prev]);

      const key = "stories";
      const current: StoryType[] = JSON.parse(localStorage.getItem(key) || "[]");
      localStorage.setItem(key, JSON.stringify([newStory, ...current]));

      e.target.value = "";
    } catch {
      setError("Could not process the image.");
    }
  };

  return (
    <div className="story-creator">
    <label  className="custom-file-upload">
      <input className="input-file"  type="file" accept="image/*" onChange={onFileChange} />
          </label>

      {error && <div style={{ color: "crimson" }}>{error}</div>}
    </div>
  );
}
