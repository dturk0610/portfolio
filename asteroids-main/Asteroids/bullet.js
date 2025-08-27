
/* [ vec2(10, 0), vec2(7.071067, 7.071067), vec2(0, 10), 
    vec2(-7.071067, 7.071067), vec2(-10, 0), vec2(-7.071067, -7.071067),
    vec2(0, -10), vec2(7.071067, -7.071067)];
*/
function Bullet ( position = vec2(0, 0), velocity = vec2(0, 0), lifetime = 0 ){
    this.rad = 5;
    this.points = [ vec2(1*this.rad, 0),
                    vec2(.7071067*this.rad, .7071067*this.rad),
                    vec2(0, 1*this.rad),
                    vec2(-.7071067*this.rad, .7071067*this.rad),
                    vec2(-1*this.rad, 0),
                    vec2(-.7071067*this.rad, -.7071067*this.rad),
                    vec2(0, -1*this.rad),
                    vec2(.7071067*this.rad, -.7071067*this.rad) ];
    this.position = position;
    this.velocity = velocity;
    this.lifetime = lifetime;
}

function compareBullets(B1, B2){
    if (B1.position[0] < B2.position[0]) return -1;
    if (B1.position[0] > B2.position[0]) return 1;
    return 0;
}