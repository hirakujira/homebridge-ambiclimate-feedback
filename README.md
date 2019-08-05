# homebridge-ambiclimate-feedback

This is an [Ambi Climate](https://www.ambiclimate.com/) comfortable mode feedback plugin for [homebridge](https://www.npmjs.com/package/homebridge). It adds 7 switches for each physical device:

* Too Hot
* Too Warm
* Bit Warm
* Comfortable
* Bit Cold
* Too Cold
* Freezing



## Installation

    npm install -g homebridge-ambiclimate-feedback

This plugin augments a pre-existing implementation of [homebridge](https://www.npmjs.com/package/homebridge).  Refer to [nfarina/homebridge](https://www.npmjs.com/package/homebridge) for installation instructions.

Register a OAuth Client in the <a href="https://api.ambiclimate.com/" target="_new">Ambi Dev Portal</a> for each Ambi Climate device by following the steps on the Quick Start page.  You require the Client Id and Client Secret of that client in order to use this wrapper.

Update your homebridge configuration file (as below).

## Configuration

    "accessories" : [
        {
            "accessory": "AmbiClimateFeedback",
            "name": "<Name for Accessory>",
            "roomName": "<Name of Ambi Climate Device>",
            "locationName": "<Name of Ambi Climate Location>",
            "clientId": "<Ambi Climate OAuth Client Id>",
            "clientSecret": "<Ambi Climate OAuth Client Secret>",
            "username": "<Ambi Climate Username>",
            "password": "<Ambi Climate Password>",
        }
    ]

Separate homebridge accessories can be defined for each Ambi Climate device to be controlled.  
* `accessory`: Must be "AmbiClimate"
* `name`: Can be anything, this will be the name of the Accessory within HomeKit Apps
* `room_name`: Must match the value within the Ambi Climate App
* `location_name`: Must match the value within the Ambi Climate App
* `clientId`: The Client Id value for the OAUTH Client obtained from Ambi Dev Portal
* `clientSecret`: The Client Secret value for the OAUTH Client obtained from Ambi Dev Portal
* `username`: Your Ambi Climate username
* `password`: Your Ambi Climate password

## Scene

Since this feedback plugin is based on switches, I recommand to set scenses, making it easier to use Siri. If you want to use Siri without scenes, you would say: "Hey Siri, turn on Too Hot". With scene, you can just say: "Hey Siri, too hot", which is more natural.

## Limitation

There's no API to get current feedback for comfortable mode. Therefore, the switches would be turn off automatically after sending feedbacks.

## Reference

[https://github.com/alisdairjsmyth/homebridge-ambiclimate](https://github.com/alisdairjsmyth/homebridge-ambiclimate#readme)
