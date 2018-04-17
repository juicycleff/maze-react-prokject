import React, { Component } from 'react';
import {Layer, Rect, Stage, Group, Image} from 'react-konva';

function block(top, bottom, left, right, visted){
  this.top = top;
  this.bottom = bottom;
  this.left = left;
  this.right = right;
  this.right = right;
}

class App extends Component {

  state = {
    height: 0,
    width: 0,
    turn: 'X',
    gameLocked: false,
    gameEnded: false,
    totalMoves: 0,
    currentPosition: {},
    graphItems: []
  }
  
  initGame(){
    const width = prompt("Enter width");
    const height = prompt("Enter height");

    this.setState({
      width,
      height
    });

    this.updateCanvas(height, width);
  }

  componentDidMount() {
    this.initGame();
  }

  updateCanvas(col, row) {

    const w = 600 / row;
    const h = 600 / col;
    this.setState({currentPosition: {w, h}});

    for (var i = 0; i < row; i++) {
      for (var j = 0; j < col; j++) {
        
        var x = j * w;
        var y = i * h;
        const random = Math.floor(Math.random() * 4);

        const graphItem = {};
        graphItem.visited = false;

        if (random === 2) {
          console.log(random);
          // ctx.drawImage(myImage, x, y, w, h);
          graphItem.x = x;
          graphItem.y = y;
          graphItem.w = w;
          graphItem.h = h;
          graphItem.enemy = true;

        } else {
          console.log(random);
          graphItem.x = x;
          graphItem.y = y;
          graphItem.w = w;
          graphItem.h = h;
          graphItem.enemy = false;
        }

        const graphItems = this.state.graphItems;
        graphItems.push(graphItem);
        this.setState({graphItems});
      }
    }

    const { graphItems } = this.state;
    for(var i = 0; i < graphItems.length; i++){
      for(var j = 0; j < graphItems.length; j++){
        graphItems[i][j];
        console.log(graphItems[i][j];);
      }
    }
  }
  
  renderEnemy(graphItem){
    <div style={{backgroundColor: 'green'}}>
      <img src={'./assets/enemy.png'} width={graphItem.w} height={graphItem.h} />
    </div>
  }

  renderWalkable(graphItem){
    return(
    <div style={{ border: '1px solid rgba(0,0,0,0.8)', backgroundColor: 'pink', height: graphItem.h, width: graphItem.w}} />
    );
  }

  start(){
    const { graphItems } = this.state
    for (var i=0, len= graphItems.length; i<len; i++) {
      // inner loop applies to sub-arrays
      for (var j=0, len2= graphItems[i].length; j < len2; j++) {
          // accesses each element of each sub-array in turn
          console.log( graphItems[i][j] ); 
      }
    }
  }

  render() {
    const { height, width, graphItems, currentPosition } = this.state;

    return (
      <div height={600} width={600} >
        <Stage width={600} height={600}>
          <Layer>
            {graphItems.map((graphItem, i) => {
              if(graphItem.enemy){
                  return(
                    <Rect
                      x={graphItem.x} y={graphItem.y} width={graphItem.w} height={graphItem.h}
                      fill={'#999000'}
                      stroke={'#000'}
                      strokeWidth={5}
                      drawBorder={true}
                    />
                  );
              } else {            
                return(
                  <Rect
                    x={graphItem.x} y={graphItem.y} width={graphItem.w} height={graphItem.h}
                    fill={'#fff'}
                    stroke={'#000'}
                    strokeWidth={5}
                    drawBorder={true}
                  />
                );
              }
            }
            )}
          </Layer>
          <Layer>
            <Rect
              x={75} y={75} width={currentPosition.w} height={currentPosition.h}
              fill={'#red'}
              stroke={'#ghd'}
              strokeWidth={5}
              drawBorder={true}
              onClick={()=> this.start()}
            />
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default App;
