var gl;
var invh, h;
var invw, w;

var roidBuffer, asteroidShaderProgram;
var roids = [];
var roidsToDelete = [];

var menuShaderProgram;
var boxVerts;
var startBool = false;

var pastTime = 0;
var timeDelta = 0;

var astID = 0;
var numOfAsteroids = 3, maxSpawnAsteroids = 10;
var divsForAsteroids = 12;  // there is no reason to decrease
                            // the number of points for smaller
                            // asteroids..

var canvas;

function init(){
    canvas=document.getElementById("asteroids-canvas");
    gl=WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert( "WebGL is not available" ); }

    //canvas.width = window.innerWidth - 32;
    //canvas.height = window.innerHeight - 32;

    // This small segment of code is dedicated to getting the height and
    // width of the canvas and then calculating their inverse. This is an
    // important technique used to same time when calculating a pixel
    // position in the viewport
    h = parseFloat(canvas.height); invh = 1.0/h;
    w = parseFloat(canvas.width); invw = 1.0/w;

    // This quick and dirty implementation of a clicking event
    // Is being used to test the isInside function that the 
    // asteroids objects have to determine if a point is inside
    // of them. The hope is to use this function to have easy
    // collision detection with the shots from them player
    canvas.addEventListener("mousedown", function(e)
    { tryClick(canvas, e); }); 
    canvas.addEventListener("mouseup", function(e)
    { tryStart(canvas, e); });

    // Then we call the setup functions which will just prepare GL and our
    // asteroids. Eventually the player setup code should be called here
    // or at least in a similar manner.
    setupGL();
    setupNewSetOfAsteroids();


    boxVerts = [ vec4( -1, -1, 0, 1), vec4( -1, 1, 0, 1), 
        vec4( 1, 1, 0, 1), vec4( 1, -1, 0, 1)]
    var scaleMat = mat4([ 20, 0, 0, 0 ],
                        [ 0, 8, 0, 0 ],
                        [ 0, 0, 1, 0 ],
                        [ 0, 0, 0, 1 ]);
    boxVerts = matVecArrMult( boxVerts, scaleMat );

    window.requestAnimationFrame(animate);
}

// This event function is used to test the isInside functionality
// Hopefull this will be useful in later version, for possible 
// collision detection.
function tryClick(canvas, event) {

    // Gets the rectangle making up the canvas then calculates
    // the mouse position with the bottom left being observed
    // as the (0, 0).
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = rect.height - (event.clientY - rect.top);

    // Now we loop through all asteroids saved and see if the
    // clicked location is within the asteroids. There is a
    // sort function in place that will eventually allow us
    // to optimize the number of times this for loop is ran
    // (possibly making a binary search functionality)
    for (var i = 0; i < roids.length; i++){
        if (roids[i].isInside(vec2(x,y))){
            roids[i].destroyed = true;// A reference for how this
                                      // function works will be
                                      // pasted at the bottom of
                                      // this script
        }
    } 

    var minX = boxVerts[0][0]*4 + w*.5;
    var maxX = boxVerts[2][0]*4 + w*.5;
    var minY = boxVerts[0][1]*3 + h*.5;
    var maxY = boxVerts[1][1]*3 + h*.5;

    if (x >= minX && x <= maxX && y >= minY && y <= maxY){
        startBool = true;
        var clickUniform = gl.getUniformLocation( menuShaderProgram, "clicked" );
        gl.uniform1i( clickUniform, startBool );
    }
}

function tryStart(canvas, event){

    // Gets the rectangle making up the canvas then calculates
    // the mouse position with the bottom left being observed
    // as the (0, 0).
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = rect.height - (event.clientY - rect.top);

    var minX = boxVerts[0][0]*4 + w*.5;
    var maxX = boxVerts[2][0]*4 + w*.5;
    var minY = boxVerts[0][1]*3 + h*.5;
    var maxY = boxVerts[1][1]*3 + h*.5;

    if (x <= minX || x >= maxX || y <= minY || y >= maxY){
        startBool = false;
        var clickUniform = gl.getUniformLocation( menuShaderProgram, "clicked" );
        gl.uniform1i( clickUniform, startBool );
    }else if (startBool) {
        start();
    }

}

