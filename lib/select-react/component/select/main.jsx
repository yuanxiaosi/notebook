var React = require('react');
var less = require('./main.less');
var iscroll = require('./iscroll.js');

var main = React.createClass({
  getInitialState: function(){
    return {
      show: true,
      pro: [0,1,2,3,4,5,6,7,8,9],
      city: [],
      reg: [],
      proScroll: '',
      cityScroll: '',
      regScroll: ''
    }
  },
  componentWillMount: function(){

  },
  componentDidMount: function(){
    var me = this;
    me.setState({
      proScroll: new IScroll('#pro', me.getCity),
      cityScroll: new IScroll('#city', me.getReg),
      regScroll: new IScroll('#reg')
    }, function(){
      document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
      me.getPro();
    })
    
  },
  cancel: function(){
    this.setState({show: false})
  },
  sure: function(){
    this.getResult();
    this.setState({show: false})
  },
  getResult: function(){
    console.log(this.state.proScroll.getIndex())
    console.log(this.state.cityScroll.getIndex())
    console.log(this.state.regScroll.getIndex())
  },
  getPro: function(){
    var me = this;
    //ajax
    var pro = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    //ajax
    this.setState({pro: pro}, function(){ 
      me.state.proScroll.init(); //数据改变要初始化插件
      me.state.proScroll.setIndex(7);
    });
    this.getCity();
  },
  getCity: function(){
    var me = this;
    var proIndex = this.state.proScroll.getIndex();
    //ajax
    var city = [];
    for(var i=0; i<50; i++){
      city.push(proIndex+"city"+i)
    }
    //ajax
    this.setState({city: city}, function(){
      me.state.cityScroll.init(); //数据改变要初始化插件
      me.state.cityScroll.setIndex(8);
    })
    this.getReg();
  },
  getReg: function(){
    var me = this;
    var cityIndex = this.state.cityScroll.getIndex();
    //ajax
    var reg = [];
    for(var i=0; i<50; i++){
      reg.push(cityIndex+"reg"+i)
    }
    //ajax
    this.setState({reg: reg}, function(){
      me.state.regScroll.init(); //数据改变要初始化插件
      me.state.regScroll.setIndex(9);
    });
  },
  render: function () {
    var me = this;
    var show = me.state.show;
    var pro = me.state.pro;
    var city = me.state.city;
    var reg = me.state.reg;
    var proLiDiv = pro.map(function(v, k){
      return(
        <li key={k}>{v}</li>
      )
    })
    var cityLiDiv = city.map(function(v, k){
      return(
        <li key={k}>{v}</li>
      )
    })
    var regLiDiv = reg.map(function(v, k){
      return(
        <li key={k}>{v}</li>
      )
    })
    return (
      <div className={show?"m-select":"m-select hide"}>
        <div className="warp"></div>
        <div className="btn">
          <div className="cancel" onClick={this.cancel}>取消</div>
          <div className="sure" onClick={this.sure}>确定</div>
        </div>
        <div className="body">
          <div className="list" id="pro">
            <div className="box"></div>
            <div className="scroller">
              <ul>
                <li></li>
                <li></li>
                {proLiDiv}
                <li></li>
                <li></li>
              </ul>
            </div>
          </div>
          <div className="list" id="city">
            <div className="box"></div>
            <div className="scroller">
              <ul>
                <li></li>
                <li></li>
                {cityLiDiv}
                <li></li>
                <li></li>
              </ul>
            </div>
          </div>
          <div className="list" id="reg">
            <div className="box"></div>
            <div className="scroller">
              <ul>
                <li></li>
                <li></li>
                {regLiDiv}
                <li></li>
                <li></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = main;