var Game = {};
var spriteSheetName = 'tmw_desert_spacing';

Game.init = function () {
    game.stage.disableVisibilityChange = true;
};

Game.preload = function () {
    game.load.tilemap('map', 'assets/map/map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('tileset', 'assets/map/' + spriteSheetName + '.png', 16, 32);
    game.load.image('sprite', 'assets/sprites/banana.png'); // this will be the sprite of the players
};

Game.create = function () {
    Game.playerMap = {};

    var map = game.add.tilemap('map');
    map.addTilesetImage(spriteSheetName, 'tileset'); // tilesheet is the key of the tileset in map's JSON file
    var layer;
    for (var i = 0; i < map.layers.length; i++) {
        layer = map.createLayer(i);
    }
    layer.inputEnabled = true; // Allows clicking on the map
    layer.events.onInputUp.add(Game.getCoordinates, this);
    Client.askNewPlayer();
};


Game.getCoordinates = function(layer,pointer){
    Client.sendClick(pointer.worldX,pointer.worldY);
};

Game.addNewPlayer = function (id, x, y) {
    Game.playerMap[id] = game.add.sprite(x, y, 'sprite');
};

Game.removePlayer = function (id) {
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};

Game.movePlayer = function(id,x,y){
    var player = Game.playerMap[id];
    var distance = Phaser.Math.distance(player.x,player.y,x,y);
    var duration = distance*10;
    var tween = game.add.tween(player);
    tween.to({x:x,y:y}, duration);
    tween.start();
};