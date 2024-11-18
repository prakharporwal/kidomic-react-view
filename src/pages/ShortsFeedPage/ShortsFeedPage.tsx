import React, { useEffect, useState } from "react";
import ShortVideoList from "./ShortsVideoList";
import { ShortVideoListProps } from "./ShortsVideoList/ShortsVideoList";
import { useNavigate, useParams } from "react-router";
import ShortVideoItem from "./ShortsVideoList/ShortVideoItem";

const list: ShortVideoListProps = {
  list: {
    "video-2": {
      id: "video-2",
      src: "/videos/video-2.mp4",
      nextId: "video-3",
      channelId: "RajeshArora",
      description: "Ariana",
    },
    "video-3": {
      id: "video-3",
      nextId: "video-4",
      src: "/videos/video-3.mp4",
      description: "TMKOC",
    },
  },
};

export const ShortsFeedPage: React.FunctionComponent = (props: any) => {
  const [videoList, setVideoList] = useState(list.list);
  const routeParams = useParams();
  const navigate = useNavigate();
  const videoId = routeParams.videoId || "video-2";
  // uncomment on api server is ready
  //   useEffect(() => {
  //     fetch("http://localhost:1337/api/articles")
  //       .then((res) => {
  //         if (!res.ok) throw new Error();
  //         return res.json();
  //       })
  //       .then((data) => {
  //         console.log("body", data.data);
  //         setVideoList(data.data);
  //       })
  //       .catch((e) => console.error(e));
  //   }, []);
  useEffect(() => {
    console.log(videoId);
    const container = document.querySelector("#container");
    let currentIndex = 0;

    container?.addEventListener("wheel", (event) => {
      event.preventDefault();

      const shorts = document.querySelectorAll(".short");
      const delta = Math.sign(-1); // -1 for scroll up, 1 for scroll down

      // Move to the next or previous short based on scroll direction
      if (delta > 0 && currentIndex < shorts.length - 1) {
        currentIndex++;
      } else if (delta < 0 && currentIndex > 0) {
        currentIndex--;
      }

      navigate("/shorts" + "/" + videoList[videoId].nextId);
      // Scroll to the target short smoothly
      // shorts[currentIndex].scrollIntoView({ behavior: "smooth" });
    });
  }, []);
  return (
    <div id={"container"} style={{ height: "105vh" }}>
      <ShortVideoItem {...videoList[videoId]} />
    </div>
  );
};
