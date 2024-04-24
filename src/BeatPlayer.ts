import { AudioContext, StereoPannerNode } from 'standardized-audio-context'

export default class BeatPlayer {
  constructor() {
    //Channel 1, 2, & context
		this.channel1 = new AudioContext();
		this.channel2 = new AudioContext();
		this.ctx = this.channel1

    //Tone 1 & 2
		this.osc1 = this.channel1.createOscillator()
		this.osc2 = this.channel2.createOscillator()
    console.debug('osc1', this.osc1)
    console.debug('osc2', this.osc2)

    const vm = this
    //Base & Beat Frequency (hz)
    this.frequency = {
      get base() {
        return vm.osc1.frequency.value
      },
      set base(val) {
        vm.osc1.frequency.value = val
        vm.osc2.frequency.value = val - this.beat
      },
      get beat() {
        return vm.osc1.frequency.value - vm.osc2.frequency.value
      },
      set beat(val) {
        vm.osc2.frequency.value = vm.osc1.frequency.value - val
      }
    }

		//Stereo
    this.leftStereo = new StereoPannerNode(this.channel1)
		this.rightStereo = new StereoPannerNode(this.channel2, { pan: 1}) //shortcut: set pan in creation options
		this.leftStereo.pan.value = -1 // -1 left side, 0 balanced, 1 right side

    //Plug each tone into each respective stereo, and then out each respective channel
		this.osc1.connect( this.leftStereo ).connect( this.channel1.destination )
		this.osc2.connect( this.rightStereo ).connect( this.channel2.destination )

    //Start, then pause tones
		this.osc1.start()
		this.osc2.start()
		this.channel1.suspend()
		this.channel2.suspend()
		this.paused = true
		this.frequency.base = 440
		this.frequency.beat = 4
  }

  pause() {
		this.channel1.suspend()
		this.channel2.suspend()
		this.paused = true
		console.debug('beat pause')
	}

	play() {
		this.channel1.resume()
		this.channel2.resume()
		this.paused = false
		console.debug('beat play')
	}
}
