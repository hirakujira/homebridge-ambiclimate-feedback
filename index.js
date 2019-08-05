/**
 * MIT License
 *
 * Copyright (c) 2019 Hiraku
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 **/

var ambi = require("node-ambiclimate");
var Service, Characteristic;

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory(
    "homebridge-ambiclimate-feedback",
    "AmbiClimateFeedback",
    AmbiClimateFeedback
  );
};

function AmbiClimateFeedback(log, config) {
  this.log = log;
  this.name = config.name;
  this.settings = {};
  (this.settings.room_name = config.roomName),
    (this.settings.location_name = config.locationName);

  this.client = new ambi(
    config.clientId,
    config.clientSecret,
    config.username,
    config.password
  );

  this.timeout;

  this.tooHot         = {};
  this.tooWarm        = {};
  this.bitWarm        = {};
  this.comfortable    = {};
  this.bitCold        = {};
  this.tooCold        = {};
  this.freezing       = {};
  this.tooHot.on      = false;
  this.tooWarm.on     = false;
  this.bitWarm.on     = false;
  this.comfortable.on = false;
  this.bitCold.on     = false;
  this.tooCold.on     = false;
  this.freezing.on    = false;

  this.tooHotSwitchService      = new Service.Switch("Too Hot", "Too Hot");
  this.tooWarmSwitchService     = new Service.Switch("Too Warm", "Too Warm");
  this.bitWarmSwitchService     = new Service.Switch("Bit Warm", "Bit Warm");
  this.comfortableSwitchService = new Service.Switch("Comfortable", "Comfortable");
  this.bitColdSwitchService     = new Service.Switch("Bit Cold", "Bit Cold");
  this.tooColdSwitchService     = new Service.Switch("Too Cold", "Too Cold");
  this.freezingSwitchService    = new Service.Switch("Freezing", "Freezing");

  this.informationService = new Service.AccessoryInformation();
}

