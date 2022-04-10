// const EventEmitter = require('events').EventEmitter()
const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

function EmmiterModule() {
  this.events = {};
}

EmmiterModule.__proto__ = EventEmitter.prototype;

EmmiterModule.prototype.on = function (eventType, cp) {
  this.events[eventType] = this.events[eventType] || [];
  this.events[eventType].push(cp);
  console.log('type',this.events[eventType])
};

EmmiterModule.prototype.emit = function (eventType,arg) {
//if no args sent 
    arg = arg ||null
//  this.events[eventType]
    //  is an array of functions ===> [ [Function] ]
    
    if (this.events[eventType]) {
        this.events[eventType].forEach(callBackFun => {
           callBackFun(arg);
        });
  }
};

module.exports = EmmiterModule;