// #region SETUP FUNCTIONS REGION

// Sets up the webGL to start having stuff drawn to it.
function setupGL(){

    // Sets up the viewport, the background color and
    // clears the buffer bit.
    gl.viewport( 0, 0, w, h );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    gl.clear( gl.COLOR_BUFFER_BIT );

    roidBuffer = gl.createBuffer();
    
    asteroidShaderProgram = initShaders( gl, "vertex-shader", "frag-asteroid" );
    menuShaderProgram = initShaders( gl, "vertex-shader", "frag-menu" );

}

// This setup function is a little bit more complicated
// we first generate a collection of asteroids. Every
// asteroid has randomized values for their velocity,
// start position and for each point around the asteroid
// a randomized radius which gives us the more asteroid
// like asteroid. Technically we could increase the
// divisions amount in order to have more circular
// asteroids, but this could ruin the look as well.
function setupNewSetOfAsteroids() {

    var size = 3;
    var speed = 90;

    // Uses the above argument to generate that number of asteroids
    // to start with. This uses a lot of Math.random in order to ensure
    // a fun always-changing experience for the player. The center, or
    // position the asteroid is on the canvas is random in both directions,
    // same with the velocity. 
    for (var asteroidAmount = 0; asteroidAmount < numOfAsteroids; asteroidAmount++) {
        
        // This speed value was trial-and-error arbitrarily set. There
        // was nothing special about this speed other than it looked okay
        // during initial testing.
        var vel = vec2( Math.random() * 2.0*speed - speed, Math.random() * 2.0*speed - speed );
        var center = vec2( Math.random() * w, Math.random() * h );
        var newRoid = makeAsteroid(size, vel, center);

        roids.push(newRoid);
    }

}

// Creates asteroids
function makeAsteroid(size, vel, center){

    // These two variables are used for the radius of the
    // asteroids. Where radMult is the multiplier on the 
    // rand function, and the radDiff helps us specify
    // a nice ring of where the radii can be. Much like
    // the width of a disk.
    var radMult = 13*size; // Used to be 40
    var radDiff = 1.6*size; // Used to be 5


    var stepAmount = 2 * Math.PI / divsForAsteroids;
    var points = [];
    for (var theta = 0; theta < 2 * Math.PI; theta += stepAmount) {
        var rad = ( Math.random() * radMult) + (radMult - radDiff );
        var x = rad * Math.cos( theta );
        var y = rad * Math.sin( theta );
        points.push( vec2( x, y ) );
    }

    // Calculate area, this will be used hopefully for energy conversion so that
    // smaller asteroids broken off from larger ones will move faster by some amount
    var area = 0;
    for (var i = 1; i < points.length; i++) {
        var currPt = points[i];
        var prevPt = points[i - 1];
        var side1 = vec3( prevPt );
        var side2 = vec3( currPt );
        var crossProd = cross( side1, side2 );
        area += mag( crossProd ) * .5;
    }

    var currRoid = new Asteroid( points, divsForAsteroids, center, vel, area, size );
    currRoid.id = astID;
    astID++;
    return currRoid;
    // console.log(`currRoid: ${currRoid}`);
}

// #endregion

// The animate function is being used to update the time
// deltas and is being used to update all drawings on the
// canvas. First, we get the current time with the input
// parameter, then we update all necessary objects then
// finally we re-draw them onto the canvas. Then the 
// request animation frame is called again
function animate( now ){
    now *= .001;
    
    gl.clear( gl.COLOR_BUFFER_BIT );

    // Update all asteroid position, then render them
    updateAsteroids( now );
    drawAsteroids();

    drawStart();

    // Now that all has been updated and rendered, we update
    // the past time to now and request the next animation
    pastTime = now;
    
    window.requestAnimationFrame( animate );
}

