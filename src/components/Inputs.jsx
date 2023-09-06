import * as PropTypes from "prop-types";

export function Inputs(props) {
  return <div className="results">
    <div>
      <input onChange={props.onSearchTermChanged} type="text" value={props.searchTerm}/>
      <button onClick={props.onSearchTermClick}>Search</button>
    </div>
    <div>
      <textarea onChange={props.onSequenceChange} value={props.sequenceText}></textarea>
      <button onClick={props.onSearchSequenceClick}>Test Sequence</button>
    </div>
    <button onClick={props.onPlayPause}>Play / Pause</button>
  </div>;
}

Inputs.propTypes = {
  onSearchTermChanged: PropTypes.func,
  searchTerm: PropTypes.string,
  onSearchTermClick: PropTypes.func,
  onSequenceChange: PropTypes.func,
  sequenceText: PropTypes.string,
  onSearchSequenceClick: PropTypes.func,
  onPlayPause: PropTypes.func
};