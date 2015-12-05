// start slingin' some d3 here.
// Setting up the Canvas
var canvas = d3.select(".board")
  .append("svg")
  .style("height", 500)
  .style("width", 700)
  .style("background-color", "Pink");

var collisions = 0;
var highScore = 0;
var currentScore = 0;

// Setting up Enemy Locations
 var arr = [];
    for(var i = 0; i < 30; i++){
      var obj = {
        id: i,
        x: Math.random()*700,
        y: Math.random()*500,
        move: function(){
          this.x = Math.random()*700;
          this.y = Math.random()*500;
          currentScore+=5;
        }
      }
      arr.push(obj);
    }

var updateCurrentScore = function(){
  d3.select(".current")
  .text("Current Score: " + currentScore);
}

var updateHighScore = function(){
  if(currentScore > highScore){
    highScore = currentScore;
    d3.select(".highscore")
    .text("High Score: "+ highScore)
  }
  collisions++;

  d3.select(".collisions")
  .text("Collisions: " + collisions);
}

// var playerArr = [];
// playerArr[0] = {id: "player", x: 350, y: 250};

//Setting up Player
var player = canvas.append("circle")
    .attr('class','player')
    .attr('fill', 'beige')
    .attr("cx",  350)
    .attr("cy", 250)
    .attr("r",10)

// var followMouse = function(){
//   canvas.selectAll('circle.player')
//   d3.behavior.drag()
//   .on("drag",function(){
//     mouseLoc = d3.mouse(this);
//     console.log(mouseLoc);
//   })
//   .attr("cx", mouseLoc[0] || 350)
//   .attr("cy", mouseLoc[1] || 250)
// }

var minX = 10;
var maxX  = 690;
var minY = 10;
var maxY = 490;

var drag = d3.behavior.drag()
  .on("drag", function(d,i) {
    if(d3.event.x < minX){
      var x = minX;
    } else if(d3.event.x > maxX){
      var x = maxX;
    } else {
      var x = d3.event.x; 
    }
    if(d3.event.y < minY){
      var y = minY;
    } else if(d3.event.y > maxY){
      var y = maxY;
    } else{
      var y = d3.event.y;
    }
    d3.select(this).attr('cx', x);
    d3.select(this).attr('cy', y);
  })

canvas.select("circle.player").call(drag);

//followMouse();

// Setting up Enemies
    var enemy = canvas.selectAll("circle")
    .data(arr)
    .enter()
    .append("circle")
    .attr('class','enemy')
    .attr("fill", "teal")
    .attr("cx", function(d){
      return d.x;
    })
    .attr("cy", function(d){
      return d.y;
    })
    .attr("r", 10)
    
    console.log(enemy);

    var detectCollision = function(){
      enemy.each(function(){
        var particularEnemy = d3.select(this);
        playerX = canvas.select("circle.player").attr("cx")
        enemyX = particularEnemy.attr("cx")
        playerY = canvas.select("circle.player").attr("cy")
        enemyY = particularEnemy.attr("cy")
        if(Math.abs(playerX-enemyX) < 7 && Math.abs(playerY-enemyY) < 7){ 
          updateHighScore();
          currentScore = 0;
          
        }
      })
      updateCurrentScore();
    }

    var enemies = function(){
      setInterval(function(){
        canvas.selectAll("circle.enemy")
        .transition()
        .duration(1500)
        .attr("cx", function(d){
          d.move();
          return d.x;
        })
        .attr("cy", function(d){
          return d.y;
        })
      },1600)      
    }

enemies();

setInterval(detectCollision,50)

// detectCollision();



    
  
    



// var Enemies = function(){
  
// }

// Enemies.prototype.generate = function(){
//     var arr = [];
//     for(var i = 0; i < 15; i++){
//       var obj = {
//         id: i,
//         x: Math.random()*700,
//         y: Math.random()*500
//       }
//       arr.push(obj);
//     }

//     console.log(arr);

//     d3.select(".board").selectAll(".enemy")
//     // canvas.append()
//     .data(arr)
//     .enter()
//     .append("circle")
//     .attr("fill", "teal")
//     .attr("cx", function(d){
//       return d.x;
//     })
//     .attr("cy", function(d){
//       return d.y;
//     })
//     .attr("r", 10)
//     .transition()
//     .duration(1500)
//     .attr("cx", Math.random()*700)
//     .attr("cy", Math.random()*500)
//     .attr("r", 10)

   

// }

// Enemies.prototype.move = function(){
//   d3.select(this.enemy)
//   .transition()
//   .duration(1500)
//   .attr("cx", Math.random()*700)
//   .attr("cy", Math.random()*500)
//   .attr("r", 10)
//     .each("end", function() {
//       d3.select(this)
//       .transition(5000)
//       .attr("fill", "lavender")
//       .attr("r", 200)
//     })
// }





  