function drawStart(){

    drawCharacter( sVerts, vec2( w/2 - 60, h/2 - 14 ) );
    drawCharacter( tVerts, vec2( w/2 - 30, h/2 - 14 ) );
    drawCharacter( aOutVerts, vec2( w/2, h/2 - 14 ) );
    drawCharacter( aInVerts, vec2( w/2, h/2 - 14 ) );
    drawCharacter( rOutVerts, vec2( w/2 + 30, h/2 - 14 ) );
    drawCharacter( rInVerts, vec2( w/2 + 30, h/2 - 14 ) );
    drawCharacter( tVerts, vec2( w/2 + 60, h/2 - 14 ) );
    drawCharacter( boxVerts, vec2(w/2, h/2 ) );

    drawCharacter( aOutVerts, vec2( w/2 - 120, h/2 + 50 ) );
    drawCharacter( aInVerts,  vec2( w/2 - 120, h/2 + 50 ) );
    drawCharacter( sVerts,    vec2( w/2 - 90, h/2 + 50 ) );
    drawCharacter( tVerts,    vec2( w/2 - 60, h/2 + 50 ) );
    drawCharacter( eVerts,    vec2( w/2 - 30, h/2 + 50 ) );
    drawCharacter( rOutVerts, vec2( w/2, h/2 + 50 ) );
    drawCharacter( rInVerts,  vec2( w/2, h/2 + 50 ) );
    drawCharacter( oOutVerts, vec2( w/2 + 30, h/2 + 50 ) );
    drawCharacter( oInVerts,  vec2( w/2 + 30, h/2 + 50 ) );
    drawCharacter( iVerts,    vec2( w/2 + 60, h/2 + 50 ) );
    drawCharacter( dOutVerts, vec2( w/2 + 90, h/2 + 50 ) );
    drawCharacter( dInVerts,  vec2( w/2 + 90, h/2 + 50 ) );
    drawCharacter( sVerts,    vec2( w/2 + 120, h/2 + 50 ) );
    

}

function drawCharacter( numVerts, positition ){
    var scaleMat = mat4([4, 0, 0, 0],
                        [0, 3, 0, 0],
                        [0, 0, 1, 0],
                        [0, 0, 0, 1]);
    var newVerts = matVecArrMult(numVerts, scaleMat);

    // Clears our buffer bit and then sets up our roid buffer
    var numBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, numBuffer );
    gl.useProgram( menuShaderProgram );

    // Sets up our shaders
    var myPos = gl.getAttribLocation( menuShaderProgram, "myPosition" );
    gl.enableVertexAttribArray( myPos );
    gl.vertexAttribPointer( myPos, 2, gl.FLOAT, false, 0, 0 );

    var pointsToRender = [];
    for (var i = 0; i < newVerts.length; i++){
        pointsToRender.push( convertCanvasPosToView( newVerts[i][0] + positition[0], newVerts[i][1] + positition[1] ) );
    }

    gl.bufferData( gl.ARRAY_BUFFER, flatten( pointsToRender ), gl.STATIC_DRAW );
    gl.drawArrays( gl.LINE_LOOP, 0, pointsToRender.length );

}

// #region UPDATE FUNCTIONS REGION

