let map, ground, brick, questionBox;
let tileSize = 16;
let brickImg, groundImg, qImg, topleft, topright, rightImg, leftImg, marioImg, emptyBoxImg;
let mario;
let top_sensor, bottom_sensor;

function preload(){
    brickImg = loadImage('/images/brickImg.png')
    groundImg = loadImage('images/groundImg.png')
    leftImg = loadImage('images/leftImg.png')
    rightImg = loadImage('images/rightImg.png')
    topleft = loadImage('images/topleft.png')
    topright = loadImage('images/topright.png')
    qImg = loadImage('/images/qImg.png')
    marioImg = loadImage('/images/marioImg.png')
    emptyBoxImg = loadImage('images/emptyBoxImg.png')
    bl_cloud = loadImage('images/bl_cloud.png')
    bm_cloud = loadImage('images/bm_cloud.png')
    br_cloud = loadImage('images/br_cloud.png')
    tl_cloud = loadImage('images/tl_cloud.png')
    tm_cloud = loadImage('images/tm_cloud.png')
    tr_cloud = loadImage('images/tr_cloud.png')

}

function setup() {
    createCanvas(windowWidth, 600);
    world.gravity.y = 40;
    walkable = new Group()

    ground = new walkable.Group();
    ground.collider = 's';
    ground.image = groundImg;
    ground.tile = '=';
    ground.w = tileSize;
    ground.h = tileSize;
    ground.scale = 2;

    brick = new walkable.Group();
    brick.collider = 's';
    brick.image = brickImg;
    brick.tile = 'b';
    brick.w = tileSize;
    brick.h = tileSize;
    brick.scale = 2;

    questionBox1 = new walkable.Group();
    questionBox1.collider = 's';
    questionBox1.image = qImg;
    questionBox1.tile = '1';
    questionBox1.w = tileSize;
    questionBox1.h = tileSize;
    questionBox1.scale = 2;

    questionBox2 = new walkable.Group();
    questionBox2.collider = 's';
    questionBox2.image = qImg;
    questionBox2.tile = '2';
    questionBox2.w = tileSize;
    questionBox2.h = tileSize;
    questionBox2.scale = 2;

    questionBox3 = new walkable.Group();
    questionBox3.collider = 's';
    questionBox3.image = qImg;
    questionBox3.tile = '3';
    questionBox3.w = tileSize;
    questionBox3.h = tileSize;
    questionBox3.scale = 2;

    cloudTL = new Group();
    cloudTL.collider = 'n';
    cloudTL.image = tl_cloud;
    cloudTL.tile = 'i';
    cloudTL.w = tileSize
    cloudTL.h = tileSize
    cloudTL.scale = 2;

    cloudTM = new Group();
    cloudTM.collider = 'n';
    cloudTM.image = tm_cloud;
    cloudTM.tile = 'o';
    cloudTM.w = tileSize
    cloudTM.h = tileSize
    cloudTM.scale = 2;

    cloudTR = new Group();
    cloudTR.collider = 'n';
    cloudTR.image = tr_cloud;
    cloudTR.tile = 'p';
    cloudTM.w = tileSize
    cloudTR.h = tileSize
    cloudTR.scale = 2;

    cloudBL = new Group();
    cloudBL.collider = 'n';
    cloudBL.image = bl_cloud;
    cloudBL.tile = 'j';
    cloudBL.w = tileSize
    cloudBL.h = tileSize
    cloudBL.scale = 2;

    cloudBM = new Group();
    cloudBM.collider = 'n';
    cloudBM.image = bm_cloud;
    cloudBM.tile = 'k';
    cloudBM.w = tileSize
    cloudBM.h = tileSize
    cloudBM.scale = 2;

    cloudBR = new Group();
    cloudBR.collider = 'n';
    cloudBR.image = br_cloud;
    cloudBR.tile = ';';
    cloudBR.w = tileSize
    cloudBR.h = tileSize
    cloudBR.scale = 2;




    pipeLeft = new Group();
    pipeLeft.collider = 's';
    pipeLeft.image = leftImg;
    pipeLeft.tile = 'L';
    pipeLeft.w = tileSize
    pipeLeft.h = tileSize
    pipeLeft.scale = 2;

    pipeRight = new Group();
    pipeRight.collider = 's';
    pipeRight.image = rightImg;
    pipeRight.tile = 'R';
    pipeRight.w = tileSize;
    pipeRight.h = tileSize;
    pipeRight.scale = 2;

    pipeTL = new walkable.Group();
    pipeTL.collider = 's';
    pipeTL.image = topleft;
    pipeTL.tile = 'l';
    pipeTL.w = tileSize;
    pipeTL.h = tileSize;
    pipeTL.scale = 2;

    pipeTR = new walkable.Group();
    pipeTR.collider = 's';
    pipeTR.image = topright;
    pipeTR.tile = 'r';
    pipeTR.w = tileSize;
    pipeTR.h = tileSize;
    pipeTR.scale = 2;

    mario = new Sprite(16, 160, 32, 32);
    mario.rotationLock = true;
    mario.spriteSheet = marioImg;
    mario.anis.frameDelay = 8;
    mario.addAnis({
        run:   {row:0, frames:2},
        stand: {row:0, frames:1}
    })
    mario.scale = 1.5

    top_sensor = new Sprite(mario.x, mario.y - mario.h/2)
    bottom_sensor = new Sprite(mario.x, mario.y - mario.h/2)

    top_sensor.w = mario.w/2;
    top_sensor.h = 2
    bottom_sensor.w = mario.w/2;
    bottom_sensor.h = 2
    bottom_sensor.visible = false;
    top_sensor.visible = false;
    
    let bottomJoint = new GlueJoint(mario, bottom_sensor)
    let topJoint = new GlueJoint(mario, top_sensor)
    topJoint.visible = false;
    bottomJoint.visible = false;

    function closeDescription(event) {
        if (event.target.classList.contains("close-btn")) {
            event.target.closest(".project-description").remove();
        }
    }

    document.addEventListener("click", closeDescription);

    top_sensor.overlaps(questionBox1, (s,q) => {
        // q.image = emptyBoxImg
        let boxX = q.position.x;
        let boxY = q.position.y;

        let projectDescription = document.createElement("div");
        projectDescription.classList.add("project-description");

        projectDescription.innerHTML = `
            <div class="title">
                Computer Science Projects
                <span class="close-btn">✖</span>
            </div>
            <div class="description">
                <p>
                    Here are some of my projects:
                </p>
                <ul>
                    <li><a href="projects/ExploreX/ExploreX.html">ExploreX</a></li>
                    <li><a href="projects/AutogenXLegion/AutogenXLegion.html">Autogen X Legion</a></li>
                </ul>
            </div>
        `;

        projectDescription.style.position = "absolute";
        projectDescription.style.left = boxX - 125 + "px";
        projectDescription.style.top = (boxY - 100) + "px"; 

        document.body.appendChild(projectDescription);
    });

    top_sensor.overlaps(questionBox2, (s,q) => {
        // q.image = emptyBoxImg
        let boxX = q.position.x;
        let boxY = q.position.y;

        let projectDescription = document.createElement("div");
        projectDescription.classList.add("project-description");

        projectDescription.innerHTML = `
            <div class="title">
                Leadership and Extra Curriculars
                <span class="close-btn">✖</span>
            </div>
            <div class="description">
                <p>
                    Check out my involvement in various organizations on campus!
                </p>
                <ul>
                    <li><a href="leadership_EC/SASE/sase.html">Society of Asian Scientists and Engineers</a></li>
                    <li><a href="leadership_EC/CEAS/ceas.html">College of Engineering and Applied Sciences</a></li>
                </ul>
            </div>
        `;

        projectDescription.style.position = "absolute";
        projectDescription.style.left = boxX - 125 + "px";
        projectDescription.style.top = (boxY - 150) + "px"; 

        document.body.appendChild(projectDescription);
    });

    top_sensor.overlaps(questionBox3, (s,q) => {
        // q.image = emptyBoxImg
        let boxX = q.position.x;
        let boxY = q.position.y;

        let projectDescription = document.createElement("div");
        projectDescription.classList.add("project-description");

        projectDescription.innerHTML = `
            <div class="title">
                Former Internships
                <span class="close-btn">✖</span>
            </div>
            <div class="description">
                <p>
                    Here are some of my previous internships and my experiences with them!
                </p>
                <ul>
                    <li><a href="experience/asurion/asurion.html"> Asurion </a></li>
                    <li><a href="experience/boeing/boeing.html"> Boeing </a></li>
                </ul>
            </div>
        `;

        projectDescription.style.position = "absolute";
        projectDescription.style.left = boxX - 125 + "px";
        projectDescription.style.top = (boxY - 125) + "px"; 

        document.body.appendChild(projectDescription);
    });

    new Tiles(
    [
        '..........................iop.........................................................................................................................................................................................................................................................',
        '....iop...................jk;......................................................bbbbbbbb...bbb1.......................1.............bbb.....b11b.....................................................................................................................................',
        '....jk;.........iop..................................................................................................................................................................................................bb.................................................................',
        '................jk;.................................................................................................................................................................................................bbb.................................................................',
        '...................................................................................................................................................................................................................bbbb.................................................................',
        '..............................................................................................................................................................................................................................................................................................',        '..............................................................................................................................................................................................................................................................................................',
        '...........1......2......3........................................................b1b.................1.....b1.....bb......1..1..1......b............bb...........................................................bbbbb.................bb..............................................',
        '.................................................lr.........lr.............................................................................................b..b............bb..b...................................bbbbbb................bbbb.............................................',
        '.........................................lr......LR.........LR............................................................................................bb..bb..........bbb..bb..............bb1b...............bbbbbbb...............bbbbbb............................................',
        '..............................lr.........LR......LR.........LR...........................................................................................bbb..bbb........bbbb..bbb.......lr...................lr.bbbbbbbb...............bbbbbb............................................',
        '..............................LR.........LR......LR.........LR..........................................................................................bbbb..bbbb......bbbbb..bbbb......LR...................LRbbbbbbbbb.........b.....bbbbbb............................................',
        '..............................LR.........LR......LR.........LR..........................................................................................bbbb..bbbb......bbbbb..bbbb......LR...................LRbbbbbbbbb.........b.....bbbbbb............................................',
        '======================================================================..===============...=================================================================================..===========================================================================================================',
        '======================================================================..===============...=================================================================================..===========================================================================================================',
    ],
    0,
    16,
    32,
    32 - 1);
}
function draw(){
    clear()
    background(148,148,255)
    moveMario()
    mario.draw()
}

function moveMario(){
     if(kb.pressing('d')){
        mario.vel.x = 4;
        mario.ani = 'run';
        mario.mirror.x = false;
    }
    else if(kb.pressing('a')){
        mario.vel.x = -4;
        mario.ani = 'run';
        mario.mirror.x = true;
    }
    else{
        mario.ani = 'stand'
    }

    if(kb.presses('space') && mario.colliding(walkable)){
        mario.vel.y = -20;
    } 
}