import * as PropTypes from "prop-types";

export function VideoSequence(props) {
  return <div
    style={{
      aspectRatio: "16 / 9",
      width: "100%",
      overflow: "invisible",
      display: props.index === props.resultIndex ? "block" : "none"
    }}>
    {props.index - 2 <= props.resultIndex && props.resultIndex <= props.index ? (<video
        id={`video-${props.index}`}
        preload="auto"
        style={{width: "100%", height: "100%"}}
        src={`https://srghackathon.archipanion.com/objects/${props.result.path}?width=200#t=${props.result.startabs}`}
        onTimeUpdate={props.onTimeUpdate}
        autoPlay={false}
      ></video>
    ) : null}
    <div>
      <b>[{props.result.term}]</b> {props.resultIndex} - {props.result.objectId} ({Math.round(props.result.score * 100)}%)
    </div>
  </div>;
}

VideoSequence.propTypes = {
  index: PropTypes.any,
  resultIndex: PropTypes.number,
  result: PropTypes.any,
  onTimeUpdate: PropTypes.func
};