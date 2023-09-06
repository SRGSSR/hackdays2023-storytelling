import * as PropTypes from "prop-types";
import {SequenceCreator} from "./SequenceCreator.jsx";

export function Inputs(props) {
  return <div className="results">
    <h1>Architasia</h1>
    {props.isLoading ? (<div>Loading...</div>) : (<>
      <h3>Search for a term</h3>
      <div>
        <input onChange={props.onSearchTermChanged} type="text" value={props.searchTerm}/><br/>
        <button onClick={props.onSearchTermClick}>Search</button>
      </div>
      <br/>
      <h3>Create a sequence</h3>
      <div>
        <SequenceCreator onChange={props.onSequenceChange} value={props.sequenceText}/>
        <button onClick={props.onSearchSequenceClick}>Create Sequence</button>
      </div>
      <hr/>
      <button onClick={props.onListMode}>List</button>
      <button onClick={props.onVideoMode}>Videos</button>
    </>)}
  </div>;
}

Inputs.propTypes = {
  onSearchTermChanged: PropTypes.func,
  searchTerm: PropTypes.string,
  onSearchTermClick: PropTypes.func,
  onSequenceChange: PropTypes.func,
  sequenceText: PropTypes.string,
  onSearchSequenceClick: PropTypes.func,
  onPlayPause: PropTypes.func,
  onListMode: PropTypes.func,
  onVideoMode: PropTypes.func,
  isLoading: PropTypes.bool
};