// This function handles updating the positions of all the
// asteroids and will also handle making sure we have a
// smooth transition between edges for all asteroids.
// It will do this by using basic vector math to determine
// direction of movement.
function updateAsteroids( now ){

    // calculates the difference in time between this frame
    // and last frame.
    var timeDelta = now - pastTime;

    // Stoes the value of the length before any update are
    // made, just in case there are additions to the array
    // as the update happens. It should be noted that we
    // should have separate arrays setup specifically
    // dedicated to deleting asteroids as we blow them up
    // or for any other reason.
    var currCount = roids.length;

    // Loops through all asteroids and updates their
    // positions. It then uses vector math and some logic
    // to move the asteroid to the oposite side of the
    // screen to give the effect of continuous movement.
    for (var i = 0; i < currCount; i++){

        // Gets the current asteroid just for ease of use,
        // same thing with velocity. Uses these to move
        // the current position of this asteroid.
        var currRoid = roids[i];
        var currVel = currRoid.velocity;
        var center = currRoid.position;

        // Collision goes here!
        if (currRoid.destroyed == true && currRoid.size > 1){
            
            var vel1 = rotateVelocity(currVel, Math.PI/8.0 + Math.random()*Math.PI/16.0 );
            var vel2 = rotateVelocity(currVel, -Math.PI/8.0 + Math.random()*Math.PI/16.0 );
            vel1 = vec2(vel1[0]*1.5,vel1[1]*1.5);
            vel2 = vec2(vel2[0]*1.5,vel2[1]*1.5);
            var newRoid1 = makeAsteroid( currRoid.size-1, vel1, vec2( center[0], center[1] ) );
            var newRoid2 = makeAsteroid( currRoid.size-1, vel2, vec2( center[0], center[1] ) );
            roids.push( newRoid1 );
            roids.push( newRoid2 );
            for ( var j = 0; j < roids.length; j++ ){
                if (currRoid.id == roids[j].id){
                    roidsToDelete.push(j);
                }
            }
        } else if (currRoid.destroyed == true && currRoid.size == 1) {
            roidsToDelete.push(i);
        } else {
            center[0] += currVel[0]*timeDelta;
            center[1] += currVel[1]*timeDelta;
        }

        // This part of the code leverages knowledge of 
        // vector math as well as understanding the desired
        // movement effect of the asteroids in order to get
        // them to scroll endlessly across the screen.
        var velMag = mag( vec3( currVel ) );
        var dir = vec2( currVel[0]/velMag, currVel[1]/velMag );

        // Assume to be true, but then change to false when one is in view.
        var allPointsOutOfView = true;
        let outsidePointVal = vec2(0, 0);
        for (var j = 0; j < currRoid.points.length; j++){

            var currPoint = currRoid.points[j];
            var offScreen = false;
            // If the point's x is out of range and the asteroid is moving
            // in a positive maner, 
            if ((currPoint[0] + center[0] > w) && dir[0] > 0){ outsidePointVal[0] = -w; offScreen = true; }
            if ((currPoint[0] + center[0] < 0) && dir[0] < 0){ outsidePointVal[0] = w; offScreen = true; }

            if ((currPoint[1] + center[1] > h) && dir[1] > 0){ outsidePointVal[1] = -h; offScreen = true; }
            if ((currPoint[1] + center[1] < 0) && dir[1] < 0){ outsidePointVal[1] = h; offScreen = true; }
            allPointsOutOfView &= offScreen;
        }

        if ( mag( vec3( outsidePointVal ) ) > 1 && !currRoid.goingOffScreen){
            currRoid.goingOffScreen = true;
            var edgeRoid = new Asteroid();
            Object.assign( edgeRoid, currRoid );
            edgeRoid.position = vec2( currRoid.position[0], currRoid.position[1] );
            edgeRoid.goingOffScreen = false;
            edgeRoid.destroyed = false;
            edgeRoid.position[0] += outsidePointVal[0];
            edgeRoid.position[1] += outsidePointVal[1];
            roids.push(edgeRoid);
        }
        if (allPointsOutOfView){
            var canPush = true;
            for (var j = 0; j < roidsToDelete.length; j++ ){
                if (isEqual(roidsToDelete[j], currRoid)){
                    canPush = false;
                    break;
                }
            }
            if (canPush){
                roidsToDelete.push(i);
            }
        }
    }
    // Deletes busted asteroids
    var length = roidsToDelete.length;
    for (var i = 0; i < length; i++){
        var delRoidInd = roidsToDelete.pop();
        var delRoid = roids[delRoidInd];
        if ( delRoid.destroyed ){
            const explodeAudio = document.getElementById("explodeSound");
            const newAudio = explodeAudio.cloneNode()
            newAudio.play()
        }
        roids.splice(delRoidInd,1);

    }

    roids.sort( compareAsteroids );

    if (roids.length == 0){
        if (numOfAsteroids < maxSpawnAsteroids)
        numOfAsteroids++;
        setupNewSetOfAsteroids();
    }

}

// #endregion

// #region DRAW FUNCTIONS REGION

