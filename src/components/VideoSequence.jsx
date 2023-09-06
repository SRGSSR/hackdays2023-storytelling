import * as PropTypes from "prop-types";
import inventar from "../data/inventar.json";

export function VideoSequence(props) {
    const entry = inventar.find(i => i.File === props.result.path);
    return <div
    style={{
      width: '100%',
      height: "100%",
      display: props.index === props.resultIndex ? "block" : "none",
      flex: '1'
    }}>
    {props.index - 2 <= props.resultIndex && props.resultIndex <= props.index ? (<video
        id={`video-${props.index}`}
        preload="auto"
        style={{width: "100%", aspectRatio: '16 / 9'}}
        src={`https://srghackathon.archipanion.com/objects/${props.result.path}?width=200#t=${props.result.startabs}`}
        onTimeUpdate={props.onTimeUpdate}
        autoPlay={false}
      ></video>
    ) : null}
    <div>
      {entry?.Datum} <b>[{props.result.term}]</b> {props.resultIndex} - {props.result.objectId} ({Math.round(props.result.score * 100)}%)
        {entry?.Memobase ? (<><br/><a href={entry?.Memobase}>🔗Link to archives</a></>) : null}
    </div>
  </div>;
}

VideoSequence.propTypes = {
  index: PropTypes.any,
  resultIndex: PropTypes.number,
  result: PropTypes.any,
  onTimeUpdate: PropTypes.func
};
