var level_05 = {

	preload: function () {
		console.log("level_05");
		// Load tile map
		game.load.tilemap('level_05', 'assets/maps/cave2.json', null, Phaser.Tilemap.TILED_JSON);

		//map tile images:
        game.load.image("brown","assets/tileset/ground/brown.png");
        game.load.image("skull_dark","assets/tileset/item/corpse/skull_dark.png");
        game.load.image("grey_stone","assets/tileset/item/statue/grey_stone.png");
        game.load.image("eye","assets/tileset/ground/eye.png");
        game.load.image("dark_stairs","assets/tileset/building/stairs/dark_stairs.png");
        game.load.image("portal","assets/tileset/logic/portal.png");
        game.load.image("collision","assets/tileset/logic/collision.png");
        game.load.image("enormous_creature","assets/tileset/logic/creature/enormous_creature.png");
        game.load.image("demon","assets/tileset/logic/creature/demon.png");
        game.load.image("elemental","assets/tileset/logic/creature/elemental.png");
        game.load.image("undead","assets/tileset/logic/creature/undead.png");
        game.load.image("human","assets/tileset/logic/creature/human.png");
        game.load.image("iron_lamp","assets/tileset/furniture/light/iron_lamp.png");
        game.load.image("flames","assets/tileset/furniture/light/flames.png");
        game.load.image("skeleton","assets/tileset/item/corpse/skeleton.png");
        game.load.image("metal_and_stone","assets/tileset/item/statue/metal_and_stone.png");
        game.load.image("floor_stains_2","assets/tileset/item/blood/floor_stains_2.png");
        game.load.image("floor_stain","assets/tileset/item/blood/floor_stain.png");
        game.load.image("nsew_stains","assets/tileset/item/blood/nsew_stains.png");
        game.load.image("int_rock","assets/tileset/building/wall/int_rock.png");
        game.load.image("brown_edges","assets/tileset/ground/brown_edges.png");
        game.load.image("tan_building","assets/tileset/building/tan_building.png");
        game.load.image("sand_1","assets/tileset/ground/sand_1.png");
        game.load.image("sand_2","assets/tileset/ground/sand_2.png");
        game.load.image("brown_corners","assets/tileset/ground/brown_corners.png");
        game.load.image("window_centered","assets/tileset/building/window/window_centered.png");
        game.load.image("closed","assets/tileset/building/door/closed.png");
        game.load.image("door","assets/tileset/building/door/door.png");
        game.load.image("large_green","assets/tileset/plant/bush/large_green.png");
        game.load.image("dim_yellow_light_7x5","assets/tileset/light/dim_yellow_light_7x5.png");
        game.load.image("dim_yellow_light_5x5","assets/tileset/light/dim_yellow_light_5x5.png");

	},
	create: function () {

		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Mapping layers and tilesets
		/////////////////////////////////////////////////
		this.map = game.add.tilemap('level_05');
        this.map.addTilesetImage("brown","brown");
        this.map.addTilesetImage("skull_dark","skull_dark");
        this.map.addTilesetImage("grey_stone","grey_stone");
        this.map.addTilesetImage("eye","eye");
        this.map.addTilesetImage("dark_stairs","dark_stairs");
        this.map.addTilesetImage("portal","portal");
        this.map.addTilesetImage("collision","collision");
        this.map.addTilesetImage("enormous_creature","enormous_creature");
        this.map.addTilesetImage("demon","demon");
        this.map.addTilesetImage("elemental","elemental");
        this.map.addTilesetImage("undead",".undead");
        this.map.addTilesetImage("human","human");
        this.map.addTilesetImage("iron_lamp","iron_lamp");
        this.map.addTilesetImage("flames","flames");
        this.map.addTilesetImage("skeleton","skeleton");
        this.map.addTilesetImage("metal_and_stone","metal_and_stone");
        this.map.addTilesetImage("floor_stains_2","floor_stains_2");
        this.map.addTilesetImage("floor_stain","floor_stain");
        this.map.addTilesetImage("nsew_stains","nsew_stains");
        this.map.addTilesetImage("int_rock","int_rock");
        this.map.addTilesetImage("brown_edges","brown_edges");
        this.map.addTilesetImage("tan_building","tan_building");
        this.map.addTilesetImage("sand_1","sand_1");
        this.map.addTilesetImage("sand_2","sand_2");
        this.map.addTilesetImage("brown_corners","brown_corners");
        this.map.addTilesetImage("window_centered","window_centered");
        this.map.addTilesetImage("closed","closed");
        this.map.addTilesetImage("door","door");
        this.map.addTilesetImage("large_green","large_green");
        this.map.addTilesetImage("dim_yellow_light_7x5","dim_yellow_light_7x5");
        this.map.addTilesetImage("dim_yellow_light_5x5","dim_yellow_light_5x5");

		this.layers = {
			ground_layer: this.map.createLayer('0_floor'),
			terrain_layer: this.map.createLayer('1_terrain'),
			object_layer: this.map.createLayer('2_object'),
			//roof_layer: this.map.createLayer('3_roof'),
			//roof_add: this.map.createLayer('4_roof_add'),
            collision_layer: this.map.createLayer('collision')
        };


		this.layers.collision_layer.alpha = 0;

		game.physics.arcade.enable(this.layers.collision_layer);

		this.map.setCollision(39, true, this.layers.collision_layer);

		this.layers.ground_layer.resizeWorld();

		this.prevDir = ''; // holds sprites previous direction (left , right) so
		// we can face the correct direction when using the 'idle' animation

		// Adding the knight atlas that contains all the animations
		this.player = game.add.sprite(game.camera.width / 2, game.camera.height / 2, 'knight_atlas');

		//Add the treasure chest
		this.chest = game.add.sprite(430, 1500, 'chest');
		this.chest.scale.setTo(.60, .60);

		//Healthbars
		this.barConfig = {
            width: 50,
            height: 4,
            x: (this.player.x),
            y: (this.player.y + 35),
            bg: {
                color: '#FF0000'
            },
            bar: {
                color: '#00FF00'
            },
            animationDuration: 200,
            flipped: false
		};
		
		// Create and display a health bar
		this.myHealthBar = new HealthBar(this.game, this.barConfig);
		this.myHealthBar.setPercent(game.global.health / 100);

		// Create enemy sprite
		this.enemy = game.add.sprite(1842, 1700, 'knight_atlas');
		this.enemy.health = 100;

		// Create two enemy ghost sprites
		this.ghost = game.add.sprite(300, 1600, 'ghost');
		this.ghost.health = 100;

		this.ghost2 = game.add.sprite(612, 1512, 'ghost');
		this.ghost2.health = 100;

		// Create portal sprites
		this.portal = game.add.sprite(1666, 3674, 'red_portal');
		this.portal.animations.add('rotate', Phaser.Animation.generateFrameNames('red_portal', 1, 3), 40, true);
		this.portal.animations.play('rotate');

		this.portal2 = game.add.sprite(469, 3828, 'red_portal');
		this.portal2.animations.add('rotate', Phaser.Animation.generateFrameNames('red_portal', 1, 3), 40, true);
		this.portal2.animations.play('rotate');

		this.portal3 = game.add.sprite(625, 235, 'red_portal');
		this.portal3.alpha = 0;

		// Ensure multiple coins on path
		this.coins = game.add.group();
		this.coins.enableBody = true;
		this.coins.physicsBodyType = Phaser.Physics.ARCADE;
		this.coins.create(3106, 3448, 'coin');
		this.coins.create(5160, 4320, 'coin');
		this.coins.create(5486, 5192, 'coin');
		this.coins.create(5092, 1066, 'coin');
		this.coins.create(4108, 2422, 'coin');
		this.coins.create(3080, 5182, 'coin');
		this.coins.create(686, 4422, 'coin');
		this.coins.create(1378, 1120, 'coin');
		this.coins.create(3350, 8640, 'coin');
		this.coins.create(5394, 6696, 'coin');
		this.coins.create(6966, 6026, 'coin');
		this.coins.create(6926, 7448, 'coin');
		this.coins.create(3394, 7366, 'coin');
		this.coins.create(5574, 7620, 'coin');
		this.coins.create(4266, 6842, 'coin');
		this.coins.create(946, 7684, 'coin');
		this.coins.create(2844, 578, 'coin');
		this.coins.create(6842, 4056, 'coin');
		this.coins.create(6222, 1416, 'coin');
		this.coins.create(800, 3200, 'coin');

		// Randomly generate 300 more
		for(var i = 0; i < 300; i++){
			this.coins.create((Math.random() * 7000), (Math.random() * 8000), 'coin');
		}

		var total_coins = game.global.coins;
		this.coins.scale.setTo(.5, .5);

		// Add walking and idle animations. Different aninmations are needed based on direction of movement.
		this.player.animations.add('walk_left', Phaser.Animation.generateFrameNames('Walk_left', 0, 8), 20, true);
		this.player.animations.add('walk_right', Phaser.Animation.generateFrameNames('Walk_right', 0, 8), 20, true);
		this.player.animations.add('idle_left', Phaser.Animation.generateFrameNames('Idle_left', 0, 9), 20, true);
		this.player.animations.add('idle_right', Phaser.Animation.generateFrameNames('Idle_right', 0, 9), 20, true);
		this.player.animations.add('run_right', Phaser.Animation.generateFrameNames('Run_right', 0, 9), 20, true);
		this.player.animations.add('run_left', Phaser.Animation.generateFrameNames('Run_left', 0, 9), 20, true);
		this.player.animations.add('dead', Phaser.Animation.generateFrameNames('Dead', 1, 10), 20, false);
		this.player.animations.add('jump_left', Phaser.Animation.generateFrameNames('Jump_left', 0, 9), 15, true);
		this.player.animations.add('jump_right', Phaser.Animation.generateFrameNames('Jump_right', 0, 9), 15, true);
		this.player.animations.add('attack_left', Phaser.Animation.generateFrameNames('Attack_left', 0, 9), 20, false);
		this.player.animations.add('attack_right', Phaser.Animation.generateFrameNames('Attack_right', 0, 9), 20, true);
		this.player.animations.add('jumpattack_left', Phaser.Animation.generateFrameNames('JumpAttack_left', 0, 9), 15, true);
		this.player.animations.add('jumpattack_right', Phaser.Animation.generateFrameNames('JumpAttack_right', 0, 9), 15, true);
		this.player.animations.play('idle_left');

		// Add animations for the enemy.
		this.enemy.animations.add('walk_left', Phaser.Animation.generateFrameNames('Walk_left', 0, 8), 20, true);
		this.enemy.animations.add('walk_right', Phaser.Animation.generateFrameNames('Walk_right', 0, 8), 20, true);
		this.enemy.animations.add('idle_left', Phaser.Animation.generateFrameNames('Idle_left', 0, 9), 20, true);
		this.enemy.animations.add('idle_right', Phaser.Animation.generateFrameNames('Idle_right', 0, 9), 20, true);
		this.enemy.animations.add('attack_left', Phaser.Animation.generateFrameNames('Attack_left', 0, 9), 20, true);
		this.enemy.animations.add('attack_right', Phaser.Animation.generateFrameNames('Attack_right', 0, 9), 20, true);
		this.enemy.animations.play('idle_right');

		//Add animations for the ghost enemies
		this.ghost.animations.add('walk_left', [6, 7, 8], 10, true);
		this.ghost.animations.add('walk_right', [6, 7, 8], 10, true);
		this.ghost.animations.add('ide_left', [0, 1, 2], 10, true);
		this.ghost.animations.add('ide_right', [0, 1, 2], 10, true);
		this.ghost.animations.add('attack_left', [15, 14, 13], 10, true);
		this.ghost.animations.add('attack_right', [10, 11], 10, true);
		this.ghost.animations.play('idle_right');

		//Add animations for the ghost enemies
		this.ghost2.animations.add('walk_left', [6, 7, 8], 10, true);
		this.ghost2.animations.add('walk_right', [6, 7, 8], 10, true);
		this.ghost2.animations.add('ide_left', [0, 1, 2], 10, true);
		this.ghost2.animations.add('ide_right', [0, 1, 2], 10, true);
		this.ghost2.animations.add('attack_left', [15, 14, 13], 10, true);
		this.ghost2.animations.add('attack_right', [10, 11], 10, true);
		this.ghost2.animations.play('idle_right');

		// Chest opening and closing animation
		this.chest.animations.add('open_close', [0, 1, 2, 3, 2, 1, 0, 0, 0, 0], 5, true);

		// turn physics on for sprites
		game.physics.arcade.enable(this.player);
		game.physics.arcade.enable(this.enemy);
		game.physics.arcade.enable(this.chest);
		game.physics.arcade.enable(this.ghost);
		game.physics.arcade.enable(this.ghost2);
		game.physics.arcade.enable(this.portal);
		game.physics.arcade.enable(this.portal2);
		game.physics.arcade.enable(this.portal3);

		// tell camera to follow sprite now that we're on a map
		// and can move out of bounds
		game.camera.follow(this.player);

		// set starting location for player in some middle spot in the map
		this.player.x = 2580;
		this.player.y = 2080;

		// flag to stop movement if character dies
		this.alive = true;

		this.enemy.body.collideWorldBounds = true;
		this.ghost.body.collideWorldBounds = true;
		this.ghost2.body.collideWorldBounds = true;

		// set the anchor for sprite to middle of the view
		this.player.anchor.setTo(0.5);

		k = game.input.keyboard;

		this.flag = true;
		this.flag2 = true;
		this.flag3 = true;

		this.walkAnim = true;
		this.walkAnim2 = true;
		this.walkAnim3 = true;

		this.frame_counter = 0;
		game.addPauseButton(game);
	},

	update: function () {

		this.move();
		
		this.getTileProperties(this.layers.collision_layer,this.player);

		this.frame_counter++;

		if(this.frame_counter % 10 == 0){
			this.chest.animations.play('open_close');
		}

		// Enemies will move toward player if within range
		this.moveTowardPlayer(this.enemy, 50);
		this.moveTowardPlayer2(this.ghost, 60);
		this.moveTowardPlayer3(this.ghost2, 70);
		this.checkPlayerTransport(this.player);

		// Necessary to make sure we always check player colliding with objects
		game.physics.arcade.collide(this.player, this.layers.collision_layer);
		game.physics.arcade.collide(this.enemy, this.layers.collision_layer);
		game.physics.arcade.collide(this.player, this.enemy);
		game.physics.arcade.collide(this.player, this.ghost);
		game.physics.arcade.collide(this.player, this.ghost2);
		game.physics.arcade.collide(this.player, this.chest);

		// Transport player if it crosses a portal
		game.physics.arcade.overlap(this.player, this.portal, function (player, portal) {game.state.start('level_04');}, null, this);
		game.physics.arcade.overlap(this.player, this.portal2, function (player, portal) {game.state.start('level_01');}, null, this);
		game.physics.arcade.overlap(this.player, this.portal3, function (player, portal) {
			this.player.x = 2580;
			this.player.y = 2080;}, null, this);

		// Collect coins if the player walks over them
		game.physics.arcade.overlap(this.player, this.coins, this.collectCoins, null, this);

		// Delete coins randomly generated on collision layer
		game.physics.arcade.overlap(this.coins, this.layers.collision_layer, function (coin, layer) {
			coin.kill();
		}, function (coin, layer) {
			return layer.collides;
		}, this);

		if(game.global.health == 0){
			this.player.animations.play('dead');
			this.alive = false;
	
			// go to game over screen after the death animation plays
			this.player.animations.currentAnim.onComplete.add(this.endGame, this);
			}

		// Remove enemy sprites if they die
		if(this.enemy.health == 0){
			this.enemy.kill();
			this.flag = false;
		}

		if(this.ghost.health == 0){
			this.ghost.kill();
			this.flag2 = false;
		}

		if(this.ghost2.health == 0){
			this.ghost2.kill();
			this.flag3 = false;
		}
	},

	// End game if player dies
	endGame: function () {
		game.state.start('gameOver');
	},

	// Very basic move monster towards player function.
	moveTowardPlayer: function (enemy, speed) {
		if(this.flag){
		if (this.player.x < enemy.x && Math.abs(this.player.x - enemy.x) < 200 && this.walkAnim){
			enemy.body.velocity.x = -speed;
			enemy.animations.play('walk_left');
			console.log("walk left");
			}
		else if(Math.abs(this.player.x - enemy.x) < 300 && this.walkAnim) {
			enemy.body.velocity.x = speed;
			enemy.animations.play('walk_right');
			console.log("walk right");
			}
		if (this.player.y < enemy.y) {
			enemy.body.velocity.y = -speed;
		} else {
			enemy.body.velocity.y = speed;
		}
		this.checkAttack(enemy);
		}
	},

	checkAttack: function (enemy)
	{
		// Get how close players are together 
		var xClose = Math.abs(this.player.x - enemy.x);
		var yClose = Math.abs(this.player.y - enemy.y);

		if(Math.abs(xClose + yClose) < 100){

		if(this.player.x < enemy.x){
			this.walkAnim = false;
			enemy.body.velocity.x = -50;
			enemy.animations.play('attack_left');
			console.log("attack left");
			if(Math.abs(xClose + yClose) < 20){
				if(this.frame_counter % 50 == 0){
					game.global.health -= 5;
					console.log("strike left");
				}
			}
			this.myHealthBar.setPercent(game.global.health / 100);
		}
		else{
			console.log(Math.abs(xClose + yClose));
			this.walkAnim = false;
			enemy.body.velocity.x = 50;
			enemy.animations.play('attack_right');
			console.log("attack_right");
			if(Math.abs(xClose + yClose) < 120){
				if(this.frame_counter % 50 == 0){
					game.global.health -= 5;
					console.log("strike right" + game.global.health);
				}
			}
			this.myHealthBar.setPercent(game.global.health / 100);
		}
		if (this.player.y < enemy.y) {
			enemy.body.velocity.y = -50;
		} else {
			enemy.body.velocity.y = 50;
		}
	}
	},

	moveTowardPlayer3: function (enemy, speed) {
		if(this.flag3){
			console.log("in MTP3");
			console.log(this.walkAnim3);
		if(Math.abs(this.player.x - enemy.x) < 300 && this.walkAnim3){
			if (this.player.x < enemy.x){
				enemy.body.velocity.x = -speed;
				enemy.animations.play('walk_left');
				console.log("walk left");
				console.log(speed);
				}
			else{
				enemy.body.velocity.x = speed;
				enemy.animations.play('walk_right');
				console.log("walk right");
				console.log(speed);
				}
		}
		if (this.player.y < enemy.y) {
			enemy.body.velocity.y = -speed;
		} else {
			enemy.body.velocity.y = speed;
		}
		this.checkAttack3(enemy);
		}
	},

	checkAttack3: function (enemy)
	{
		// Get how close players are together 
		var xClose = Math.abs(this.player.x - enemy.x);
		var yClose = Math.abs(this.player.y - enemy.y);

		if(Math.abs(xClose + yClose) < 100){

		if(this.player.x < enemy.x){
			this.walkAnim3 = false;
			enemy.body.velocity.x = -50;
			enemy.animations.play('attack_left');
			console.log("attack left");
			if(Math.abs(xClose + yClose) < 20){
				if(this.frame_counter % 50 == 0){
					game.global.health -= 5;
					console.log("strike left");
				}
			}
			this.myHealthBar.setPercent(game.global.health / 100);
		}
		else{
			console.log(Math.abs(xClose + yClose));
			this.walkAnim3 = false;
			enemy.body.velocity.x = 50;
			enemy.animations.play('attack_right');
			console.log("attack_right");
			if(Math.abs(xClose + yClose) < 120){
				if(this.frame_counter % 50 == 0){
					game.global.health -= 5;
					console.log("strike right" + game.global.health);
				}
			}
			this.myHealthBar.setPercent(game.global.health / 100);
		}
		if (this.player.y < enemy.y) {
			enemy.body.velocity.y = -50;
		} else {
			enemy.body.velocity.y = 50;
		}
	}
	},

	moveTowardPlayer2: function (enemy, speed) {
		if(this.flag2){
		if (this.player.x < enemy.x && Math.abs(this.player.x - enemy.x) < 200 && this.walkAnim2){
			enemy.body.velocity.x = -speed;
			enemy.animations.play('walk_left');
			console.log("walk left");
			}
		else if(Math.abs(this.player.x - enemy.x) < 300 && this.walkAnim2) {
			enemy.body.velocity.x = speed;
			enemy.animations.play('walk_right');
			console.log("walk right");
			}
		if (this.player.y < enemy.y) {
			enemy.body.velocity.y = -speed;
		} else {
			enemy.body.velocity.y = speed;
		}
		this.checkAttack2(enemy);
		}
	},

	checkAttack2: function (enemy)
	{
		// Get how close players are together 
		var xClose = Math.abs(this.player.x - enemy.x);
		var yClose = Math.abs(this.player.y - enemy.y);

		if(Math.abs(xClose + yClose) < 100){

		if(this.player.x < enemy.x){
			this.walkAnim2 = false;
			enemy.body.velocity.x = -50;
			enemy.animations.play('attack_left');
			console.log("attack left");
			if(Math.abs(xClose + yClose) < 20){
				if(this.frame_counter % 50 == 0){
					game.global.health -= 5;
					console.log("strike left");
				}
			}
			this.myHealthBar.setPercent(game.global.health / 100);
		}
		else{
			console.log(Math.abs(xClose + yClose));
			this.walkAnim2 = false;
			enemy.body.velocity.x = 50;
			enemy.animations.play('attack_right');
			console.log("attack_right");
			if(Math.abs(xClose + yClose) < 120){
				if(this.frame_counter % 50 == 0){
					game.global.health -= 5;
					console.log("strike right" + game.global.health);
				}
			}
			this.myHealthBar.setPercent(game.global.health / 100);
		}
		if (this.player.y < enemy.y) {
			enemy.body.velocity.y = -50;
		} else {
			enemy.body.velocity.y = 50;
		}
	}
	},

	checkPlayerTransport: function (player) {
		varx = Math.abs(player.x - this.chest.x);
		vary = Math.abs(player.y - this.chest.y) - 30;

		// Win the game if player crosses the treasure chest
		if (varx + vary < 150) 
			game.state.start('gameOverWin');
	},

	getTileProperties: function (layer, player) {

		var x = layer.getTileX(player.x);
		var y = layer.getTileY(player.y);

		var tile = this.map.getTile(x, y, layer);

		if (tile) {
			console.log(x, y);
			console.log(tile);
		}

	},

	render: function () {
		game.debug.bodyInfo(this.player, 16, 24);
		// Instructions:
		game.debug.text("Go all the way left to exit this level...", game.width / 2, game.height - 10);
	},
	
	move: function()
	{
		// Each key changes the players velocity in the x or y direction
		// and plays the proper animation. It sets the prevDir so we can
		// face the correct way when stopped.

		// Display health bar
		this.myHealthBar.setPosition(this.player.x, this.player.y - 35);

		// Walk left
		if (k.isDown(Phaser.Keyboard.LEFT) && !k.isDown(Phaser.Keyboard.SHIFT))
		{
			if(k.isDown(Phaser.Keyboard.UP))
			{
				this.player.body.velocity.x = -200;
				this.player.body.velocity.y = -200;
			}
			else if(k.isDown(Phaser.Keyboard.DOWN))
			{
				this.player.body.velocity.x = -200;
				this.player.body.velocity.y = 200;
			}
			else{
				this.player.body.velocity.x = -200;
				this.player.body.velocity.y = 0;
			}
			this.player.animations.play('walk_left');
			this.prevDir = 'left'
		}

		// Walk right
		if (k.isDown(Phaser.Keyboard.RIGHT) && !k.isDown(Phaser.Keyboard.SHIFT)) 
		{
			if(k.isDown(Phaser.Keyboard.UP))
			{
				this.player.body.velocity.x = 200;
				this.player.body.velocity.y = -200;
			}
			else if(k.isDown(Phaser.Keyboard.DOWN)){
				this.player.body.velocity.x = 200;
				this.player.body.velocity.y = 200;
			}
			else
			{
				this.player.body.velocity.x = 200;
				this.player.body.velocity.y = 0;
			}
			this.player.animations.play('walk_right');
			this.prevDir = 'right'
		}

		// Run left
		if (k.isDown(Phaser.Keyboard.SHIFT) && k.isDown(Phaser.Keyboard.LEFT)) 
		{
			if(k.isDown(Phaser.Keyboard.UP))
			{
				this.player.body.velocity.x = -400;
				this.player.body.velocity.y = -400;
			}
			else if(k.isDown(Phaser.Keyboard.DOWN))
			{
				this.player.body.velocity.x = -400;
				this.player.body.velocity.y = 400;
			}
			else{
				this.player.body.velocity.x = -400;
				this.player.body.velocity.y = 0;
			}
			this.player.animations.play('run_left');
			this.prevDir = 'left'
		}

		// Run right
		if (k.isDown(Phaser.Keyboard.SHIFT) && k.isDown(Phaser.Keyboard.RIGHT)) 
		{
			if(k.isDown(Phaser.Keyboard.UP))
			{
				this.player.body.velocity.x = 400;
				this.player.body.velocity.y = -400;
			}
			else if(k.isDown(Phaser.Keyboard.DOWN))
			{
				this.player.body.velocity.x = 400;
				this.player.body.velocity.y = 400;
			}
			else{
				this.player.body.velocity.x = 400;
				this.player.body.velocity.y = 0;
			}
			this.player.animations.play('run_right');
			this.prevDir = 'right'
		}

		// Walk up
		if (k.isDown(Phaser.Keyboard.UP))
		{
			if(k.isDown(Phaser.Keyboard.LEFT))
			{
				this.player.body.velocity.x = -200;
				this.player.animations.play('walk_left');

			}
			else if(k.isDown(Phaser.Keyboard.RIGHT))
			{
				this.player.body.velocity.x = 200;
				this.player.animations.play('walk_right');
			}
			else{
				this.player.body.velocity.x = 0;
				if(this.prevDir == 'left'){
					this.player.animations.play('walk_left');
				}else{
					this.player.animations.play('walk_right');
				}
			}
			this.player.body.velocity.y = -200;
		}

		// Walk down
		if (k.isDown(Phaser.Keyboard.DOWN))
		{
			if(k.isDown(Phaser.Keyboard.LEFT))
			{
				this.player.body.velocity.x = -200;
				this.player.animations.play('walk_left');

			}
			else if(k.isDown(Phaser.Keyboard.RIGHT))
			{
				this.player.body.velocity.x = 200;
				this.player.animations.play('walk_right');
			}
			else{
				this.player.body.velocity.x = 0;
				if(this.prevDir == 'left'){
					this.player.animations.play('walk_left');
				}else{
					this.player.animations.play('walk_right');
				}
			}
			this.player.body.velocity.y = 200;
		}

		// idle
		if (!k.isDown(Phaser.Keyboard.LEFT) && !k.isDown(Phaser.Keyboard.RIGHT) && !k.isDown(Phaser.Keyboard.UP) 
		&& !k.isDown(Phaser.Keyboard.DOWN) && !k.isDown(Phaser.Keyboard.SPACEBAR) && !k.isDown(65) 
		&& !k.isDown(Phaser.Keyboard.ENTER) && !k.isDown(83) && this.alive)
		{
			if(this.prevDir == 'left'){
				this.player.animations.play('idle_left');
			}else{
				this.player.animations.play('idle_right');
			}
			this.player.body.velocity.x = 0;
			this.player.body.velocity.y = 0;
		}
		
		// attack
		if (k.isDown(65))
		{
			if (this.prevDir == 'left')
			{
				this.player.animations.play('attack_left')
			}
			else{
				this.player.animations.play('attack_right')
			}

			//decrease enemy health if within attack range
			if(Math.abs(this.player.x - this.enemy.x) < 80){
				this.enemy.health --;}
			//decrease enemy health if within attack range
			if(Math.abs(this.player.x - this.ghost.x) < 80){
				this.ghost.health --;}
			//decrease enemy health if within attack range
			if(Math.abs(this.player.x - this.ghost2.x) < 80){
				this.ghost2.health --;}
		}

		// jump attack
		if (k.isDown(83))
		{
			if (this.prevDir == 'left')
			{
				this.player.animations.play('jumpattack_left')
			}
			else{
				this.player.animations.play('jumpattack_right')
			}
			this.player.body.velocity.y = -20;
			this.player.animations.currentAnim.onLoop.add(this.endJump, this);

			//decrease enemy health if within attack range
			if(Math.abs(this.player.x - this.enemy.x) < 80){
				this.enemy.health --;}
			//decrease enemy health if within attack range
			if(Math.abs(this.player.x - this.ghost.x) < 80){
				this.ghost.health --;}
			//decrease enemy health if within attack range
			if(Math.abs(this.player.x - this.ghost2.x) < 80){
				this.ghost2.health --;}
		}

		// jump
		if (k.isDown(Phaser.Keyboard.SPACEBAR)) 
		{
			if(this.prevDir == 'left')
			{
				this.player.animations.play('jump_left');
			}
			else
			{
				this.player.animations.play('jump_right');
			}
			this.player.body.velocity.y = -20;
			this.player.animations.currentAnim.onLoop.add(this.endJump, this);
		}
	},

	endJump: function (){
		this.player.body.velocity.y = 550;
		console.log("endJump");
	},

	collectCoins: function (player, coin)
	{
		game.global.coins +=1;
		console.log(game.global.coins);
		coin.kill();
	},
}