

function playNote(freq,patch){
    
    
    var osc = audioCtx.createOscillator();
    var filter = audioCtx.createBiquadFilter();
    var gain = audioCtx.createGain();
    var pan = audioCtx.createStereoPanner();
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(pan);
    pan.connect(audioCtx.destination);


    
    let now=audioCtx.currentTime;
    
    let filtFreq=freq*4;
    filter.frequency.value = filtFreq;
    switch(patch){
        case 0:
            osc.frequency.value = freq*1.005;
            osc.type = "square";
            filter.Q.value = 1;
            
            filter.type = "lowpass"
            pan.pan.value=-1;
            // gain.gain.setValueAtTime(0,now);
            // gain.gain.linearRampToValueAtTime(.7,now+.01);
            // gain.gain.linearRampToValueAtTime(.5,now+.05);
            // gain.gain.linearRampToValueAtTime(.5,now+.15);
            // gain.gain.linearRampToValueAtTime(.7,now+.20);
            // gain.gain.linearRampToValueAtTime(0,now+.21);
            

            gain.gain.setValueAtTime(0,now);
            gain.gain.linearRampToValueAtTime(.7,now+.15);
            gain.gain.linearRampToValueAtTime(0,now+.5);

            break;
        case 1:
            osc.frequency.value = freq*1.005;
            osc.type = "sawtooth";
            filter.Q.value = 1;
            filter.type = "highpass"
            pan.pan.value=1;
            
            gain.gain.setValueAtTime(0,now);
            gain.gain.linearRampToValueAtTime(.7,now+.15);
            gain.gain.linearRampToValueAtTime(0,now+.5);

            break;
        case 2:
            osc.frequency.value = freq;
            osc.type = "triangle";

            filter.type = "bandpass"
            pan.pan.value=0;
            gain.gain.setValueAtTime(0,now);
            gain.gain.linearRampToValueAtTime(.7,now+.02);
            gain.gain.linearRampToValueAtTime(.7,now+.1);
            gain.gain.linearRampToValueAtTime(0,now+.12);
            break;
    }
    osc.start(now);
    osc.stop(now+1);      
}