// This function is used explicitly to draw the asteroids
// Eventually there will be another function drawing all
// types of enemies/obstacles we implement as well as the
// player.
function drawAsteroids(){

    // Clears our buffer bit and then sets up our roid buffer
    gl.bindBuffer( gl.ARRAY_BUFFER, roidBuffer );
    gl.useProgram( asteroidShaderProgram );

    // Sets up our shaders
    var myPos = gl.getAttribLocation( asteroidShaderProgram, "myPosition" );
    gl.enableVertexAttribArray( myPos );
    gl.vertexAttribPointer( myPos, 2, gl.FLOAT, false, 0, 0 );

    // Loops through all asteroids, uses the point positions
    // and the asteroids positions and the convertCanvasPosToView
    // in order to calculate the points' positions in the viewport.
    // All of these converted positions are saved to a pointsToRender
    // array and then rendered with the gl.LINE_LOOP to get the generic
    // Atari asteroids look.
    for (var i = 0; i < roids.length; i++){

        // Only points saved to this array will actually be rendered.
        var pointsToRender = [];
        var currRoid = roids[i];
        var center = currRoid.position;

        // Loops through each point making up the current asteroid and
        // converts the canvas space position to the viewport space
        // position.
        for (var j = 0; j < currRoid.points.length; j++){
            var point = currRoid.points[j];
            pointsToRender.push( convertCanvasPosToView( point[0] + center[0], point[1] + center[1] ) );
        }

        gl.bufferData( gl.ARRAY_BUFFER, flatten( pointsToRender ), gl.STATIC_DRAW );

        // Special uniform to surprise the user when they click on some
        // asteroids. This whole idea with the click and uniform on the
        // fragment shader and be used to our advantage in order to have
        // cool effects on asteroids that are hit.
        var clickUniform = gl.getUniformLocation( asteroidShaderProgram, "destroyed" );
        gl.uniform1i( clickUniform, currRoid.destroyed );

        gl.drawArrays( gl.LINE_LOOP, 0, pointsToRender.length );
    }
}

// #endregion

// #region USEFUL FUNCTIONS REGION

const isEqual = (...objects) => objects.every(obj => JSON.stringify(obj) === JSON.stringify(objects[0]));

// A very useful vector math function that returns the
// cross product of the two input vectors. They are all
// assumed to be vec3
/* Visual for cross product help
        |  i   j   k  |
    v1z | v1x v1y v1z | v1x
v2y v2z | v2x v2y v2z | v2x v2y
*/
function cross( v1, v2 ){
    var xVal = v1[1]*v2[2] - v1[2]*v2[1];
    var yVal = v1[2]*v2[0] - v1[0]*v2[2];
    var zVal = v1[0]*v2[1] - v1[1]*v2[0];
    return vec3( xVal, yVal, zVal );
}

// A very useful vector math function that returns the
// magnitude of the input vector. They are all assumed
// to be vec3, but we could extend this to vec4 if 
// deemed necessary
function mag( v ){
    return Math.sqrt( v[0]*v[0] + v[1]*v[1] + v[2]*v[2] );
}

// A very useful vector math function that returns the
// dot product of the two input vectors. They are all
// assumed to be vec3, but we could extend this to vec4
// if deemed necessary
function dot ( v1, v2 ){
    return ( v1[0]*v2[0] + v1[1]*v2[1] + v1[2]*v2[2] );
}

function matVecArrMult( vArr, matMult ){
    
    if ( vArr[0].length != matMult.length )
    { throw "Tried to do an invalid multiplication, matrix multiplication must be MxN * NxK"; }

    if ( vArr.legth == 0 ) { throw "vArr length is 0, this is invalid" }
    if ( vArr[0].length == 0 ) { throw "vArr[0] length is 0, this is invalid" }
    if ( matMult.length == 0 ) { throw "matMult length is 0, this is invalid" }
    if ( matMult[0].length == 0 ) { throw "matMult[0] length is 0, this is invalid" }

    var result = [];
    for ( var i = 0; i < vArr.length; ++i ) {
        result.push( [] );

        for ( var j = 0; j < matMult[0].length; ++j ) {
            var sum = 0.0;
            for ( var k = 0; k < matMult.length; ++k ) {
                sum += vArr[i][k] * matMult[k][j];
            }
            result[i].push( sum );
        }
    }
    return result;

}

