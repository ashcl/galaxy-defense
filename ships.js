/**
 * Created by Christopher on 8/13/14.
 */
function Plane(){
    tPlane = new Sprite(scene, "plane.png", 50, 50);
    tPlane.setSpeed(0);
    tPlane.setPosition(400, 500);
    tPlane.setPosition(300, 500);
    tPlane.setBoundAction(STOP);
    tPlane.followMouse = function(){
        this.setPosition(scene.getMouseX(), 500);
    }//end followMouse

    tPlane.checkKeys = function(maxEng){
        elapsedTime = timerP.getElapsedTime();
        if (keysDown[K_C]) {
            if(energy > 0) {
                if (elapsedTime > delay) {
                    currentBullet++;
                    if (currentBullet >= NUM_BULLETS) {
                        currentBullet = 0;
                    }//end currentBullet if
                    bulletsP[currentBullet].fire();
                    shot[currentBullet].play();
                    energy -= 3;
                    timerP.reset();
                }//end delay if
            }//end energy if
        }//end fire if
        if (energy > maxEng){
            energy = maxEng;
        }
    }//end checkKeys

    return tPlane;
}//end Plane constructor

function Enemy() {
    tEnemy = new Sprite(scene, "enemy.png", 50, 50);
    tEnemy.setSpeed(0);
    tEnemy.setAngle(180);
    tEnemy.ships = ["speedEnemy.png", "enemy.png", "slowEnemy.png"];
    tEnemy.bullets = new BulletE(tEnemy);
    tEnemy.health = 2;
    //set enemy to new position

    tEnemy.reset = function(){
        newX = (Math.random() * scene.width);
        speed = (Math.random() * 5);
        this.setPosition(newX, 0);
        this.setSpeed(speed);
        if(speed > 3.5){
            this.setImage(this.ships[SPEED]);
            this.setAngle(180);
            this.health = 1
        }//end fast speed if
        if(speed > 2){
            if(speed < 3.5){
                this.setImage(this.ships[NORMAL]);
                this.setAngle(180);
                this.health = 2;
            }//end internal if
        }//end med Speed if
        if (speed < 2){
            this.setImage(this.ships[SLOW]);
            this.setAngle(180);
            this.health = 3;
        }//end slow if
    }//end reset

    tEnemy.autoFire = function() {
        elapsedTimeE = timerE.getElapsedTime();
        if(this.speed < 2) {
            if (this.speed > 0) {
                if (this.bullets.visible != true) {
                    if (elapsedTimeE > delay) {
                        currentBulletE++;
                        if (currentBulletE >= NUM_BULLETS) {
                            currentBulletE = 0;
                        }
                        angle = (this.angleTo(player) + 180);
                        this.bullets.fire(angle, 10);
                        shotE[currentBulletE].play();
                        timerE.reset();
                    }//end timer if
                }//end if
            }//end if
        }//end if
    }//end autoFire

    tEnemy.checkBounds = function(){
        if(this.y > scene.height){
            passed++;
            this.reset();
        }
    }//end checkBounds

    tEnemy.reset();
    return tEnemy;
}//end Enemy

function Boss(){
    tBoss = new Sprite(scene, "bossmain.png", 100, 100);
    tBoss.setPosition(400, 0);
    tBoss.setMoveAngle(180);
    tBoss.setSpeed(1);
    tBoss.setBoundAction(BOUNCE);

    tBoss.health = 100;

    tBoss.leftWing = new Sprite(scene, "leftWing.png", 100, 100);
    tBoss.rightWing = new Sprite(scene, "rightWing.png", 100, 100);
    tBoss.leftWing.health = 50;
    tBoss.rightWing.health = 50;

    tBoss.bullets  = new BulletE(tBoss);
    tBoss.bulletsL = new BulletE(tBoss.leftWing);
    tBoss.bulletsR = new BulletE(tBoss.rightWing);

    tBoss.updateWings = function(){
        tBoss.leftWing.setPosition((this.x - 100), this.y);
        tBoss.rightWing.setPosition((this.x + 100), this.y);
        tBoss.leftWing.update();
        tBoss.rightWing.update();
    }

    tBoss.autoFire = function() {
        elapsedTimeE = timerE.getElapsedTime();
        if(this.speed <= 0) {
            if (this.bullets.visible != true) {
                currentBulletE++;
                if (currentBulletE >= NUM_BULLETS) {
                    currentBulletE = 0;
                }
                angle = (this.angleTo(player) + 180);
                this.bullets.fire(angle, 25);
                shotE[currentBulletE].play();
                timerE.reset();
            }//end if
            if (this.leftWing.visible) {
                if (this.bulletsL.visible != true) {
                    currentBulletE++;
                    if (currentBulletE >= NUM_BULLETS) {
                        currentBulletE = 0;
                    }
                    angleL = (this.leftWing.angleTo(player) + 180);
                    this.bulletsL.fire(angleL, 25);
                    shotE[currentBulletE].play();
                    timerE.reset();
                }//end if
            }
            if (this.rightWing.visible) {
                if (this.bulletsR.visible != true) {
                    currentBulletE++;
                    if (currentBulletE >= NUM_BULLETS) {
                        currentBulletE = 0;
                    }
                    angleR = (this.rightWing.angleTo(player) + 180);
                    this.bulletsR.fire(angleR, 25);
                    shotE[currentBulletE].play();
                    timerE.reset();
                }//end if
            }
        }//end if

        if (tBoss.y >=75){
            tBoss.setSpeed(0);
            tBoss.leftWing.setSpeed(0);
            tBoss.rightWing.setSpeed(0);
        }//end if
        tBoss.updateWings();
    }//end autoFire


    return tBoss;
}

function makeEnemies() {
    enemies = new Array(NUM_ENEMIES);
    for (i = 0; i<NUM_ENEMIES; i++){
        enemies[i] = new Enemy();
    }//end for
}//end makeEnemies

function updateEnemies(){
        for (i = 0; i < NUM_ENEMIES; i++) {
            enemies[i].autoFire();
            enemies[i].update();
            enemies[i].bullets.update();
        }//end for

}//end update enemies