AmbiClimateFeedback.prototype = {

  cleanState: function() {
    this.tooHot.on      = false;
    this.tooWarm.on     = false;
    this.bitWarm.on     = false;
    this.comfortable.on = false;
    this.bitCold.on     = false;
    this.tooCold.on     = false;
    this.freezing.on      = false;
  },

  getFeedback: function(callback) {
    callback(null, this.tooHot.on);
  },

  setFeedback: function(callback) {
    var accessory = this;
    var settings = accessory.settings;

    if (accessory.tooHot.on) {
      settings.value = 'too_hot';
      accessory.client.feedback(settings, function(err, data) {
        callback(err)
      });
    }
    else if (accessory.tooWarm.on) {
      settings.value = 'too_warm';
      accessory.client.feedback(settings, function(err, data) {
        callback(err)
      });
    }
    else if (accessory.bitWarm.on) {
      settings.value = 'bit_warm';
      accessory.client.feedback(settings, function(err, data) {
        callback(err)
      });
    }
    else if (accessory.comfortable.on) {
      settings.value = 'comfortable';
      accessory.client.feedback(settings, function(err, data) {
        callback(err)
      });
    }
    else if (accessory.bitCold.on) {
      settings.value = 'bit_cold';
      accessory.client.feedback(settings, function(err, data) {
        callback(err)
      });
    }
    else if (accessory.tooCold.on) {
      settings.value = 'too_cold';
      accessory.client.feedback(settings, function(err, data) {
        callback(err)
      });
    }
    else if (accessory.freezing.on) {
      settings.value = 'freezing';
      accessory.client.feedback(settings, function(err, data) {
        callback(err)
      });
    }
  },

  //
  // Services
  //
  getServices: function() {
    this.tooHotSwitchService
      .getCharacteristic(Characteristic.On)
      .on(
        "get",
        function(callback) {
          this.getFeedback(
            function(error, data) {
              callback(error, data);
            }.bind(this)
          );
        }.bind(this)
      )
      .on(
        "set",
        function(value, callback) {
          clearTimeout(this.timer);
          this.cleanState();
          this.tooHot.on = value;

          if (value) {
            this.timer = setTimeout(function() {
              this.tooHotSwitchService.getCharacteristic(Characteristic.On).updateValue(false);
              this.tooHot.on = false;              
            }.bind(this), 2000);
          }

          this.setFeedback(
            function(error, data) {
              callback(error);
            }.bind(this)
          );
        }.bind(this)
      );
    
      this.tooWarmSwitchService
      .getCharacteristic(Characteristic.On)
      .on(
        "get",
        function(callback) {
          this.getFeedback(
            function(error, data) {
              callback(error, data);
            }.bind(this)
          );
        }.bind(this)
      )
      .on(
        "set",
        function(value, callback) {
          clearTimeout(this.timer);
          this.cleanState();
          this.tooWarm.on = value;

          if (value) {
            this.timer = setTimeout(function() {
              this.tooWarmSwitchService.getCharacteristic(Characteristic.On).updateValue(false);
              this.tooWarm.on = false;              
            }.bind(this), 2000);
          }

          this.setFeedback(
            function(error, data) {
              callback(error);
            }.bind(this)
          );
        }.bind(this)
      );

      this.bitWarmSwitchService
      .getCharacteristic(Characteristic.On)
      .on(
        "get",
        function(callback) {
          this.getFeedback(
            function(error, data) {
              callback(error, data);
            }.bind(this)
          );
        }.bind(this)
      )
      .on(
        "set",
        function(value, callback) {
          clearTimeout(this.timer);
          this.cleanState();
          this.bitWarm.on = value;

          if (value) {
            this.timer = setTimeout(function() {
              this.bitWarmSwitchService.getCharacteristic(Characteristic.On).updateValue(false);
              this.bitWarm.on = false;              
            }.bind(this), 2000);
          }

          this.setFeedback(
            function(error, data) {
              callback(error);
            }.bind(this)
          );
        }.bind(this)
      );

      this.comfortableSwitchService
      .getCharacteristic(Characteristic.On)
      .on(
        "get",
        function(callback) {
          this.getFeedback(
            function(error, data) {
              callback(error, data);
            }.bind(this)
          );
        }.bind(this)
      )
      .on(
        "set",
        function(value, callback) {
          clearTimeout(this.timer);
          this.cleanState();
          this.comfortable.on = value;

          if (value) {
            this.timer = setTimeout(function() {
              this.comfortableSwitchService.getCharacteristic(Characteristic.On).updateValue(false);
              this.comfortable.on = false;              
            }.bind(this), 2000);
          }

          this.setFeedback(
            function(error, data) {
              callback(error);
            }.bind(this)
          );
        }.bind(this)
      );

      this.bitColdSwitchService
      .getCharacteristic(Characteristic.On)
      .on(
        "get",
        function(callback) {
          this.getFeedback(
            function(error, data) {
              callback(error, data);
            }.bind(this)
          );
        }.bind(this)
      )
      .on(
        "set",
        function(value, callback) {
          clearTimeout(this.timer);
          this.cleanState();
          this.bitCold.on = value;

          if (value) {
            this.timer = setTimeout(function() {
              this.bitColdSwitchService.getCharacteristic(Characteristic.On).updateValue(false);
              this.bitCold.on = false;              
            }.bind(this), 2000);
          }

          this.setFeedback(
            function(error, data) {
              callback(error);
            }.bind(this)
          );
        }.bind(this)
      );

      this.tooColdSwitchService
      .getCharacteristic(Characteristic.On)
      .on(
        "get",
        function(callback) {
          this.getFeedback(
            function(error, data) {
              callback(error, data);
            }.bind(this)
          );
        }.bind(this)
      )
      .on(
        "set",
        function(value, callback) {
          clearTimeout(this.timer);
          this.cleanState();
          this.tooCold.on = value;

          if (value) {
            this.timer = setTimeout(function() {
              this.tooColdSwitchService.getCharacteristic(Characteristic.On).updateValue(false);
              this.tooCold.on = false;              
            }.bind(this), 2000);
          }

          this.setFeedback(
            function(error, data) {
              callback(error);
            }.bind(this)
          );
        }.bind(this)
      );

      this.freezingSwitchService
      .getCharacteristic(Characteristic.On)
      .on(
        "get",
        function(callback) {
          this.getFeedback(
            function(error, data) {
              callback(error, data);
            }.bind(this)
          );
        }.bind(this)
      )
      .on(
        "set",
        function(value, callback) {
          clearTimeout(this.timer);
          this.cleanState();
          this.freezing.on = value;

          if (value) {
            this.timer = setTimeout(function() {
              this.freezingSwitchService.getCharacteristic(Characteristic.On).updateValue(false);
              this.freezing.on = false;              
            }.bind(this), 2000);
          }

          this.setFeedback(
            function(error, data) {
              callback(error);
            }.bind(this)
          );
        }.bind(this)
      );
    
    this.informationService
      .setCharacteristic(Characteristic.Manufacturer, "Ambi Labs")
      .setCharacteristic(Characteristic.Model, "Ambi Climate")
      .setCharacteristic(Characteristic.SerialNumber, " ");
    
    return [
      this.tooHotSwitchService,
      this.tooWarmSwitchService,
      this.bitWarmSwitchService,
      this.comfortableSwitchService,
      this.bitColdSwitchService,
      this.tooColdSwitchService,
      this.freezingSwitchService,
      this.informationService
    ];
  }
};
