const hideSliderDelayMilliseconds = 3000;

let lastTimeoutTrigger;

const createMouseEvent = function(eventType) {
    return new MouseEvent(eventType, {
        'view': window,
        'bubbles': true,
        'cancelable': true
      });
}

const mouseOverEvent = createMouseEvent("mouseover");
const mouseOutEvent = createMouseEvent("mouseout");

const showSlider = function() {
    const container = document.getElementsByClassName("acg-player-container")[0];
      
    container.dispatchEvent(mouseOverEvent);

    const timeout = setTimeout(function() {
        if (lastTimeoutTrigger === timeout)
        {
            container.dispatchEvent(mouseOutEvent);
        }
    }, hideSliderDelayMilliseconds);

    lastTimeoutTrigger = timeout;
}

const toggleVideoPlay = function () {
    showSlider();

    const videoElement = document.querySelectorAll("video")[0];

    if (videoElement.paused) {
        // Click the play icon to dismiss it
        const playIconQuery = document.querySelectorAll("[data-testid='player-play-icon']");
        if (playIconQuery.length > 0) {
            playIconQuery[0].click();
        }

        // if play icon not on screen, start playing the video anyways
        videoElement.play();
    } else {
        const pauseIconQuery = document.querySelectorAll("[data-testid='player-pause-icon']");
        if (pauseIconQuery.length > 0) {
            pauseIconQuery[0].click();
        }

        videoElement.pause();
    }
}

const skip = function (value) {
    showSlider();

    const videoElement = document.querySelectorAll("video")[0];
    videoElement.currentTime += value;
}

document.onkeydown = function (e) {
    if (e.code === "Space") {
        toggleVideoPlay();
    }
    else if (e.code === "ArrowRight") {
        skip(10);
    }
    else if (e.code === "ArrowLeft") {
        skip(-10);
    }
}