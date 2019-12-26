const Chroma = require("./chroma.js"); // Get chroma object

Chroma.init(() => { // Star chroma editing, do stuff in callback
    console.log("Chroma Editing Started");
    Chroma.createEffect("mouse", "CHROMA_STATIC", 0X00FFFF); // Set mouse color to Yellow (BGR Format)
    Chroma.createEffect("mousepad", "CHROMA_STATIC", 0X0000FF); // Set mousepad color to Red (BGR Format)
    Chroma.createEffect("headset", "CHROMA_STATIC", 0XFF0000); // Set headset color to Blue (BGR Format)
    setTimeout(() => { // Stop Chroma after 5 Seconds
        Chroma.uninit(() => { // Do stuff with callback after chroma is closed
            console.log("Chroma Editing Stopped");
        });
    }, 5000);
});
