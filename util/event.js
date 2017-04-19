var Observer = function () {
  this.list = {};
}

Observer.prototype = {
  on: function (handel, fn) {
    if(!this.list[handel]){
      this.list[handel] = [];
    }
    this.list[handel].push(fn)
  },
  emit: function (handel, args) {
    if(!this.list[handel]){
      return;
    }
    for(var i=0; i<this.list[handel].length; i++){
      this.list[handel][i].call(this, args);
    }
  },
  del: function (handel){
    delete this.list[handel]
  }
}

var observer = new Observer();

module.exports = observer;