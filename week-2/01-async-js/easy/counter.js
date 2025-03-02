let cnt = 60; // Have to count

// Counter using setInterval
function intervalId() {
  const counter = setInterval(function () {
    if (cnt < 0) {
      clearInterval(counter);
      console.log('Countdown completed!');
      return;
    }
    console.log(cnt--);
  }, 1000);
}

// Counter using setTimeout
function timeoutId() {
  if (cnt >= 0) {
    console.log(cnt--);
    setTimeout(timeoutId, 1000);
  } else {
    console.log('Countdown completed!');
    return;
  }
}

// intervalId();
// timeoutId();
