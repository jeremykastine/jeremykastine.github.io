function playNote(freq, patch = null) {
    let now = audioCtx.currentTime;
    if (freq > 3500) {
        return;
    } else if(patch == null){
        var osc = audioCtx.createOscillator();
        var gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        gain.gain.setValueAtTime(0, now);
        osc.frequency.setValueAtTime(440,now);

    } else {
        var osc = audioCtx.createOscillator();
        var filter = audioCtx.createBiquadFilter();
        var gain = audioCtx.createGain();
        var pan = audioCtx.createStereoPanner();
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(pan);
        pan.connect(audioCtx.destination);

        let now = audioCtx.currentTime;
        
        filter.Q.value = 1;

        let i=0;

        if(patch[i]<.5){
            osc.type = "sawtooth";
        } else {
            osc.type = "square";
        }
        
        i++;

        pan.pan.value = patch[i]*2-1;


        gain.gain.setValueAtTime(0, now);

        let attackTime;
        let endTime;
        i++;
        if(patch[i]<.5){
            // hard attack;
            i++;
            attackTime = .01+.03*patch[i];
            i++;
            let attackValue = .3*patch[i];
            gain.gain.linearRampToValueAtTime(.6+attackValue, now + attackTime/2);
            gain.gain.linearRampToValueAtTime(.6, now + attackTime);
            i++;
            if(patch[i]<.5){
                //sustain
                i++;
                endTime = .15+.03*patch[i];
                gain.gain.linearRampToValueAtTime(.6, now + endTime);
                gain.gain.linearRampToValueAtTime(0, now + endTime+.05);
            } else {
                //decay
                i++;
                endTime = .2+.4*patch[i];
                gain.gain.linearRampToValueAtTime(0, now + endTime);
            }
        } else{
            // soft attack;
            i++;
            attackTime = .02+.1*patch[i];
            if(attackTime>.1){
                gain.gain.linearRampToValueAtTime(.5, now + .1);
            }
            gain.gain.linearRampToValueAtTime(.6, now + attackTime);
            i++;
            if(patch[i]<.5){
                //sustain
                i++;
                endTime = attackTime+.1+.1*patch[i];
                if(endTime>.19){endTime=.19}
                gain.gain.linearRampToValueAtTime(.6, now + endTime);
                gain.gain.linearRampToValueAtTime(0, now + endTime+.05);
            } else {
                //decay
                i++;
                endTime = 2*attackTime+.4*patch[i];
                gain.gain.linearRampToValueAtTime(0, now + endTime);
            }
        }
        

        filter.type = "bandpass";

        i++;
        filter.frequency.setValueAtTime(110*Math.pow(32,patch[i]),now);
        i++;
        filter.frequency.exponentialRampToValueAtTime(110*Math.pow(32,patch[i]),now+attackTime);
        i++;
        filter.frequency.exponentialRampToValueAtTime(110*Math.pow(32,patch[i]),now+endTime);

        osc.frequency.setValueAtTime(freq*Math.pow(2,(Math.random()-Math.random())*.10/12),now);

    }



    osc.start(now);
    osc.stop(now + 2);
}
