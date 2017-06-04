/**
 * Created by christopher on 7/24/14.
 */
function BulletP(owner){
    tBulletP = new Sprite(scene, "plasBolt.png", 10, 10);
    tBulletP.setBoundAction(DIE);
    tBulletP.hide();
    tBulletP.setImgAngle(0);

    tBulletP.fire = function(){
        this.show();
        this.setMoveAngle(0);
        this.setSpeed(15);
        this.setPosition(player.x, player.y);
    }//end fire

    return tBulletP;
}//end Bullet

function BulletE(owner){
    tBulletE = new Sprite(scene, "plasBoltE.png", 30, 10);
    tBulletE.setBoundAction(DIE);
    tBulletE.owner = owner;
    tBulletE.hide();
    tBulletE.setImgAngle(180);

    tBulletE.fire = function(angle, speed){
        this.show();
        this.setAngle(angle);
        this.setSpeed(speed);
        this.setPosition(this.owner.x, this.owner.y);
    }//end fire

    return tBulletE;
}//end Bullet

function makeBullets() {
    bulletsP = new Array();

    //make player bullets
    for (i = 0; i < NUM_BULLETS; i++){
        bulletsP[i] = new BulletP();
    }//end for
}//end makeBullets

function updateBullets(){
    for (i = 0; i< NUM_BULLETS; i++) {
        bulletsP[i].update();
    }//end for
    if(boss.visible){
        boss.bullets.update();
        boss.bulletsL.update();
        boss.bulletsR.update();
    }
}//end updateBullets