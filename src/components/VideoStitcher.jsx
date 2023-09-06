import * as PropTypes from "prop-types";

export function VideoStitcher(props) {
  return <div className="videoStitcher" style={{flex: '1', position: 'relative'}}>
    {props.results.map(props.callbackfn)}
    <button onClick={props.onPlayPause} className="startStopButton">Play / Pause</button>
  </div>;
}

VideoStitcher.propTypes = {
  results: PropTypes.arrayOf(PropTypes.any),
  callbackfn: PropTypes.func,
  onPlayPause: PropTypes.func
};