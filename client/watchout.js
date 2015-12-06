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
        }
      }
      arr.push(obj);
    }

var updateCurrentScore = function(){
  d3.select(".current")
  .text("Timer: " + currentScore);
}

var updateHighScore = function(){
  if(currentScore > highScore){
    highScore = currentScore;
    d3.select(".highscore")
    .text("Fastest Time: "+ highScore)
  }

  d3.select(".collisions")
  .text("Fishies Eaten: " + collisions);
}

// var playerArr = [];
// playerArr[0] = {id: "player", x: 350, y: 250};

//Setting up Player
var player = canvas.append("image")
    .attr('class','player')
    // .attr('fill', 'beige')
    .attr("height",  75)
    .attr("width", 75)
    .attr("xlink:href","shark.gif")

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
    d3.select(this).attr('x', x-37.5);
    d3.select(this).attr('y', y-37.5);
  })

canvas.select("image.player").call(drag);

// canvas.append("defs")
//   .append("pattern")
//   .attr("id", "fish")
//   .attr("width", 30)
//   .attr("height", 30)
//   .append("image")
//   .attr("xlink:href", "./asteroid.png")
//   .attr("width", 30)
//   .attr("height", 30)


//followMouse();

// Setting up Enemies
    var enemy = canvas.selectAll("image")
    .data(arr)
    .enter()
    .append("image")
    .attr('class','enemy')
    // .attr("fill", "url(#fish)")
    .attr("x", function(d){
      return d.x;
    })
    .attr("y", function(d){
      return d.y;
    })
    // .attr("r", 50)
    // .append("svg:image")
    // .append("g")
    // .append("image")
    .attr("xlink:href","fish.png")
    .attr("width", 20)
    .attr("height", 20);

    
    console.log(enemy);

    var detectCollision = function(){
      if(collisions < 30){
        enemy.each(function(){
                var particularEnemy = d3.select(this);
                playerX = canvas.select("image.player").attr("x")-37.5
                enemyX = particularEnemy.attr("x")-25
                playerY = canvas.select("image.player").attr("y")-37.5
                enemyY = particularEnemy.attr("y")-25
                if(Math.abs(playerX-enemyX) < 37.5 && Math.abs(playerY-enemyY) < 37.5){ 
                  console.log("hit")
                  particularEnemy
                    .remove()
                    collisions = 30 - d3.selectAll('.enemy')[0].length;
                  updateHighScore();
                  
                }
              })
              updateCurrentScore();
      }
      else {

      }
    }

    var enemies = function(){
      setInterval(function(){
        canvas.selectAll("image.enemy")
        .transition()
        .duration(1500)
        .attr("x", function(d){
          d.move();
          return d.x;
        })
        .attr("y", function(d){
          return d.y;
        })
        currentScore+=1

      },1000)      
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





  