// This is a very handy function that is pretty much
// optimized as much as possible in order to ensure
// we are spending less time converting and more time
// on more important tasks. This is where getting the
// inverse height and width values becomes useful
function convertCanvasPosToView( x, y ){
   return vec2( (x*invw*2.0) - 1, (y*invh*2.0) - 1 );
}

// Changes direction of a vec2
function rotateVelocity(vel, theta){
    var rotMat = mat2([Math.cos(theta), Math.sin(theta)],[-Math.sin(theta), Math.cos(theta)]);
    var velArr = [vel];
    velArr = matVecArrMult(velArr, rotMat);
    return vec2(velArr[0][0], velArr[0][1]);
}

// #endregion

// #region M4

var m4 = {
    multiply: function(a, b) {
        var b00 = b[0 * 4 + 0];
        var b01 = b[0 * 4 + 1];
        var b02 = b[0 * 4 + 2];
        var b03 = b[0 * 4 + 3];
        var b10 = b[1 * 4 + 0];
        var b11 = b[1 * 4 + 1];
        var b12 = b[1 * 4 + 2];
        var b13 = b[1 * 4 + 3];
        var b20 = b[2 * 4 + 0];
        var b21 = b[2 * 4 + 1];
        var b22 = b[2 * 4 + 2];
        var b23 = b[2 * 4 + 3];
        var b30 = b[3 * 4 + 0];
        var b31 = b[3 * 4 + 1];
        var b32 = b[3 * 4 + 2];
        var b33 = b[3 * 4 + 3];
        var a00 = a[0 * 4 + 0];
        var a01 = a[0 * 4 + 1];
        var a02 = a[0 * 4 + 2];
        var a03 = a[0 * 4 + 3];
        var a10 = a[1 * 4 + 0];
        var a11 = a[1 * 4 + 1];
        var a12 = a[1 * 4 + 2];
        var a13 = a[1 * 4 + 3];
        var a20 = a[2 * 4 + 0];
        var a21 = a[2 * 4 + 1];
        var a22 = a[2 * 4 + 2];
        var a23 = a[2 * 4 + 3];
        var a30 = a[3 * 4 + 0];
        var a31 = a[3 * 4 + 1];
        var a32 = a[3 * 4 + 2];
        var a33 = a[3 * 4 + 3];
     
        return [
          b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
          b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
          b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
          b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
          b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
          b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
          b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
          b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
          b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
          b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
          b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
          b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
          b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
          b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
          b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
          b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
        ];
    },
    translation: function(tx, ty, tz) {
        return [
           1,  0,  0,  0,
           0,  1,  0,  0,
           0,  0,  1,  0,
           tx, ty, tz, 1,
        ];
      },
    translate: function(m, tx, ty, tz) {
        return m4.multiply(m, m4.translation(tx, ty, tz));
    },
    scaling: function(sx, sy, sz) {
        return [
          sx, 0,  0,  0,
          0, sy,  0,  0,
          0,  0, sz,  0,
          0,  0,  0,  1,
        ];
      },
    
    scale: function(m, sx, sy, sz) {
        return m4.multiply(m, m4.scaling(sx, sy, sz));
    },
    orthographic: function(left, right, bottom, top, near, far) {
      return [
        2 / (right - left), 0, 0, 0,
        0, 2 / (top - bottom), 0, 0,
        0, 0, 2 / (near - far), 0,
   
        (left + right) / (left - right),
        (bottom + top) / (bottom - top),
        (near + far) / (near - far),
        1,
      ];
    }
}

// #endregion

// Shoot Sound:
// https://freesound.org/people/LittleRobotSoundFactory/sounds/270344/
// Explosion Sound:
// https://freesound.org/people/jalastram/sounds/317748/

function start() {
    window.location.href = "asteroids.html";
}