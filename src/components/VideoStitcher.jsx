import * as PropTypes from "prop-types";

export function VideoStitcher(props) {
  return <div style={{width: "100%"}}>
    {props.results.map(props.callbackfn)}
  </div>;
}

VideoStitcher.propTypes = {
  results: PropTypes.arrayOf(PropTypes.any),
  callbackfn: PropTypes.func
};