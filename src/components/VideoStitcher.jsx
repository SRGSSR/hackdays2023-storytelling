import * as PropTypes from "prop-types";

export function VideoStitcher(props) {
  return <div className="videoStitcher" style={{flex: '1', position: 'relative'}} onClick={props.onPlayPause}>
    {props.results.map(props.callbackfn)}
    <button className="startStopButton" style={{ fontSize: '70px', display: props.hideButton ? 'none' : 'block'}}>⏯️</button>
  </div>;
}

VideoStitcher.propTypes = {
  results: PropTypes.arrayOf(PropTypes.any),
  callbackfn: PropTypes.func,
  onPlayPause: PropTypes.func,
  hideButton: PropTypes.bool,
};
