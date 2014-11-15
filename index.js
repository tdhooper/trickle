
/**
 * @name trickle
 */

export function dsp(t) {
  return trickle(t);
}

function trickle(t) {
  t += 10;
  var count = 1 + sweep(t, 2) * 18;
  var sf = function(t) {
    return bleep(t, 1);
  };
  return echo(t, sf, count);
}


function sweep(t, length) {
  return (t % length) / length;
}


function echo(t, soundFunc, count) {
  var s = soundFunc(t);
  var rs = 0;
  var n = count;
  var delay = 4;
  for (var i = 0; i < n; i++) {
    var offset = (delay / n) * i;
    var vol = (1 / n) * (n - i);
    if (vol < 0.5) {
      rs += soundFunc(t - offset) * vol; 
    }
    delay *= 0.9999;
  }
  return rs;
}

function vol(t, f, l) {
  if (t % f > l) {
    return 0;
  }
  var s = sin(t * (1 / l), 1, 1);
  return s;
}

function bleep(t, repeat) {
  t *= 2;
  var v = vol(t, repeat * 2, 0.1);
  var s = sin(t, 450, 1);
  return v * s;
}

function sin(t, freq, amp) {
  return Math.sin(Math.PI * t * freq) * amp;
}