import { Button } from "@chakra-ui/react";
import ShortVideoItem from "./ShortVideoItem";
import { ShortVideoItemProps } from "./ShortVideoItem/ShortVideoItem";
import { useRef } from "react";

export interface ShortVideoListProps {
  list: Record<string, ShortVideoItemProps>;
}

export const ShortVideoList = (props: ShortVideoListProps) => {
  const shortContainerRef = useRef<HTMLDivElement>(null);
  if (!props.list) return null;
  return (
    <div>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "grid",
          placeItems: "center",
          background: "#23232388",
        }}
      >
        <Button
          variant={"solid"}
          title="Start"
          onClick={() => {
            if (shortContainerRef.current) {
              shortContainerRef.current.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          Start Shorts
        </Button>
      </div>
      <div
        id="shorts-container"
        ref={shortContainerRef}
        onScroll={() => {
          console.log("scroll detected");
        }}
      >
        {/* {props.list.map((item, idx) => {
          if (idx > 1) return null;
          return <ShortVideoItem {...item} />;
        })} */}
      </div>
    </div>
  );
};
