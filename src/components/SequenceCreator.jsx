import * as PropTypes from "prop-types";
import {useEffect, useState} from "react";

export function SequenceCreator(props) {

  const [data, setData] = useState([])

  useEffect(() => {
    const value = props.value
    const lines = value.split('\n')
    const newData = lines.map((line) => {
      const lineData = line.split(':')
      return {
        text: lineData[0],
        value: lineData[1]
      }
    })
    setData(newData)
  }, [props.value]);

  const dataToString = (newData) => {
    if(newData.length>0) {
      const text = newData.map((line) => {
        return `${line.text}:${line.value}`
      }).join('\n')
      console.log(text)
      props.onChange(text)
    }
  }

  const clearRow = (index) => {
    const newData = [...data]
    newData.splice(index,1)
    dataToString(newData)
  }

  const addRow = () => {
    const newData = [...data]
    newData.push({
      text: '',
      value: 0
    })
    dataToString(newData)
  }

  const textChanged = (index, value) => {
    const newData = [...data]
    newData[index].text = value
    dataToString(newData)
  }

  const valueChanged = (index, value) => {
    const newData = [...data]
    newData[index].value = value
    dataToString(newData)
  }

  return (<div className='sequenceCreator'>
    {data.map((line, index) => {
      return (<div key={index}>
        <input className="sequenceText" value={line.text} onChange={(e) => textChanged(index, e.target.value)}/>
        <input className="sequenceLength" value={line.value}  onChange={(e) => valueChanged(index, e.target.value)}/>
        <button className="sequenceDelete" onClick={() => clearRow(index)}>X</button>
      </div>)
    })}
    <button className="sequenceAdd" onClick={addRow}>+</button><br/>
    {/*<textarea onChange={props.onChange} value={props.value}></textarea><br/>*/}
  </div>);
}

SequenceCreator.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string
};