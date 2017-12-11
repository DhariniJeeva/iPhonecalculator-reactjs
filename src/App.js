import React, { Component } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

// class AutoShrinkingText extends Component {
//
//   state ={
//     scale : 1
//   }
//   componentDidUpdate(){
//       const node = this.node
//       const {offsetWidth} = node
//       const parentWidth = node.offsetParent.offsetWidth
//
//       const scale = offsetWidth / parentWidth
//
//       if(scale > 1){
//         this.setState({
//           scale : 1 / scale
//         })
//       }else if (this.state.scale !==1){
//         this.setState({
//           scale : 1
//         })
//       }
//   }
//   render(){
//     const {scale} = this.state
//     console.log(scale);
//     return (
//       <div {...this.props}
//       style = {{transform : `scale(${scale}, ${scale})`}}
//       ref = {node => this.node = node}/>
//     )
//   }
// }
class App extends Component {
  // constructor(){
  //     super();
  //     this.state = {
  //         val : 0
  //     }
  // }
  state = {
    displayValue : '0',
    waitingForOperand : false,
    operator : null,
    value : null
  }

  showDigit(digit){

    const {displayValue, waitingForOperand} = this.state

    if(waitingForOperand){
      this.setState({
        displayValue: String(digit),
        waitingForOperand : false
      })
    }
    else{
      this.setState({
        displayValue: displayValue === '0' ? String(digit) : displayValue + digit
      })
    }
  }
  inputDot(){
    const {displayValue, waitingForOperand}  = this.state
    if(waitingForOperand){
      this.setState({
        displayValue : '.',
        waitingForOperand: false
      })
    }
    else if(displayValue.indexOf('.') === -1){

      this.setState({
        displayValue : displayValue + '.',
        waitingForOperand : false
      })
    }
  }
  ClearDisplay(){
    this.setState({
      displayValue : '0'
    })
  }
  toggleSign(){
    const displayValue = this.state

    //toggling sign. if first character is negative, then remove first character.
    this.setState({
      displayValue : displayValue.charAt(0) === '-' ? displayValue.substr(1) : '-' + displayValue
    })

  }

  percent(){
    const {displayValue} = this.state

    const value = parseFloat(displayValue)
    this.setState({
      displayValue : String(value / 100)
    })
  }
  performOp(nextOperator){
    const{displayValue, operator, value} = this.state

    const nextValue = parseFloat(displayValue)

    //const computedValue = operations[operator](prevValue, nextValue)
    const operations = {
      '/' : (prevValue, nextValue) => prevValue / nextValue,
      '*' : (prevValue, nextValue) => prevValue * nextValue,
      '-' : (prevValue, nextValue) => prevValue - nextValue,
      '+' : (prevValue, nextValue) => prevValue + nextValue,
      '=' : (prevValue, nextValue) => nextValue,

    }

    if(value == null){
      this.setState({
        value : nextValue
      })
    } else if(operator){
      const CurrentValue = value || 0
      const computedValue = operations[operator](CurrentValue, nextValue)

      this.setState({
        value : computedValue,
        displayValue : String(computedValue)
      })
    }

    this.setState({
      waitingForOperand : true,
      operator : nextOperator
    })
  }
  render() {

    const {displayValue} = this.state
    return (
      <div className="App">
        <h3 className="App-header">Calculator!</h3>
        <div className="calcLayout">
        <div className ="col cal-col-0">{displayValue}</div>
        <div className ="col cal-col-1" onClick ={ ()=> this.ClearDisplay()}>AC</div>
        <div className ="col cal-col-2" onClick ={()=>this.toggleSign()}>+/-</div>
        <div className ="col cal-col-3" onClick = {()=>this.percent()}>%</div>
        <div className ="col cal-col-4 operand" onClick = {()=> this.performOp('/')}>&divide;</div>
        <div className ="col cal-col-5" onClick = {() => this.showDigit(7)}>7</div>
        <div className ="col cal-col-6" onClick = {() => this.showDigit(8)}>8</div>
        <div className ="col cal-col-7" onClick = {() => this.showDigit(9)}>9</div>
        <div className ="col cal-col-8 operand" onClick = {()=> this.performOp('*')}>&times;</div>
        <div className ="col cal-col-9" onClick = {() => this.showDigit(4)}>4</div>
        <div className ="col cal-col-10" onClick = {() => this.showDigit(5)}>5</div>
        <div className ="col cal-col-11" onClick = {() => this.showDigit(6)}>6</div>
        <div className ="col cal-col-12 operand" onClick = {()=> this.performOp('-')}>&#8722;</div>
        <div className ="col cal-col-13" onClick = {() => this.showDigit(1)}>1</div>
        <div className ="col cal-col-14" onClick = {() => this.showDigit(2)}>2</div>
        <div className ="col cal-col-15" onClick = {() => this.showDigit(3)}>3</div>
        <div className ="col cal-col-16 operand" onClick = {()=> this.performOp('+')}>&#43;</div>
        <div className ="col cal-col-17 zero" onClick = {() => this.showDigit(0)}>0</div>
        <div className ="col cal-col-18" onClick={ ()=> this.inputDot()}>.</div>
        <div className ="col cal-col-19 operand" onClick = {()=> this.performOp('=')}>&#61;</div>
        </div>
      </div>
    );
  }
}

export default App;
